from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt
import api.domain.pet_history.controller as Controller
from api.models.index import Historial

api = Blueprint('api/history', __name__)

@api.route("/<int:pet_id>",methods=["POST"])
@jwt_required()
def create_history(pet_id):
    body = request.get_json()
    user = get_jwt()["sub"]
    pet_history = Controller.create_history(pet_id,body,user)
    if isinstance(pet_history, Historial):
        return jsonify(pet_history.serialize()),201
    return jsonify(pet_history),pet_history["status"]

@api.route("/<int:pet_id>",methods=["GET"])
@jwt_required()
def get_history(pet_id):
    user = get_jwt()["sub"]
    pet_history = Controller.get_history(pet_id,user)
    if isinstance(pet_history, Historial):
        return jsonify(pet_history.serialize()),201
    return jsonify(pet_history),pet_history["status"]

@api.route("/<int:pet_id>",methods=["PUT"])
@jwt_required()
def edit_history(pet_id):
    body = request.get_json()
    user = get_jwt()["sub"]
    pet_history = Controller.edit_history(pet_id,body,user)
    if isinstance(pet_history, Historial):
        return jsonify(pet_history.serialize()),201
    return jsonify(pet_history),pet_history["status"]

@api.route("/<int:pet_id>",methods=["DELETE"])
@jwt_required()
def delete_history(pet_id):
    user = get_jwt()["sub"]
    pet_history = Controller.delete_history(pet_id, user)
    return jsonify(pet_history),pet_history["status"]