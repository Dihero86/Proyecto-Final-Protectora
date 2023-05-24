from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from api.models.index import User, User_rol, CompanyVolunteers, Company
from api.utils import generate_sitemap, APIException
import api.domain.volunteers.controller as Controller
import smtplib

api = Blueprint('/api/volunteers', __name__)

@api.route('/company/<int:company_id>')
def get_volunteers_of_company(company_id):
    company_volunteers= Controller.get_volunteers_of_company(company_id)
    return company_volunteers

@api.route('/invite',methods=['POST'])
def sendemail():
    conexion = smtplib.SMTP(host='smtp.gmail.com',port=587)
    conexion.ehlo()
    conexion.starttls()
    conexion.login(user="petsbookproject@gmail.com", password="")
    mensaje="Subject:prueba\nEsto es una prueba"
    conexion.sendmail(from_addr="petsbookproject@gmail.com", to_addrs="petsbookproject@gmail.com", msg=mensaje)
    conexion.quit()
    return jsonify('sent')