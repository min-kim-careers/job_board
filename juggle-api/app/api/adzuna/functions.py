from typing import List

from fastapi import HTTPException
import requests
from pydantic import TypeAdapter
from sqlalchemy.dialects.mysql import insert
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.utils.config import (
    ADZUNA_API_URL,
    ADZUNA_APP_ID,
    ADZUNA_APP_KEY,
)
from app.database.mysql.models import JobModel
from app.api.adzuna.schemas import AdzunaSchema


def map_model(schema: AdzunaSchema) -> JobModel:
    return JobModel(
        title=schema.title,
        description=schema.description,
        company=(schema.company.display_name if schema.company else None),
        location=(schema.location.display_name if schema.location else None),
        contract_type=schema.contract_type,
        contract_time=schema.contract_time,
        category=(schema.category.label if schema.category else None),
        url=schema.redirect_url,
        latitude=schema.latitude,
        longitude=schema.longitude,
        created_at=schema.created,
        expires_at=None,
        salary_max=schema.salary_max,
        salary_min=schema.salary_min,
        source="Adzuna",
        source_id=schema.id,
    )


async def update(db: Session) -> dict:
    page = 1
    
    while True:
        try:
            response = requests.get(
                url=ADZUNA_API_URL + str(page),
                params={
                    "app_id": ADZUNA_APP_ID,
                    "app_key": ADZUNA_APP_KEY,
                    "results_per_page": 100,
                    "max_days_old": 14,
                    "sort_by": 'date'
                },
            )
            response.raise_for_status()
        except requests.exceptions.HTTPError as errh:
            raise Exception("Failed to fetch from Adzuna:", errh.args[0])

        job_data = response.json().get("results", [])
        if not job_data:
            break

        # Validate API response is in required format (Schema)
        schema_list: List[AdzunaSchema] = TypeAdapter(List[AdzunaSchema]).validate_python(job_data)

        # Convert API response to DB format (Model)
        model_list: List[JobModel] = list(map(lambda schema: map_model(schema), schema_list))

        # Convert Models to dicts
        valdict_list = [
            {k: v for k, v in m.__dict__.items() if k != "_sa_instance_state"}
            for m in model_list
        ]

        # Build insert statement
        insert_stmt = insert(JobModel).values(valdict_list)

        # Append duplicate ignore statement
        on_duplicate_key_stmt = insert_stmt.on_duplicate_key_update(
            {c.name: c for c in insert_stmt.inserted if c.name != "id"}
        )

        try:
            db.execute(on_duplicate_key_stmt)
            db.commit()
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=409, detail="Failed to update Adzuna jobs: Integrity Error"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=500, detail=f"An unexpected error occurred: {e}"
            )
            
        page += 1
