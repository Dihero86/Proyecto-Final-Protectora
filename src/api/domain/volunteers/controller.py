import api.domain.volunteers.repository as Repository

def add_volunteer(user_id,company_id):
    new_volunteer = Repository.add_volunteer(user_id, company_id)    
    if user_id=="" or user_id is None:
        return {"msg": "Internal error" },500
    return new_volunteer

def get_volunteer(user_id):
    volunteer = Repository.get_volunteer(user_id)
    if volunteer is None:
        return {"msg": "Bad Request: Volunteer not Found", "error": True, "status": 404 }
    return volunteer