from datetime import date
from lib2to3.pytree import Base
from numpy import number
from pydantic import BaseModel

class TechRating(BaseModel):
    month: date
    python: int
    hadoop: int
    r: int
    matlab: int
