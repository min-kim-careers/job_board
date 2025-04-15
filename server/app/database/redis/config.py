import redis
from app.utils.config import (
    REDIS_HOST,
    REDIS_PORT,
    REDIS_DB,
)

redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    db=REDIS_DB,
)