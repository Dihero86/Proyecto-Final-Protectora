"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models.index import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models.company import Company
from api.models.user import User
import api.domain.company.route as api_company
import api.domain.volunteers.route as api_volunteers
import api.domain.user.route as api_user
import api.domain.pet.route as api_pet
import api.domain.adoption_process.route as api_adoption_process
import api.domain.pet_history.route as api_history_pet
import api.domain.payment.route as api_pay
from flask_jwt_extended import JWTManager
import cloudinary
import datetime

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.config["JWT_SECRET_KEY"] = os.environ['JWT_SECRET_KEY']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(seconds=1200)
jwt=JWTManager(app)

app.config['CLOUD_NAME'] = os.environ.get('CLOUD_NAME')
app.config['CLOUD_API_KEY'] = os.environ.get('CLOUD_API_KEY')
app.config['CLOUD_API_SECRET'] = os.environ.get('CLOUD_API_SECRET')

cloudinary.config(
    cloud_name = app.config['CLOUD_NAME'],
    api_key = app.config['CLOUD_API_KEY'],
    api_secret = app.config['CLOUD_API_SECRET'],
    secure = True
)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(api_company.api, url_prefix='/api')
app.register_blueprint(api_user.api, url_prefix='/api/user')
app.register_blueprint(api_pet.api, url_prefix='/api/pet')
app.register_blueprint(api_adoption_process.api, url_prefix='/api/adoption_process')
app.register_blueprint(api_history_pet.api, url_prefix='/api/history')
app.register_blueprint(api_volunteers.api, url_prefix='/api/volunteers')
app.register_blueprint(api_pay.api, url_prefix='/api/pay')
# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
