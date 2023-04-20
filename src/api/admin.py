  
import os
from flask_admin import Admin
from api.models.index import db, Adopted_Pet, Adoption_process, Company, Historial, Pet_Gallery, Pet, Status, User_rol, User, CompanyVolunteers
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Adopted_Pet, db.session))
    admin.add_view(ModelView(Adoption_process, db.session))
    admin.add_view(ModelView(Company, db.session))
    admin.add_view(ModelView(Historial, db.session))
    admin.add_view(ModelView(Pet_Gallery, db.session))
    admin.add_view(ModelView(Pet, db.session))
    admin.add_view(ModelView(Status, db.session))
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(User_rol, db.session))
    admin.add_view(ModelView(CompanyVolunteers, db.session))
  
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))