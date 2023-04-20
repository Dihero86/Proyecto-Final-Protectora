from api.models.db import db

class Pet_Gallery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500), unique=True, nullable=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))
    
    pet = db.relationship('Pet')

    def __init__(self, image_url, pet_id):
        self.image_url = image_url
        self.pet_id = pet_id
        

    def serialize(self):
        return {
            "id": self.id,
            "image_url" : self.image_url,
            "pet_id" : self.pet_id
        }
