import api.domain.adoption_process.repository as Repository
from api.models.index import db, Adoption_process, Volunteer


def get_all_adoption_processes():
    return Repository.get_all_adoption_processes()


def create_adoption_process(new_process, status):
    if pet_id is None:
        return {"msg": "Animal no encontrado", "error": True, "status": 404 }
    return Repository.create_adoption_process(new_process['user_id'], new_process['pet_id'], new_process['description'], status)


def delete_adoption_process(adoption_process, volunteer):

    if volunteer['company_id'] is None :
        return {"msg": "No puede realizar esta operación", "error": True, "status": 400 }

    if adoption_process[] is None:
        return {'error': 'ID Proceso de adopción no encontrado'}, 400
    adoption_process = Adoption_process.query.get(adoption_process_id)
    if not adoption_process:
        return {'error': 'Proceso de adopción no encontrado'}, 404
    Repository.delete_adoption_process(adoption_process_id)
    return {'msg': 'Proceso de adopción borrado satisfactoriamente'}, 204

def update_adoption_process(adoption_process_id, data):
    if user['rol_id'] is None or user['rol_id'] != "ADMIN":
         return {"msg": "No tiene el acceso permitido", "error": True, "status": 400 }
    adoption_process = Adoption_process.query.get(adoption_process_id)
    if not adoption_process:
        return {"msg": "Proceso de adopción no encontrado", "error": True, "status": 400 }
    Repository.update_adoption_process(data, adoption_process_id)
    return {'msg': 'Proceso de adopción actualizado correctamente'}, 200

def get_adoption_process(adoption_process_id):
    adoption_process= Repository.get_adoption_process(adoption_process_id)
    if adoption_process is None:
         return {"msg": "Proceso de adopción no encontrado", "error": True, "status": 404 }
    return adoption_process