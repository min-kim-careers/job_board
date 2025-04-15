from typing import Dict, List

from sqlalchemy import Column, func, select
from sqlalchemy.orm import Session

from app.database.mysql.models import JobModel

from app.routers.jobs.models import (
    JobResponse,
    OptionsResponse,
    JobQuery,
    PaginationResponse,
    ResponseWrapper,
)
from app.utils.convert import mysql_to_pydantic


def query_jobs(db: Session, request: JobQuery) -> ResponseWrapper:
    query = db.query(JobModel)
    
    filters = dict(
        title=lambda value: query.filter(
            func.lower(JobModel.title).contains(value.lower())
        ),
        company=lambda value: query.filter(
            func.lower(JobModel.company) == value.lower(),
        ),
        location=lambda value: query.filter(
            func.lower(JobModel.location) == value.lower(),
        ),
        contract_type=lambda value: query.filter(
            func.lower(JobModel.contract_type) == value.lower(),
        ),
        contract_time=lambda value: query.filter(
            func.lower(JobModel.contract_time) == value.lower(),
        ),
        category=lambda value: query.filter(
            func.lower(JobModel.category) == value.lower(),
        ),
        salary_min=lambda value: query.filter(
            JobModel.salary_min >= value,
        ),
        salary_max=lambda value: query.filter(
            JobModel.salary_max <= value,
        ),
        source=lambda value: query.filter(
            func.lower(JobModel.source) == value.lower(),
        ),
    )

    for field, value in request.model_dump(exclude_unset=True).items():
        if field in filters and value is not None:
            query = filters[field](value)

    total_count = query.count()
    query = query.offset(request.pagination._offset()).limit(request.pagination._limit())

    mysql_response: List[JobModel] = query.all()

    if not mysql_response:
        return ResponseWrapper(result=[])

    result: List[JobResponse] = mysql_to_pydantic(
        mysql_response=mysql_response,
        target_type=JobResponse,
    )

    return ResponseWrapper(
        pagination=PaginationResponse(
            page=request.pagination.page,
            limit=request.pagination.limit,
            total_count=total_count,
        ),
        result=result,
    )


def query_options(db: Session) -> ResponseWrapper:
    def distinct_column(column: Column) -> List[str]:
        query = select(column).distinct()
        result = db.execute(query)
        scalars = result.scalars().all()
        return sorted([row for row in scalars if row is not None])

    # Returning distinct values from these columns..
    columns = [
        "category",
        "contract_type",
        "contract_time",
        "source",
    ]

    results: Dict[str, List[str]] = {
        column: distinct_column(getattr(JobModel, column)) for column in columns
    }

    response = OptionsResponse(**results)

    return ResponseWrapper(result=response)
