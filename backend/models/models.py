from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel, validator
from typing import List, Optional

Base = declarative_base()


class PersistentModel(BaseModel):
    id: Optional[int]

    @classmethod
    def model(cls):
        return getattr(cls, cls.Config.orm_name)

    @classmethod
    def get_all(cls, db) -> List["PersistentModel"]:
        return [cls.from_orm(entity) for entity in db.query(cls.model()).all()]


class SubProcess(PersistentModel):
    process_id: int
    sub_process_id: str

    class Config:
        orm_mode = True
        orm_name = 'SubProcessTable'

    class SubProcessTable(Base):
        __tablename__ = 'sub_processes'
        id = Column(Integer, primary_key=True)
        process_id = Column(Integer, ForeignKey('process_table.id'))
        sub_process_id = Column(String(64))

    @classmethod
    def get_by_process_id(cls, db: "Session", process_id: int) -> List["SubProcess"]:
        query_obj = db.query(cls.model()).filter(cls.model().process_id == process_id)
        return [cls.from_orm(sub_p) for sub_p in query_obj.all()]


class Process(PersistentModel):
    process_name: str
    number_of_processes: int
    avg_time_delay: int

    class Config:
        orm_mode = True
        orm_name = 'ProcessTable'

    class ProcessTable(Base):
        __tablename__ = 'process_table'
        id = Column(Integer, primary_key=True)
        process_name = Column(String(64))
        number_of_processes = Column(Integer)
        avg_time_delay = Column(Integer)

        sub_process = relationship(SubProcess.SubProcessTable, cascade='all, delete-orphan')
