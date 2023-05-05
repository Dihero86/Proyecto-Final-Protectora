from flask import jsonify
import api.domain.company.controller as Company_controller
import api.domain.user.controller as User_controller
import api.domain.volunteers.repository as Repository







def create_user_admin(body):
    user = User_controller.create_user(body["user"], "admin")
    body["company"]["user_id"] = user.id
    company = Company_controller.new_company(body["company"])
    volunteer = Repository.add_volunteer(user.id, user.id)
    message = f"Usuario createdo con ID {user.id}, Compañía creada con ID {user.id}. El usuario también ha sido añadido a Voluntario"
    return {"user_id": user.id , "message": message }
    
#duda sobre si está bien pasarle como segundo parámetro el user.id. En principio el admin ha de crear una compañía.