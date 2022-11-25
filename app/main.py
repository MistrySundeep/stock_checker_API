from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.core.model import Base
from app.core.schema import RequestItem
from app.core.crud import get_item_name, add_item, all_items, update_items, delete_an_item
from app.core.db import get_db, engine

Base.metadata.create_all(bind=engine)
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post('/insert_item')
async def insert_item(request: RequestItem, db: Session = Depends(get_db)):
    add_item(db, request)

    return {'msg': 'Item added'}


@app.get("/get_item/{item_name}")
async def find_item(item_name: str, db: Session = Depends(get_db)):
    results = get_item_name(db, item_name)
    results_dict = {"item_id": results.item_id, "item_name": results.item_name, "item_amount": results.item_amount, "item_location": results.item_location}
    print(results_dict)
    return jsonable_encoder(results_dict)


@app.get("/show_all_items")
async def get_all_items(db: Session = Depends(get_db)):
    results = all_items(db)
    for i in range(len(results)):
        print(results[i])

    return results


@app.put('/update_item')
async def update_item(request: RequestItem, db: Session = Depends(get_db)):
    update_items(db, request)
    print('Complete')


@app.delete('/delete_item')
async def delete_item(request: RequestItem, db: Session = Depends(get_db)):
    delete_an_item(db, request)


