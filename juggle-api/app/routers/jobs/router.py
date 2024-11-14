from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.adzuna.functions import update as update_adzuna
from app.database.mysql.config import get_db
from app.routers.jobs.functions import query_jobs, query_options
from app.routers.jobs.models import JobQuery, ResponseWrapper
from app.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter()


@router.post("/update", response_model=ResponseWrapper)
async def update(db: Session = Depends(get_db)):
    try:
        await update_adzuna(db)
        # Add more job boards here later..

    except Exception as err:
        return ResponseWrapper(
            message=f"Failed to update Adzuna jobs: {err}",
        )

    return ResponseWrapper(
        message="Successfully updated Adzuna jobs",
    )


@router.post("", response_model=ResponseWrapper)
def jobs(query: JobQuery, db: Session = Depends(get_db)):
    logger.info(f"Received query:\n{query.model_dump_json(indent=2)}")
    result = query_jobs(db, query)
    result.message = "Successfully queried jobs"
    logger.info(result.message)
    return result


@router.get("/options", response_model=ResponseWrapper)
def options(db: Session = Depends(get_db)):
    result = query_options(db)
    result.message = "Successfully queried options"
    logger.info(result.message)
    return result
