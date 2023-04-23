from api.models.index import db, Pet

def create_pet(body):
    new_pet= Pet(body["name"],body["age"],body["breed"],body["size"],body["photo"],body["description"],body["status_id"],body["company_id"])
    db.session.add(new_pet)
    db.session.commit()
    return new_pet

def get_all_pet():
    mascotas = Pet.query.all()
    mascotas_serializadas = list(map(lambda mascota: mascota.serialize(),mascotas))
    return mascotas_serializadas

def get_one_pet(id):
    one_pet= Pet.query.get(id)
    return one_pet

def get_allpet_company(id):
    mascotas = Pet.query.filter_by(company_id=id).all()
    mascotas_serializadas = list(map(lambda mascota: mascota.serialize(),mascotas))
    return mascotas_serializadas