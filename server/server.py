#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# pythones.net

from coneccionBD import getActa,insertActa,getVotacion

from flask import Flask,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/obtenerActa/<int:IdActa>", methods=['GET'])
def obtenerActa(IdActa):
    return (getActa(IdActa))

@app.route("/obtenerVotacion/<int:IdVotacion>", methods=['GET'])
def obtenerVotacion(IdVotacion):
    return (getVotacion(IdVotacion))


@app.route("/insertarActa", methods=['POST'])
def insertarActa():
    content = request.get_json(silent=True)
    return (insertActa(content))



if __name__ == "__main__":
    app.run()
