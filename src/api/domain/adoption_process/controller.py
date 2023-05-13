import api.domain.adoption_process.repository as Repository
from api.models.index import db, Adoption_process,Company
import api.domain.pet.controller as PetController
import api.domain.volunteers.controller as VolunteersController


def get_all_adoption_processes():
    return Repository.get_all_adoption_processes()


def create_adoption_process(body, user, pet_id, company_id):
    pet = PetController.get_one_pet(pet_id)
    Repository.create_adoption_process(user['id'], pet_id, body['description'], 'pending', company_id)
    return "el proceso de adopción se creó correctramente"


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

def update_adoption_process(data, adoption_process_id):
    # volunteer = VolunteersController.get_volunteer(user['id'])
    adoption_process= Repository.get_adoption_process(adoption_process_id)
    Repository.update_adoption_process(data, adoption_process_id)
        
    return "proceso de adopción actualizado"

# def update_adoption_process(adoption_process_id, data, user):
#     # volunteer = VolunteersController.get_volunteer(user['id'])
#     adoption_process= Repository.get_adoption_process(adoption_process_id)
#     if volunteer.company_id == adoption_process.pet.company_id : 
#         Repository.update_adoption_process(data, adoption_process_id)
#         return "proceso actualizado"
#     return "no tienes permiso para hacer esto"


def get_adoption_process(adoption_process_id):
    adoption_process= Repository.get_adoption_process(adoption_process_id)
    if adoption_process is None:
         return {"msg": "Proceso de adopción no encontrado", "error": True, "status": 404 }
    return adoption_process


def get_all_adoption_processes_by_company(company_id):
    return Repository.get_all_adoption_processes_by_company(company_id)


def get_all_adoption_processes_by_user_id(user_id):
    return Repository.get_all_adoption_processes_by_user_id(user_id)

