import api.domain.pet.repository as Repository
from cloudinary.uploader import upload
from api.models.index import Status, Company, CompanyVolunteers, Pet
import api.domain.company.controller as Company_contoller
import json
import api.domain.volunteers.controller as Volunteer_controller

def get_volunteer_company(user_id,company_id):
    volunteer = Volunteer_controller.get_volunteer(user_id)
    if not isinstance(volunteer, CompanyVolunteers): #compruebo que existe el voluntario
        return {"msg": "Forbidden", "error": True, "status": 403 }
    company = Company_contoller.get_company(company_id)
    if not isinstance(company, Company): #compruebo que existe la compañia
        return {"msg": "Bad Request: Company not Found", "error": True, "status": 404 }
    if volunteer.company_id != company.id: #compruebo que sean de la misma company
        return {"msg": "Forbidden", "error": True, "status": 403 }
    return volunteer.serialize()

def upload_fotos(fotos):
    array_fotos= list(fotos.lists())
    lista_imagenes = list(map(lambda foto: upload(foto[1][0]),array_fotos))
    lista_urls = list(map(lambda data: data["secure_url"],lista_imagenes))
    return lista_urls

def create_pet(data,fotos,user):
    body = json.loads(data)
    checkdata = get_volunteer_company(user["id"], body["company_id"])
    if checkdata.get("error"):
        return checkdata
    if body['name'] is None or body['name']=="":
        return {"msg": "Bad Request: Name is not correct", "error": True, "status": 400 }
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

def update_pet(data,fotos,user):
    body = json.loads(data)
    checkdata = get_volunteer_company(user["id"], body["company_id"])
    pet = get_one_pet(body["id"])
    if pet is None:
        return {"msg": "Bad Request: Pet not Found", "error": True, "status": 404 }
    if type(body["status"]) is not dict:
        status= Status.query.filter_by(type=body["status"]).first()
        body['status_id'] = status.id
    Repository.update_pet(body, pet.id)
    images = upload_fotos(fotos)
    add_images= list(map(lambda url: Repository.add_url_to_pet_gallery(url, pet.id),images))
    return {'message': 'Pet updated successfully',"status": 200}