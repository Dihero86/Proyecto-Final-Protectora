from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from api.models.index import db, User, User_rol
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
    print(body, company_id)
    volunteer = Controller.create_volunteer(body, company_id)
    if isinstance(volunteer, User):
        return jsonify(volunteer.serialize()), 200
    return jsonify(volunteer),volunteer['status']


@api.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()

    # Retrieve the user from the database
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Update the user's details
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.name = data.get('name', user.name)
    user.last_name = data.get('last_name', user.last_name)
    user.avatar = data.get('avatar', user.avatar)
    user.user_rol_id = data.get('user_rol_id', user.user_rol_id)

    # Save the changes to the database
    db.session.commit()

    return jsonify({'message': 'User updated successfully', 'user': user.serialize()}), 200





#creating an user admin and a company

@api.route('/register/company/admin', methods=['POST'])
def create_user_admin():
    body = request.get_json()
    result = CompanyUserController.create_user_admin(body)

    return jsonify(result), 200

@api.route('/client', methods=['GET'])
@jwt_required()
def get_client():
    user = get_jwt()['sub']
    return jsonify(user)