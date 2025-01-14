from api.models.index import db, Adoption_process

def get_all_adoption_processes():
    adoption_processes = Adoption_process.query.all()
    adoption_processes_serializes = list(map(lambda adoption_process : adoption_process.serialize(), adoption_processes))
    return adoption_processes_serializes

def get_all_adoption_processes_by_company(company_id):
    adoption_processes = Adoption_process.query.filter_by(company_id = company_id)
    adoption_processes_serializes = list(map(lambda adoption_process : adoption_process.serialize(), adoption_processes))
    return adoption_processes_serializes

def create_adoption_process(user_id, pet_id, description, status,company_id):
    new_process = Adoption_process(user_id, pet_id, description, status,company_id)
    db.session.add(new_process)
    db.session.commit()
    return new_process
   

def delete_adoption_process(adoption_process_id, user_id, company_id,):
    adoption_process = Adoption_process.query.get(adoption_process_id)
    db.session.delete(adoption_process)
    db.session.commit()
    return "Proceso de adopción borrado satisfactoriamente."

def update_adoption_process(data, adoption_process_id):
    adoption_process = get_adoption_process(adoption_process_id)
    adoption_process.description = data['description']
    adoption_process.status = data ['status']
    db.session.commit()
    return adoption_process

def get_adoption_process(id):
    adoption_process = Adoption_process.query.get(id)  
    return adoption_process



def get_all_adoption_processes_by_company(company_id):
    adoption_processes = Adoption_process.query.filter_by(company_id=company_id).all()
    adoption_processes_serialized = list(map(lambda adoption_process : adoption_process.serialize(), adoption_processes))
    return adoption_processes_serialized


def get_all_adoption_processes_by_user_id(user_id):
    adoption_processes = Adoption_process.query.filter_by(user_id=user_id).all()
    adoption_processes_serialized = list(map(lambda adoption_process : adoption_process.serialize(), adoption_processes))
    return adoption_processes_serialized
