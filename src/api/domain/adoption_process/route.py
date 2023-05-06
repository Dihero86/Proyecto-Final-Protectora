from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Adoption_process
from flask_jwt_extended import jwt_required, get_jwt
import api.domain.adoption_process.controller as Controller

api = Blueprint('/api/adoption_process', __name__)

# get all adoption processes
@api.route('/', methods=['GET'])
@jwt_required()
def get_all_adoption_processes():
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    adoption_processes = Controller.get_all_adoption_processes()
    return jsonify(adoption_processes), 200

# create an adoption process
@api.route('/create', methods=['POST'])
@jwt_required()
def create_adoption_process():
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    body = request.get_json()
    adoption_process = Controller.create_adoption_process(body, "pending")
    if isinstance(adoption_process, Adoption_process):
        return jsonify(adoption_process.serialize()), 200
    return jsonify(adoption_process)

# delete an adoption process 
@api.route('/delete/<int:adoption_process_id>', methods=['DELETE'])
@jwt_required()
def delete_adoption_process(adoption_process_id):
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    delete_adoption_process = Controller.delete_adoption_process(adoption_process_id)
    return jsonify(delete_adoption_process), 201

#update an adoption process
@api.route('/<int:adoption_process_id>', methods=['PUT'])
@jwt_required()
def update_adoption_process(adoption_process_id):
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    data = request.get_json()
    update_adoption_process = Controller.update_adoption_process(adoption_process_id, data)
    return jsonify(update_adoption_process), 200

#get an adoption process
@api.route('/<int:adoption_process_id>',methods=['GET'])
@jwt_required()
def get_adoption_process(adoption_process_id):
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    adoption_process = Controller.get_adoption_process(adoption_process_id)
    if isinstance(adoption_process, Adoption_process):
        return jsonify(adoption_process.serialize()),200
    return jsonify(adoption_process),adoption_process['status']
