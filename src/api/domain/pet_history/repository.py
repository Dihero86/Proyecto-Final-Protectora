from api.models.index import db, Historial
from datetime import datetime

def create_history(pet_id,body,user_id):
    new_pet_history= Historial(body["title"],body["description"], pet_id, user_id,datetime.now())
    db.session.add(new_pet_history)
    db.session.commit()
    return new_pet_history

def get_history(pet_id):
    pet_history = Historial.query.filter_by(pet_id=pet_id).all()
    print(pet_history)
    pet_history_serialize= list(map(lambda history: history.serialize(),pet_history))
    return pet_history_serialize

def edit_history(pet_id,history_id,body,user_id):
    pet_history = Historial.query.get(history_id)
    pet_history.title = body.get("title")
    pet_history.description = body.get("description")
    pet_history.user_id = user_id
    pet_history.create_at = datetime.now()
    db.session.commit()
    return pet_history

