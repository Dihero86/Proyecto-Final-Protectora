from flask import jsonify
import api.domain.company.controller as Company_controller
import api.domain.user.controller as User_controller








#aquí lo que busco es que llame a los dos  y luego cambio el retorno para que me de el resultado que quiero realmente para que me devuelva el usuario y la compañía


def create_user_admin(body):
    user = User_controller.create_user(body["user"], "admin")
    body["company"]["user_id"] = user.id
    company = Company_controller.new_company(body["company"])
    return {"message": "User and company created successfully"}

#pasarle user.id y company.id para que tb sea voluntario a la vez que admin y tenga sus permisos
