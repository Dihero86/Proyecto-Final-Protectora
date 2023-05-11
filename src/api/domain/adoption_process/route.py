from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Adoption_process
from flask_jwt_extended import jwt_required, get_jwt
import api.domain.adoption_process.controller as Controller
import api.domain.pet.controller as PetController

api = Blueprint('/api/adoption_process', __name__)


# create an adoption process -- OK 
@api.route('/create/<int:pet_id>', methods=['POST'])
@jwt_required()
def create_adoption_process(pet_id):
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    body = request.get_json()
    pet = PetController.get_one_pet(pet_id)
    company_id = pet.company_id
    adoption_process = Controller.create_adoption_process(body, user, pet_id,company_id)
    if isinstance(adoption_process, Adoption_process):
        return jsonify(adoption_process.serialize()), 200
    return jsonify(adoption_process)
        
        

#get all the adoption process -- OK
@api.route('/',methods=['GET'])
@jwt_required()
def get_adoption_process():
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    adoption_processes = Controller.get_all_adoption_processes()
    if isinstance(adoption_processes, Adoption_process):
        return jsonify(adoption_processes.serialize()),200
    return jsonify(adoption_processes)




#get all the adoption process by company -- pending
@api.route('/',methods=['GET'])
@jwt_required()
def get_adoption_process():
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    adoption_processes = Controller.get_all_adoption_processes()
    if isinstance(adoption_processes, Adoption_process):
        return jsonify(adoption_processes.serialize()),200
    return jsonify(adoption_processes)


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
    update_adoption_process = Controller.update_adoption_process(adoption_process_id, data, user)
    return jsonify(update_adoption_process), 200

#get an adoption process
# @api.route('/',methods=['GET'])
# @jwt_required()
# def get_adoption_process():
#     info_token = get_jwt()
#     user = info_token['sub']
#     print(user)
#     adoption_process = Controller.get_adoption_process(user['id'])
#     if isinstance(adoption_process, Adoption_process):
#         return jsonify(adoption_process.serialize()),200
#     return jsonify(adoption_process),adoption_process['status']
