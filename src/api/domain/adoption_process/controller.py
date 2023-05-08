import api.domain.adoption_process.repository as Repository
from api.models.index import db, Adoption_process
import api.domain.pet.controller as PetController


def get_all_adoption_processes():
    return Repository.get_all_adoption_processes()


def create_adoption_process(body, user, pet_id):
    pet = PetController.get_one_pet(pet_id)
    Repository.create_adoption_process(user['id'], pet_id, body['description'], "pending")
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

def update_adoption_process(adoption_process_id, data, user):
    pass
def get_adoption_process(adoption_process_id):
    adoption_process= Repository.get_adoption_process(adoption_process_id)
    if adoption_process is None:
         return {"msg": "Proceso de adopción no encontrado", "error": True, "status": 404 }
    return adoption_process