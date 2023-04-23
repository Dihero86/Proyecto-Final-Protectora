import api.domain.pet.repository as Repository

def create_pet(body):
    if body['name'] is None or body['name']=="":
        return {"msg": "Bad Request: Name is not correct", "error": True, "status": 400 }
    if body['company_id'] is None:
        return {"msg": "Bad Request: Company is not correct", "error": True, "status": 400 }
    return Repository.create_pet(body) #Falta comprobar que la compañia existe, cuando se termine controller de compañia

def get_all_pet():
    return Repository.get_all_pet()

def get_one_pet(id):
    one_pet= Repository.get_one_pet(id)
    if one_pet is None:
        return {"msg": "Bad Request: Pet not Found", "error": True, "status": 404 }
    return one_pet #Falta comprobar que la compañia existe, cuando se termine controller de compañia
    
def get_allpet_company(id):
    #Falta comprobar que la compañia existe, cuando se termine controller de compañia
    return Repository.get_allpet_company(id)