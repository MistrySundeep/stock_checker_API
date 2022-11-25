from pydantic import BaseModel


class ItemBase(BaseModel):
    item_id: int
    item_name: str
    item_location: str
    item_amount: int

    class Config:
        orm_mode = True


class RequestItem(BaseModel):
    name: str | None = ''
    location: str | None = ''
    amount: int | None = 0
