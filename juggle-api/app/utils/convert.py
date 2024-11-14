import json
from typing import List

from pydantic import BaseModel, TypeAdapter


def mysql_to_pydantic(
    mysql_response: List[BaseModel], target_type: BaseModel
) -> List[BaseModel]:
    return TypeAdapter(List[target_type]).validate_python(
        [o.__dict__ for o in mysql_response]
    )


def redis_to_pydantic(
    redis_response: List[BaseModel], target_type: BaseModel
) -> List[BaseModel]:
    return TypeAdapter(List[target_type]).validate_python(
        [json.loads(r) for r in json.loads(redis_response)]
    )
