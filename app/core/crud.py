from sqlalchemy import delete
from sqlalchemy.orm import Session
from .model import Item
from .schema import RequestItem


def get_item_name(db: Session, item_name: str):
    # get item from db based on item name
    return db.query(Item).filter(Item.item_name == item_name).first()


def get_item_location(db: Session, item_location: str):
    # get item from db based on item location
    return db.query(Item).filter(Item.item_location == item_location).first()


def add_item(db: Session, request: RequestItem):
    # create a new Item object to add to db
    new_item = Item(item_name=request.name, item_location=request.location, item_amount=request.amount)
    print(f'new_item: {new_item.item_name}, {new_item.item_amount}, {new_item.item_location}')
    db.add(new_item)
    db.commit()


def all_items(db: Session):
    results = db.query(Item).all()
    return results


def update_amount(db: Session, request: RequestItem):
    if db.query(Item).filter(Item.item_name == request.name):
        print('ITEM ALREADY EXISTS')
        current_item = db.query(Item).filter(Item.item_name == request.name).first()
        print(f'Current amount: {current_item.item_amount}')

        if current_item.item_amount != 0:
            db.query(Item).filter(Item.item_name == request.name).update({'item_amount': request.amount})
            db.commit()
        else:
            print('Not Possible')


def delete_an_item(db: Session, request: RequestItem):
    stmt = delete(Item).where(Item.item_name == request.name)
    db.execute(stmt)
    print('ITEM DELETED')
    db.commit()
