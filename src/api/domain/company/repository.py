from api.models.index import db, Company

def get_all_companies():
    companies = Company.query.all()
    companies = list(map(lambda company: company.serialize(), companies))
    return companies
    #checker si es necesario añadir el serialize aquí


def new_company(data):
    new_company = Company(data['name'], data['CIF'], data['logo'], data['description'], data['address'], data['user_id'])
    db.session.add(new_company)
    db.session.commit()
    return new_company.serialize(), 201


def delete_company(company_id):
    company = Company.query.get(company_id)
    db.session.delete(company)
    db.session.commit()
    return "Company borrada satisfactoriamente.",201



def update_company(data, company_id):
    if not isinstance(data, dict):
        return {'error': 'Formato inválido'}, 400
    company = Company.query.get(company_id)
    if not company:
        return {'error': 'Company not found'}, 404
    company.name = data.get('name', company.name)
    company.CIF = data.get('CIF', company.CIF)
    company.logo = data.get('logo', company.logo)
    company.description = data.get('description', company.description)
    company.address = data.get('address', company.address)
    db.session.commit()
    return company.serialize(), 200





