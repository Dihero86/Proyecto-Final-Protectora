from api.models.index import db, Company

def get_all_companies():
    companies = Company.query.all()
    companies = list(map(lambda company: company.serialize(), companies))
    return companies
    #checker si es necesario añadir el serialize aquí


def new_company(data):
    #data = request.get_json()
    new_company = Company(data['name'], data['CIF'], data['logo'], data['description'], data['address'], data['user_id'])
    db.session.add(new_company)
    db.session.commit()
    return new_company.serialize(), 201
