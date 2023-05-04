from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Adoption_process
import api.domain.adoption_process.controller as Controller

api = Blueprint('/api/adoption_process', __name__)

# get all adoption processes
@api.route('/', methods=['GET'])
def get_all_adoption_processes():
    adoption_processes = Controller.get_all_adoption_processes()
    return jsonify(adoption_processes), 200

# create an adoption process
@api.route('/create', methods=['POST'])
def create_adoption_process():
    body = request.get_json()
    adoption_process = Controller.create_adoption_process(body)
    if isinstance(adoption_process, Adoption_process):
        return jsonify(adoption_process.serialize()), 200
    return jsonify(adoption_process)

# delete an adoption process 
@api.route('/delete/<int:adoption_process_id>', methods=['DELETE'])
def delete_adoption_process(adoption_process_id):
    delete_adoption_process = Controller.delete_adoption_process(adoption_process_id)
    return jsonify(delete_adoption_process), 201

#update an adoption process
@api.route('/<int:adoption_process_id>', methods=['PUT'])
def update_adoption_process(adoption_process_id):
    data = request.get_json()
    update_adoption_process = Controller.update_adoption_process(adoption_process_id, data)
    return jsonify(update_adoption_process), 200

#get an adoption process
@api.route('/<int:adoption_process_id>',methods=['GET'])
def get_adoption_process(adoption_process_id):
    adoption_process = Controller.get_adoption_process(adoption_process_id)
    if isinstance(adoption_process, Adoption_process):
        return jsonify(adoption_process.serialize()),200
    return jsonify(adoption_process),adoption_process['status']
