# from flask import Flask, request, make_response, render_template, jsonify
import flask
from flask import request, jsonify, make_response, render_template
from dotenv import load_dotenv
import mariadb
import sys
import os
import logging

load_dotenv()                                               # take environment variables from .env.

app = flask.Flask(__name__)
app.config["DEBUG"] = True

gunicorn_logger = logging.getLogger('gunicorn.error')
app.logger.handlers = gunicorn_logger.handlers
app.logger.setLevel(gunicorn_logger.level)
app.logger.debug('debug test global')

try:
        conn = mariadb.connect(
                user = os.environ.get("user"),
                password = os.environ.get("password"),
                host = os.environ.get("host"),
                port = int(os.environ.get("port")),
                database = os.environ.get("database")
        )
except mariadb.Error as e:
    app.logger.error(e)

cur = conn.cursor()

@app.route('/', methods=['GET'])
def index():
    return "<h1 style='color:blue'>Hello There!</h1>"

# create person
@app.route('/person', methods=['POST'])
def create_person():
    content = request.get_json()
    app.logger.debug(content)
    name = content['name']
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO person (name) VALUES (?)", (name,))
    except mariadb.Error as e:
        app.logger.error(e)
    conn.commit()
    rv = {
            'id': cur.lastrowid,
            'name': name
    }
    cur.close()
    return(rv)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
