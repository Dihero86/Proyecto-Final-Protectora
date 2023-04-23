from flask import request, jsonify, Blueprint, Flask
import api.domain.company.repository as Repository
import api.domain.company.controller as Controller
from api.models.index import db, Company

api = Blueprint('/api', __name__)

#get all_company
@api.route('/company', methods=['GET'])
def get_all_companies():
    companies = Repository.get_all_companies()
    return jsonify(companies),200
        

# create_company, #checkear método post
@api.route('/company', methods=['POST'])
def new_company():
    body = request.get_json()
    new_company = Controller.new_company(body)
    return jsonify(new_company),201
    
#añadir método PUT y DELETE de compañía y crear un endpoint para un id concreto de la compañía



@api.route('/company/<int:company_id>', methods=['DELETE'])
def delete_company(company_id):
    delete_company = Controller.delete_company(company_id)
    return jsonify(delete_company), 201


@api.route('/company/<int:company_id>', methods=['PUT'])
def update_company(company_id):
    data = request.get_json()
    update_company = Controller.update_company(company_id, data)
    return jsonify(update_company), 200