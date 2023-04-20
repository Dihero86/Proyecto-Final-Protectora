from api.models.db import db


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    cif = db.Column(db.Integer, nullable=False)
    logo = db.Column(db.String(255)) #es un string?
    description = db.Column(db.String(500))
    adress = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User')


    def __init__(self, name, cif, logo, description, adress, user_id):
        self.name = name
        self.cif = cif
        self.logo = logo
        self.description = description
        self.adress = adress
        self.user_id = user_id


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cif":self.cif,
            "logo":self.logo,
            "description":self.description,
            "adress":self.adress,
            "user_id": self.user_id,
        }




    



