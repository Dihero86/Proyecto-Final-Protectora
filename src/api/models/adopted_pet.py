from api.models.db import db

class Adopted_Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))

    pet = db.relationship('Pet')
    user = db.relationship('User')
    
    def __init__(self, user_id, pet_id):
        self.user_id = user_id
        self.pet_id = pet_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id" : self.user_id,
            "pet_id" : self.pet_id
        }
