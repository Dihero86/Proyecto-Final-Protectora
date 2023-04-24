from api.models.index import db, User, User_rol
import api.domain.user.repository as Repository
import bcrypt
from flask_jwt_extended import create_access_token
from flask import jsonify

def verify_user_email_and_pass(user):
    if user['email'] is None or user['email'] == "":
        return {"msg": "Bad request", "error": True, "status": 400 }
    
    if user['password'] is None or user['password'] == "":
        return {"msg": "Bad request", "error": True, "status": 400 }  
    return user

def create_user(new_user):   
    user_verify = verify_user_email_and_pass(new_user)
    if user_verify.get('error') is not None:
        return user_verify
    hashed = bcrypt.hashpw(new_user['password'].encode(), bcrypt.gensalt(14))
    user_rol_id = User_rol.query.filter_by(id = "2").first()
    created_user = Repository.create_user(new_user['email'],  hashed.decode(), new_user['name'], new_user['last_name'],
    new_user['avatar'], new_user['user_rol_id'])
    return jsonify(created_user)