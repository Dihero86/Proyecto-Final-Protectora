import api.domain.volunteers.repository as Repository

def add_volunteer(user_id,company_id):
    volunteer = Repository.add_volunteer(user_id, company_id)    
    if user_id=="" or user_id is None:
        return {"msg": "Internal error" },500
    return volunteer
    
