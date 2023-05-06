from api.models.index import db, Company
import api.domain.company.repository as Repository



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


def update_company(company_id, data):
    company = Company.query.get(company_id)
    if not company:
        return {'error': 'Company not found'}, 404
    Repository.update_company(data, company_id)
    return {'message': 'Company updated successfully'}, 200

def get_company(company_id):
    company= Repository.get_company(company_id)
    if company is None:
         return {"msg": "Bad Request: Company not Found", "error": True, "status": 404 }
    return company