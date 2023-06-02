from api.models.index import db, User, User_rol


def create_user(email, password, name, last_name, user_rol_id):
    new_user = User(email = email, password=password, name=name, last_name= last_name, user_rol_id = user_rol_id)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def get_user_by_email(email):
    return User.query.filter_by(email=email).one()



def update_user_details(user, data):
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.name = data.get('name', user.name)
    user.last_name = data.get('last_name', user.last_name)
    user.avatar = data.get('avatar', user.avatar)
    user.user_rol_id = data.get('user_rol_id', user.user_rol_id)
    db.session.commit()
    return "Detalles del usuario actualizado"
