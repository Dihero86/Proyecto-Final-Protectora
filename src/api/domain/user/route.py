from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from api.models.index import User, User_rol
from api.utils import generate_sitemap, APIException
import api.domain.user.controller as Controller
import api.domain.companyuser.controller as CompanyUserController


api = Blueprint('/api/user', __name__)

@api.route('/register/client', methods=['POST'])
def create_user():
    body = request.get_json()
    user = Controller.create_user(body,"client")
    if isinstance(user, User):
        return jsonify(user.serialize()), 200
    return jsonify(user)

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    token = Controller.login(body)
    if token.get('token'):
        return jsonify(token),200
    return jsonify(token),token['status']

@api.route('/register/volunteer/<int:company_id>', methods=['POST'])
def create_volunteer(company_id):
    body = request.get_json()
    volunteer = Controller.create_volunteer(body, company_id)
    if isinstance(volunteer, User):
        return jsonify(volunteer.serialize()), 200
    return jsonify(volunteer),volunteer['status']



#creating an user admin and a company

@api.route('/register/company/admin', methods=['POST'])
def create_user_admin():
    body = request.get_json()
    result = CompanyUserController.create_user_admin(body)
    return jsonify(result), 200