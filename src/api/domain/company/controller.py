from api.models.index import db, Company
import api.domain.company.repository as Repository


#crear una función con la misma nombre que la rooute vaya a tener
#establecer condicionales tales como "si data no existe... importar hand"
#def get_all_companies(data):
    # if len(data) == 0:
    #     return Response.response_error('No hay nada en la base de datos', 400)
    # return Repository.get_all_companies(data),201


def new_company(data):
    if data['name'] is None or data['name'] == '':
        return ('Áñade un nombre correcto',400)
    return Repository.new_company(data),201

