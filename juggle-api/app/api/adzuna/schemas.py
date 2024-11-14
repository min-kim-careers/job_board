from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel as _BaseModel, ConfigDict


class BaseModel(_BaseModel):
    model_config = ConfigDict(extra="ignore")


class Company(BaseModel):
    display_name: Optional[str] = None


class Location(BaseModel):
    display_name: Optional[str] = None
    area: Optional[List[str]] = None


class Category(BaseModel):
    label: Optional[str] = None
    tag: Optional[str] = None


class AdzunaSchema(BaseModel):
    id: Optional[str] = None
    contract_type: Optional[str] = None
    redirect_url: Optional[str] = None
    company: Optional[Company] = None
    location: Optional[Location] = None
    title: Optional[str] = None
    salary_is_predicted: Optional[str] = None
    description: Optional[str] = None
    contract_time: Optional[str] = None
    longitude: Optional[float] = None
    latitude: Optional[float] = None
    category: Optional[Category] = None
    created: Optional[datetime] = None
    salary_max: Optional[int] = None
    salary_min: Optional[int] = None
