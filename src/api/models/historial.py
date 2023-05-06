from api.models.db import db

class Historial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=True)
    description = db.Column(db.String(600), unique=False, nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    create_at = db.Column(db.DateTime)
    pet = db.relationship('Pet')
    user = db.relationship('User')

    def __init__(self, title, description, pet_id, user_id, create_at):
        self.title = title
        self.description = description
        self.pet_id = pet_id
        self.user_id = user_id
        self.create_at = create_at

    def serialize(self):
        return {
            "id": self.id,
            "title" : self.title,
            "description" : self.description,
            "pet_id" : self.pet_id,
            "user_id" : self.user_id,
            "create_at" : self.create_at
        }

