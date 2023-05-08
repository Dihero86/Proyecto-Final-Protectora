import api.domain.pet_history.repository as Repository
import api.domain.pet.controller as Pet_controller
import api.domain.volunteers.controller as Volunteer_Controller
from api.models.index import Pet, CompanyVolunteers

def get_volunteer_and_pet(pet_id,user):
    volunteer = Volunteer_Controller.get_volunteer(user["id"])
    if not isinstance(volunteer, CompanyVolunteers): #compruebo que existe el voluntario
        return {"msg": "Forbidden", "error": True, "status": 403 }
    pet = Pet_controller.get_one_pet(pet_id)
    if not isinstance(pet, Pet): #compruebo que existe la mascota
        return {"msg": "Bad Request: Pet not Found", "error": True, "status": 404 }
    if volunteer.company_id != pet.company_id: #compruebo que sean de la misma company
        return {"msg": "Forbidden", "error": True, "status": 403 }
    return volunteer.serialize()
    
def create_history(pet_id,body,user):
    check_data = get_volunteer_and_pet(pet_id, user)
    if check_data.get('error') is not None:
        return check_data 
    if body["description"] is None or body["description"]=="":
        return {"msg": "Bad Request: Description is not correct", "error": True, "status": 400 }    
    return Repository.create_history(pet_id, body, user["id"])

def get_history(pet_id,user):
    check_data = get_volunteer_and_pet(pet_id, user)
    if check_data.get('error') is not None:
        return check_data 
    return Repository.get_history(pet_id)

def edit_history(pet_id,history_id,body,user):
    check_data = get_volunteer_and_pet(pet_id, user)
    if check_data.get('error') is not None:
        return check_data 
    if body["description"] is None or body["description"]=="":
        return {"msg": "Bad Request: Description is not correct", "error": True, "status": 400 }    
    return Repository.edit_history(pet_id,history_id, body, user["id"])
