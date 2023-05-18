from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from api.models.index import User, User_rol, CompanyVolunteers, Company
from api.utils import generate_sitemap, APIException
import api.domain.volunteers.controller as Controller


api = Blueprint('/api/volunteers', __name__)

@api.route('/company/<int:company_id>')
def get_volunteers_of_company(company_id):
    company_volunteers= Controller.get_volunteers_of_company(company_id)
    return company_volunteers