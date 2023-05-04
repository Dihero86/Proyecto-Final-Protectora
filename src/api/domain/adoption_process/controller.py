import api.domain.adoption_process.repository as Repository
from api.models.index import db, Adoption_process


def get_all_adoption_processes():
    return Repository.get_all_adoption_processes()


def create_adoption_process(new_process):
    return Repository.create_adoption_process(new_process['user_id'], new_process['pet_id'], new_process['description'], new_process['status'])


def delete_adoption_process(adoption_process_id):
    if adoption_process_id is None:
        return {'error': 'Proceso ID no indicado'}, 400
    adoption_process = Adoption_process.query.get(adoption_process_id)
    if not adoption_process:
        return {'error': 'Proceso no encontrado'}, 404
    Repository.delete_adoption_process(adoption_process_id)
    return {'msg': 'Proceso de adopción borrado satisfactoriamente'}, 204

def update_adoption_process(adoption_process_id, data):
    adoption_process = Adoption_process.query.get(adoption_process_id)
    if not adoption_process:
        return {'error': 'Proceso de adopción no encontrado'}, 404
    Repository.update_adoption_process(data, adoption_process_id)
    return {'msg': 'Proceso de adopción actualizado correctamente'}, 200

def get_adoption_process(adoption_process_id):
    adoption_process= Repository.get_adoption_process(adoption_process_id)
    if adoption_process is None:
         return {"msg": "Proceso de adopción no encontrado", "error": True, "status": 404 }
    return adoption_process