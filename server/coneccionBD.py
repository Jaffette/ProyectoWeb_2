import psycopg2
import json
from psycopg2.extras import Json

def establecerConexion():
    conexion = psycopg2.connect("dbname=Web2 user=postgres password=12345")
    return conexion


def getActa(idActa):
    try:
        conexion = establecerConexion()
    except:
        return 'No se logro la conección con la base de datos'
    try:
        cur = conexion.cursor()
        cur.execute( 'SELECT * from obtenerActas('+str(idActa)+')' )
        listaActas = []
        # Recorremos los resultados y los mostramos
        for datos in cur.fetchall() :
            acta = {"id":datos[0],"info":datos[1]}
            listaActas.append(acta)
        # Cerramos la conexión
        response = {"data":listaActas}
        conexion.close()
        return response
    except:
        return 'No se ha podido realizar la consulta'



def getVotacion(id):
    try:
        conexion = establecerConexion()
    except:
        return 'No se logro la conección con la base de datos'
    try:
        cur = conexion.cursor()
        cur.execute( 'SELECT * from obtenerVotacion('+str(id)+')' )
        votacion = ''
        for datos in cur.fetchall() :
        votacion = datos
        # Cerramos la conexión
        response = {"data":votacion}
        conexion.close()
        return response
    except:
        return 'No se ha podido realizar la consulta'

def insertActa(acta):
    try:
        conexion = establecerConexion()
    except:
         return 'No se logro la conección con la base de datos'
    try:
        conexion.autocommit = True
        cur = conexion.cursor()
        insertionValue = json.dumps(acta)
        #sql = "SELECT guardarActa('"+insertionValue+"')"
        sql = "INSERT INTO actas (datos) VALUES ('"+insertionValue+"')"   
        print("Se intenta insertar --> ",sql)
        cur.execute(sql)
        conexion.close()
        return 'ok'
    except:
        return return 'No se ha podido realizar la insercion'
    