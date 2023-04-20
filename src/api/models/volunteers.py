from api.models.db import db


class CompanyVolunteers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))


    def __init__(self, user_id, company_id):
        self.user_id = user_id
        self.company_id = company_id


    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "company_id": self.company_id,
        }