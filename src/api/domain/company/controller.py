from api.models.index import db, Company, CompanyVolunteers
import api.domain.company.repository as Repository
import api.domain.volunteers.controller as Volunteer_Controller
import api.domain.pet.controller as Pet_Controller
import json
from cloudinary.uploader import upload

def get_all_companies(data):
    if len(data) == 0:
        return Response.response_error('No hay nada en la base de datos', 400)
    return Repository.get_all_companies(data),201

def new_company(data):
    if data['name'] is None or data['name'] == '':
        return ('Áñade un nombre correcto',400)
    return Repository.new_company(data)

def delete_company(company_id):
    if company_id is None:
        return {'error': 'Compañía ID no indicado'}, 400
    company = Company.query.get(company_id)
    if not company:
        return {'error': 'Compañía no encontrada'}, 404
    Repository.delete_company(company_id)
    return {'message': 'Compañiía borrada satisfactoriamente'}, 204

def update_company(company_id, data, user,foto):
    volunteer = Volunteer_Controller.get_volunteer(user["id"])
    if not isinstance(volunteer, CompanyVolunteers): #compruebo que existe el voluntario
        return {"msg": "Forbidden", "error": True, "status": 403 }
    company = Company.query.get(company_id)
    if not company:
        return {'error': 'Company not found'}, 404
    datajson= json.loads(data)  
    print(datajson)
    url_logo=datajson["logo"]
    if foto!="":    
        logo= upload(foto)
        url_logo=logo["secure_url"]
    update= Repository.update_company(datajson, company_id,url_logo)
    return {'message': 'Company updated successfully'}, 200

def get_company(company_id):
    company= Repository.get_company(company_id)
    if company is None:
         return {"msg": "Bad Request: Company not Found", "error": True, "status": 404 }
    return company

def get_companyid_pets(user):
    volunteer = Volunteer_Controller.get_volunteer(user["id"])
    if not isinstance(volunteer, CompanyVolunteers): #compruebo que existe el voluntario
        return {"msg": "Forbidden", "error": True, "status": 403 }
    company = get_company(volunteer.company_id) #compruebo compañia
    pets = Pet_Controller.get_allpet_company(company.id)
    return {"pets":pets,"company":company.serialize()}
        