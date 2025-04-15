from fastapi import FastAPI

from app.routers.jobs.router import router as job_router

app = FastAPI()

app.include_router(job_router, prefix="/jobs")

@app.get('/')
async def root():
    return {'message': 'Hello'}