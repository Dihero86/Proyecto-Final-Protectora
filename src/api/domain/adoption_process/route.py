from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Adoption_process
from flask_jwt_extended import jwt_required, get_jwt
import api.domain.adoption_process.controller as Controller
import api.domain.pet.controller as PetController

api = Blueprint('/api/adoption_process', __name__)


# create an adoption process -- OK 

#tiene que ser usuario normal para poder crearlo --OK
@api.route('/create/<int:pet_id>', methods=['POST'])
@jwt_required()
def create_adoption_process(pet_id):
    info_token = get_jwt()
    user = info_token['sub']
    body = request.get_json()
    adoption_process = Controller.create_adoption_process(body, user, pet_id)
    if isinstance(adoption_process, Adoption_process):
        return jsonify(adoption_process.serialize()), 200
    return jsonify(adoption_process)
        
        

#get all the adoption process -- OK
@api.route('/',methods=['GET'])
@jwt_required()
def get_all_adoption_processes():
    info_token = get_jwt()
    user = info_token['sub']
    adoption_processes = Controller.get_all_adoption_processes()
    if isinstance(adoption_processes, Adoption_process):
        return jsonify(adoption_processes.serialize()),200
    return jsonify(adoption_processes)


#get adoption process by company_id --OK
@api.route('/company/<int:company_id>', methods=['GET'])
@jwt_required()
def get_company_by_id(company_id):
    info_token = get_jwt()
    user = info_token['sub']
    adoption_processes = Controller.get_all_adoption_processes_by_company(company_id, user)
    return jsonify(adoption_processes), 200


#get an adoption process bý_id --OK
@api.route('/<int:adoption_process_id>', methods=['GET'])
@jwt_required()
def get_adoption_process_by_id(adoption_process_id):
    info_token = get_jwt()
    user = info_token['sub']
    adoption_process = Controller.get_adoption_process(adoption_process_id)
    if adoption_process is None:
        return jsonify({'error': 'Proceso de adopción no encontrado'}), 404
    adoption_process_serialized = adoption_process.serialize()
    return jsonify(adoption_process_serialized), 200



#get an adoption process by user_id --ok
#tiene que ser usuario normal, debe de poder ver sus procesos abiertos
@api.route('/company/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_adoption_process_by_user_id(user_id):
    info_token = get_jwt()
    user = info_token['sub']
    adoption_processes = Controller.get_all_adoption_processes_by_user_id(user_id)
    if adoption_processes is None:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    return jsonify(adoption_processes), 200


#update an adoption process -- Ok
@api.route('/update/<int:adoption_process_id>', methods=['PUT'])
@jwt_required()
def update_adoption_process(adoption_process_id):
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    data = request.get_json()
    update_adoption_process = Controller.update_adoption_process(data, adoption_process_id)
    return jsonify(update_adoption_process), 200



# delete an adoption process 
@api.route('/delete/<int:adoption_process_id>', methods=['DELETE'])
@jwt_required()
def delete_adoption_process(adoption_process_id):
    info_token = get_jwt()
    user = info_token['sub']
    print(user)
    delete_adoption_process = Controller.delete_adoption_process(adoption_process_id)
    return jsonify(delete_adoption_process), 201




