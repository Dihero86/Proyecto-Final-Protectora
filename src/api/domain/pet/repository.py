from api.models.index import db, Pet, Pet_Gallery

def create_pet(body,status_id):
    print(body)
    new_pet= Pet(body["type"],body["name"],body["birth_date"],body["breed"],body["size"],body["description"],status_id,body["company_id"])
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

def update_pet(data, pet_id):
    print(data)
    if not isinstance(data, dict):
        return {'error': 'Formato inválido'}, 400
    pet = Pet.query.get(pet_id)
    if not pet:
        return {'error': 'Pet not found'}, 404
    pet.type = data.get('type')
    pet.name = data.get('name')
    pet.birth_date = data.get('birth_date')
    pet.breed = data.get('breed')
    pet.size = data.get('size')
    pet.description = data.get('description')
    pet.status_id = data.get ('status_id')
    db.session.commit()
    return pet.serialize(), 200
