from api.models.index import db, Adoption_process

def get_all_adoption_processes():
    adoption_processes = Adoption_process.query.all()
    adoption_processes_serializes = list(map(lambda adoption_process : adoption_process.serialize(), adoption_processes))
    return adoption_processes_serializes

def create_adoption_process(user_id, pet_id, description, status):
    new_process = Adoption_process(user_id, pet_id, description, status)
    db.session.add(new_process)
    db.session.commit()
    return new_process

def delete_adoption_process(adoption_process_id, user_id, company_id,):
    adoption_process = Adoption_process.query.get(adoption_process_id)
    db.session.delete(adoption_process)
    db.session.commit()
    return "Proceso de adopción borrado satisfactoriamente."

def update_adoption_process(data, adoption_process_id):
    print(data)
    if not isinstance(data, dict):
        return {'error': 'Formato inválido'}, 400
    adoption_process = Adoption_process.query.get(adoption_process_id)
    if not adoption_process:
        return {'error': 'Proceso de adopción no encontrado'}, 404
    adoption_process.description= data.get('description')
    adoption_process.status= data.get('status')
    db.session.commit()
    return adoption_process.serialize(), 200

def get_adoption_process(id):
    adoption_process = Adoption_process.query.get(id)  
    return adoption_process

