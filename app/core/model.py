from sqlalchemy import Column, String, Integer
from .db import Base


class Item(Base):
    __tablename__ = 'Items'

    item_id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String)
    item_location = Column(String)
    item_amount = Column(Integer)
