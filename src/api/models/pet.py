from api.models.db import db


class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    breed = db.Column(db.String(100))
    size = db.Column(db.String(50))
    description = db.Column(db.String(500))
    status_id = db.Column(db.Integer, db.ForeignKey('status.id'), nullable=False)
    status = db.relationship('Status')
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    company = db.relationship('Company')
    pet_Gallery= db.relationship('Pet_Gallery',back_populates="pet")

    def __init__(self, name, age, breed, size, description, status_id, company_id):
        self.name = name
        self.age = age
        self.breed = breed
        self.size = size
        self.description = description
        self.status_id = status_id
        self.company_id = company_id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "breed": self.breed,
            "size": self.size,
            "description": self.description,
            "status_id": self.status_id,
            "status": self.status.serialize(),
            "company_id": self.company_id,
            "pet_Gallery": list(map(lambda picture: picture.serialize(),self.pet_Gallery))
        }