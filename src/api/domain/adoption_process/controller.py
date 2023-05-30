import api.domain.adoption_process.repository as Repository
from api.models.index import db, Adoption_process,Company,CompanyVolunteers, Pet
import api.domain.pet.controller as PetController
import api.domain.volunteers.controller as VolunteersController
import api.domain.company.controller as CompanyController





def get_all_adoption_processes():
    return Repository.get_all_adoption_processes()

#traérmelo aquí como en pet_history_controller , create_data linea 16-21 , para poder
#reutilizarlo
def create_adoption_process(body, user, pet_id):
    pet = PetController.get_one_pet(pet_id)
    if not isinstance(pet, Pet): #compruebo que existe la mascota
        return {"msg": "Bad Request: Pet not Found", "error": True, "status": 404 }
    adoption_check = Adoption_process.query.filter_by(user_id=user['id'], pet_id=pet_id).first()
    if isinstance(adoption_check, Adoption_process):
        return {"msg": "Bad Request: Esta mascota ya tiene un proceso de adopción abierto", "error": True, "status": 404 }
    company_id = pet.company_id
    Repository.create_adoption_process(user['id'], pet_id, body['description'], 'pending', company_id)
    return {"msg":"el proceso de adopción se creó correctramente","status":200}


def delete_adoption_process(adoption_process, volunteer):

    if volunteer['company_id'] is None :
        return {"msg": "No puede realizar esta operación", "error": True, "status": 400 }

    if adoption_process is None:
        return {'error': 'ID Proceso de adopción no encontrado'}, 400
    adoption_process = Adoption_process.query.get(adoption_process_id)
    if not adoption_process:
        return {'error': 'Proceso de adopción no encontrado'}, 404
    Repository.delete_adoption_process(adoption_process_id)
    return {'msg': 'Proceso de adopción borrado satisfactoriamente'}, 204


#hay que añadir los condicionales de filter by_company_id
def update_adoption_process(data, adoption_process_id):
    adoption_process = Repository.get_adoption_process(adoption_process_id)

    if not isinstance(adoption_process, Adoption_process):
        return {"msg": "Bad Request: Adoption Process not Found", "error": True, "status": 404}

    pet = PetController.get_one_pet(adoption_process.pet_id)

    if not isinstance(pet, Pet):
        return {"msg": "Bad Request: Pet not Found", "error": True, "status": 404}

    company = CompanyController.get_company_by_id(pet.company_id)

    if not isinstance(company, Company):
        return {"msg": "Bad Request: Company not Found", "error": True, "status": 404}

    Repository.update_adoption_process(data, adoption_process_id)

    return "proceso de adopción actualizado"



def get_adoption_process(adoption_process_id):
    adoption_process= Repository.get_adoption_process(adoption_process_id)
    if adoption_process is None:
         return {"msg": "Proceso de adopción no encontrado", "error": True, "status": 404 }
    return adoption_process


def get_all_adoption_processes_by_company(company_id, user):
    volunteer = VolunteersController.get_volunteer(user['id'])
    print(volunteer)
    if not isinstance(volunteer, CompanyVolunteers):
        return {"msg": "Forbidden", "error": True, "status": 403 }
    company =  CompanyController.get_company(company_id)
    if not isinstance(company, Company):
        return {"msg": "Compañía no encontrada", "error": True, "status": 400 }
    
    if volunteer.company_id != company_id:
        return {"msg": "No tienes permiso", "error": True, "status": 400 }

    return Repository.get_all_adoption_processes_by_company(company_id)


def get_all_adoption_processes_by_user_id(user_id):
    return Repository.get_all_adoption_processes_by_user_id(user_id)

