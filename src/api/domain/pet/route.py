from flask import Flask, request, jsonify, Blueprint
from api.models.index import db, Pet

import api.domain.pet.controller as Controller

api = Blueprint('api/pet', __name__)

@api.route('/create', methods=['POST']) #crea una mascota
def create_pet():
    body = request.get_json()
    pet = Controller.create_pet(body)

    if isinstance(pet, Pet):
        return jsonify(pet.serialize()),201
    return jsonify(pet),pet["status"]

@api.route('/', methods=['GET']) #get todas las mascotas
def get_all_pet():
    all_pets= Controller.get_all_pet()
    return jsonify(all_pets),200

@api.route('/<int:pet_id>', methods=['GET']) #get una mascota
def get_one_pet(pet_id):
    one_pet= Controller.get_one_pet(pet_id)
    if isinstance(one_pet, Pet):
        return jsonify(one_pet.serialize()),200
    return jsonify(one_pet),one_pet["status"]

@api.route('/company/<int:company_id>', methods=['GET']) #get una mascota
def get_allpet_company(company_id):
    all_pets = Controller.get_allpet_company(company_id)
    return jsonify(all_pets),200