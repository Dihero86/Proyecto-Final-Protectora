from flask import request, jsonify, Blueprint, Flask
import api.domain.company.repository as Repository
import api.domain.company.controller as Controller
from api.models.index import db, Company
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from api.models.index import User, User_rol
from api.utils import generate_sitemap, APIException


api = Blueprint('/api', __name__)

@api.route('/company', methods=['GET'])
def get_all_companies():
    companies = Repository.get_all_companies()
    return jsonify(companies),200

@api.route('/company/<int:company_id>', methods=['DELETE'])
def delete_company(company_id):
    delete_company = Controller.delete_company(company_id)
    return jsonify(delete_company), 201

@api.route('/company/<int:company_id>', methods=['PUT'])
def update_company(company_id):
    data = request.get_json()
    update_company = Controller.update_company(company_id, data)
    return jsonify(update_company), 200

@api.route('/company/<int:company_id>',methods=['GET'])
def get_company(company_id):
    company = Controller.get_company(company_id)
    if isinstance(company, Company):
        return jsonify(company.serialize()),200
    return jsonify(company),company['status']

@api.route('/company/dashboard',methods=['GET'])
@jwt_required()
def get_companyid_pets():
    user = get_jwt()['sub']
    petscompany = Controller.get_companyid_pets(user)
    return jsonify(petscompany),200




