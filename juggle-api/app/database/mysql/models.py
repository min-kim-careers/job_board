from sqlalchemy import Column, DateTime, Float, Integer, String, UniqueConstraint

from app.database.mysql.config import Base


class JobModel(Base):
    __tablename__ = "jobs"
    __table_args__ = (
        UniqueConstraint('source', 'source_id', name='uq_source_id'),
    )

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(String(1000))
    company = Column(String(255))
    location = Column(String(255))
    contract_type = Column(String(50))
    contract_time = Column(String(50))
    category = Column(String(100))
    url = Column(String(500))
    latitude = Column(Float)
    longitude = Column(Float)
    created_at = Column(DateTime)
    expires_at = Column(DateTime)
    salary_max = Column(Integer)
    salary_min = Column(Integer)
    source = Column(String(50))
    source_id = Column(String(50))