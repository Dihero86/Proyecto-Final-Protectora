from api.models.index import db, Pet, Pet_Gallery

def create_pet(body,status_id):
    new_pet= Pet(body["name"],body["age"],body["breed"],body["size"],body["description"],status_id,body["company_id"])
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

def add_url_to_pet_gallery(image_url,pet_id):
    new_photo = Pet_Gallery(image_url, pet_id)
    db.session.add(new_photo)
    db.session.commit()
    return new_photo
