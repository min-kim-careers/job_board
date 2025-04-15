import os
from dotenv import load_dotenv

load_dotenv()

ADZUNA_API_URL = os.getenv("ADZUNA_API_URL")
ADZUNA_APP_ID = os.getenv("ADZUNA_APP_ID")
ADZUNA_APP_KEY = os.getenv("ADZUNA_APP_KEY")

MYSQL_URL = os.getenv("MYSQL_URL")

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))
