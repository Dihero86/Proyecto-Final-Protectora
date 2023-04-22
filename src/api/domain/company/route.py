from flask import request, jsonify, Blueprint, Flask
#import api.domain.company.controller as Controller
#import api.domain.company.repository as Repository
import api.domain.company.controller as Controller

api = Blueprint('/api', __name__)

#get Company

@api.route('/company', methods=['GET'])
def get_all_companies():
    companies = Repository.get_all_companies()
    return jsonify(companies),200
        

    # create_company
@api.route('/company', methods=['POST'])
def new_company():
    body = request.get_json()
    print(body)
    new_company = Controller.new_company(body)
    return jsonify('recibido'),200
    
#añadir método PUT y DELETE de compañía

