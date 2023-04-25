from api.models.index import db, User, User_rol


def create_user(email, password, name, last_name, avatar, user_rol_id):
    new_user = User(email = email, password=password, name=name, last_name= last_name,
    avatar = avatar, user_rol_id = user_rol_id)
    db.session.add(new_user)
    db.session.commit()
    return new_user
