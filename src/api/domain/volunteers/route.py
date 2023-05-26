from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from api.models.index import CompanyVolunteers, Company
from api.utils import generate_sitemap, APIException
import api.domain.volunteers.controller as Controller
import smtplib
from email.mime.text import MIMEText

api = Blueprint('/api/volunteers', __name__)

@api.route('/company/<int:company_id>')
def get_volunteers_of_company(company_id):
    company_volunteers= Controller.get_volunteers_of_company(company_id)
    return company_volunteers

@api.route('/invite',methods=['POST'])
@jwt_required()
def sendemail():
    body=request.get_json()
    user=get_jwt()["sub"]
    volunteer= Controller.get_volunteer(user["id"])
    if isinstance(volunteer, CompanyVolunteers):   
        mensaje=MIMEText(body["msg"])  
        conexion = smtplib.SMTP(host='smtp-mail.outlook.com',port=587)
        conexion.ehlo()
        conexion.starttls()
        conexion.login(user="petsbookproject@hotmail.com", password="petsbook1")
        conexion.sendmail("petsbookproject@hotmail.com", body["email"],mensaje.as_string())
        conexion.quit()
    return jsonify('sent')

