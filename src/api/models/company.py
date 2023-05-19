from api.models.db import db


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100),unique=True, nullable=False)
    cif = db.Column(db.Integer,unique=True, nullable=False)
    logo = db.Column(db.String(255), unique=True, nullable=True) 
    description = db.Column(db.String(500), unique=False, nullable=True)
    city = db.Column(db.String(120), unique=False, nullable=False)
    adress = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)



    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User')


    def __init__(self, name, cif, description, city, adress, phone, email, user_id):
        self.name = name
        self.cif = cif
        self.description = description
        self.city = city
        self.adress = adress
        self.phone = phone
        self.email = email
        self.user_id = user_id


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cif":self.cif,
            "logo":self.logo,
            "description":self.description,
            "city": self.city,
            "adress":self.adress,
            "phone": self.phone,
            "email": self.email,
            "user_id": self.user_id,
        }




    



