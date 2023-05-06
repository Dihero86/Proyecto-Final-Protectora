from api.models.index import db, Historial

def create_history(pet_id,body,user_id):
    new_pet_history= Historial(body["title"],body["description"], pet_id, user_id)
    db.session.add(new_pet_history)
    db.session.commit()
    return new_pet_history

def get_history(pet_id):
    pet_history = Historial.query.filter_by(pet_id=pet_id).one()
    return pet_history

def edit_history(pet_id,body,user_id):
    pet_history = Historial.query.filter_by(pet_id=pet_id).one()
    pet_history.title = body.get("title")
    pet_history.description = body.get("description")
    pet_history.user_id = user_id
    db.session.commit()
    return pet_history

def delete_history(pet_id):
    pet_history = Historial.query.filter_by(pet_id=pet_id).one()
    db.session.delete(pet_history)
    db.session.commit()
    return {"msg": "Pet_history delete", "status": 200 }