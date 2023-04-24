from api.models.db import db

class User_rol(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rol_type = db.Column(db.String(40), unique=True, nullable=False) #ADMIN / CLIENT / WORKER

    def __init__(self, rol_type ):
        self.rol_type = rol_type 

    def __repr__(self):
        return f'<User_rol {self.rol_type}>'

    def serialize(self):
        return {
        "id": self.id,
        "rol_type": self.rol_type,
        }

