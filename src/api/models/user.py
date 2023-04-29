from api.models.db import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    name = db.Column(db.String(40), unique=False, nullable=False)
    last_name = db.Column(db.String(40), unique=False, nullable=False)
    avatar = db.Column(db.String(80), unique=False, nullable=True)
    user_rol_id = db.Column(
        db.Integer, db.ForeignKey('user_rol.id'), nullable=True)
    user_rol = db.relationship('User_rol')

    def __init__(self, email, password, name, last_name, user_rol_id):
        self.email = email
        self.password = password
        self.name = name
        self.last_name = last_name
        self.user_rol_id = user_rol_id

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "avatar": self.avatar,
            "user_rol_id": self.user_rol_id,
            "user_rol": self.user_rol.serialize()
        }
