import api.domain.pet.repository as Repository
from cloudinary.uploader import upload
from api.models.index import Status
import api.domain.company.controller as Company_contoller
import json

def upload_fotos(fotos):
    array_fotos= list(fotos.lists())
    lista_imagenes = list(map(lambda foto: upload(foto[1][0]),array_fotos))
    lista_urls = list(map(lambda data: data["secure_url"],lista_imagenes))
    return lista_urls

def create_pet(data,fotos):
    body= json.loads(data)
    company = Company_contoller.get_company(body["company_id"])
    if body['name'] is None or body['name']=="":
        return {"msg": "Bad Request: Name is not correct", "error": True, "status": 400 }
    if body['company_id'] is None:
        return {"msg": "Bad Request: Company is not correct", "error": True, "status": 400 }
    status_id= Status.query.filter_by(type=body["status"]).one()
    pet = Repository.create_pet(body,status_id.id)
    images = upload_fotos(fotos)
    add_images= list(map(lambda url: Repository.add_url_to_pet_gallery(url, pet.id),images))
    return pet
    
     
def get_all_pet():
    return Repository.get_all_pet()

def get_one_pet(id):
    one_pet= Repository.get_one_pet(id)
    if one_pet is None:
        return {"msg": "Bad Request: Pet not Found", "error": True, "status": 404 }
    return one_pet 

def get_allpet_company(id):   
    return Repository.get_allpet_company(id)