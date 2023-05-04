from api.models.db import db

class Adoption_process(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    description = db.Column(db.String(240), nullable=False)
    status = db.Column(db.String(40), nullable=False) #puede ser el string "rechazada" o "aprobada" o "pendiente"
    user = db.relationship('User')
    pet = db.relationship('Pet')

    def __init__(self, user_id, pet_id, description, status):
        self.user_id = user_id
        self.pet_id = pet_id
        self.description = description
        self.status = status
       
    def __repr__(self):
        return f'<Adoption_process {self.email}>'

    def serialize(self):
        return {
        "id": self.id,
        "user_id": self.user_id,
        "pet_id": self.pet_id,
        "description": self.description,
        "status": self.status
        }
