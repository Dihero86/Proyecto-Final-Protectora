from flask_jwt_extended import jwt_required, get_jwt
from api.models.index import User, User_rol
from api.utils import generate_sitemap, APIException
import api.domain.user.controller as Controller
from flask import request, jsonify, Blueprint, Flask
import api.domain.company.repository as Repository
import api.domain.company.controller as Controller
from api.models.index import db, Company,User, User_rol


api = Blueprint('/api', __name__)


@api.route('/register', methods=['POST'])
def register():
    body = request.get_json()
    # check if the request body has the required fields for creating a new company
    if all(key in body for key in ('name', 'cif', 'logo', 'description', 'adress', 'user_id')):
        # create a new company
        new_company = Controller.new_company(body)
        return jsonify(new_company), 201

    # create a new user
    user = Controller.create_user(body)
    if isinstance(user, User):
        return jsonify(user.serialize()), 200
    return jsonify(user)



@api.route('/register', methods=['GET'])
def register():
 


