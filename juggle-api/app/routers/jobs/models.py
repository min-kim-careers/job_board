from datetime import datetime
from typing import List, Optional, Union

from pydantic import BaseModel, ConfigDict, Field, field_validator


class Pagination(BaseModel):
    page: int = None
    limit: int = None

    @field_validator("page")
    @classmethod
    def validate_page_num(cls, v):
        if v < 1:
            raise ValueError("page must be greater than 0")
        return v

    @field_validator("limit")
    @classmethod
    def validate_page_size(cls, v):
        if v < 1:
            raise ValueError("limit must be greater than 0")
        return v

    def _offset(self) -> int:
        return (self.page - 1) * self.limit

    def _limit(self) -> int:
        return self.limit


class JobQuery(BaseModel):
    pagination: Pagination
    title: Optional[str] = Field(None, max_length=255, alias="title")
    company: Optional[str] = Field(None, max_length=255, alias="company")
    location: Optional[str] = Field(None, max_length=255, alias="location")
    contract_type: Optional[str] = Field(None, max_length=50, alias="contractType")
    contract_time: Optional[str] = Field(None, max_length=50, alias="contractTime")
    category: Optional[str] = Field(None, max_length=100, alias="category")
    salary_max: Optional[int] = Field(None, alias="salaryMax")
    salary_min: Optional[int] = Field(None, alias="salaryMin")
    source: Optional[str] = Field(None, max_length=50, alias="source")

    @field_validator(
        "title",
        "company",
        "location",
        "contract_type",
        "contract_time",
        "category",
        "source",
    )
    @classmethod
    def validate_empty_strings(cls, v: str):
        if v is None or v.strip() == "":
            return None
        return v


class JobResponse(BaseModel):
    # id: int
    title: Optional[str]
    description: Optional[str]
    company: Optional[str]
    location: Optional[str]
    contract_type: Optional[str]
    contract_time: Optional[str]
    category: Optional[str]
    url: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    created_at: Optional[datetime]
    expires_at: Optional[datetime]
    salary_max: Optional[int]
    salary_min: Optional[int]
    source: Optional[str]
    # source_id: Optional[str]

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class PaginationResponse(BaseModel):
    page: Optional[int] = None
    limit: Optional[int] = None
    total_count: Optional[int] = None


class OptionsResponse(BaseModel):
    category: Optional[List[str]] = None
    contract_type: Optional[List[str]] = None
    contract_time: Optional[List[str]] = None
    source: Optional[List[str]] = None


class ResponseWrapper(BaseModel):
    message: Optional[str] = None
    pagination: Optional[PaginationResponse] = None
    result: Optional[Union[List[JobResponse], OptionsResponse]] = None
