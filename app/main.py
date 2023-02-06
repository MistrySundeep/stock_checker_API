import os

from fastapi import FastAPI, Depends, Request
from fastapi.encoders import jsonable_encoder
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from sqlalchemy.orm import Session
from core.model import Base
from core.schema import RequestItem
from core.crud import get_item_name, add_item, all_items, update_amount, delete_an_item
from core.db import get_db, engine


Base.metadata.create_all(bind=engine)
app = FastAPI()

templates = Jinja2Templates(directory=os.path.abspath(os.path.expanduser('templates')))
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse('index.html', {"request": request})


@app.post('/insert_item')
async def insert_item(request: RequestItem, db: Session = Depends(get_db)):
    add_item(db, request)
    return {'msg': 'Item added'}


@app.get('/get_item/{item_name}')
async def find_item(item_name: str, db: Session = Depends(get_db)):
    results = get_item_name(db, item_name)
    results_dict = {"item_id": results.item_id, "item_name": results.item_name, "item_amount": results.item_amount, "item_location": results.item_location}
    print(results_dict)
    return jsonable_encoder(results_dict)


@app.get('/show_all_items')
async def get_all_items(db: Session = Depends(get_db)):
    results = all_items(db)
    for i in range(len(results)):
        print(results[i])
    return results


@app.put('/update_item_amount')
async def update_item_amount(request: RequestItem, db: Session = Depends(get_db)):
    update_amount(db, request)
    print('Complete')
    return {"msg": "Item updated"}


@app.delete('/delete_item')
async def delete_item(request: RequestItem, db: Session = Depends(get_db)):
    delete_an_item(db, request)
    return {"msg": "Item deleted"}
