from api.models.index import db, CompanyVolunteers

def add_volunteer(user_id,company_id):
    new_volunteer=CompanyVolunteers(user_id, company_id)
    db.session.add(new_volunteer)
    db.session.commit()
    return new_volunteer

def get_volunteer(user_id):
    user = CompanyVolunteers.query.filter_by(user_id=user_id).first()
    return user