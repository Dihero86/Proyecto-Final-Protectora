from api.models.index import db, CompanyVolunteers

def add_volunteer(user_id,company_id):
    new_volunteer=CompanyVolunteers(user_id, company_id)
    db.session.add(new_volunteer)
    db.session.commit()
    return new_volunteer

def get_volunteer(user_id):
    user = CompanyVolunteers.query.filter_by(user_id=user_id).first()
    return user

def get_volunteers_of_company(company_id):
    company_volunteers= CompanyVolunteers.query.filter_by(company_id = company_id).all()
    company_volunteers= list(map(lambda volunteer: volunteer.serialize(), company_volunteers))
    return company_volunteers