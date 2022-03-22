# from flask import Flask, request, make_response, render_template, jsonify
# import flask
from flask import Flask, request, jsonify, make_response, render_template
from dotenv import load_dotenv
import mariadb
import sys
import os
import logging

load_dotenv()                                               # take environment variables from .env.

app = Flask(__name__)
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
    return "<h1 style='color:blue'>Phoreasem API</h1>"

# create person
@app.route('/person', methods=['POST'])
def create_person():
    content = request.get_json()
    name = content['name']
    cur = conn.cursor(dictionary=True)
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

# get people
@app.route('/person', methods=['GET'])
def get_person():
    args = request.args
    id = args.get('id')
    name = args.get('name')
    cur = conn.cursor(dictionary = True)
    try:
        if id:
            cur.execute('SELECT * FROM person WHERE id = ?', (id,))
        elif name:
            ap.logger.debug(args)
            cur.execute('SELECT * FROM person WHERE name = ?', (name,))
        else:
            cur.execute('SELECT * FROM person')
    except mariadb.Error as e:
        app.logger.error(e)
    rv = cur.fetchall()
    cur.close()
    return jsonify(rv)

# update person
@app.route('/person/<id>', methods=['PATCH'])
def update_person(id):
    content = request.get_json()
    name = content['name']
    cur = conn.cursor(dictionary = True)
    cur.execute('UPDATE person SET name = ? WHERE id = ?', (name, id,))
    conn.commit()
    rv = {
            'name': name
    }
    cur.close()
    return rv

# delete person
@app.route('/person/<id>', methods=['DELETE'])
def delete_person(id):
    cur = conn.cursor(dictionary = True)
    cur.execute('DELETE FROM membership WHERE person = ?', (id,))
    conn.commit()
    cur.execute('UPDATE post SET person = NULL WHERE person = ?', (id,))
    conn.commit()
    cur.execute('DELETE FROM person WHERE id = ?', (id,))
    conn.commit()
    cur.close()
    return make_response('', 204)

# create team
@app.route('/team', methods=['POST']) 
def create_team():
    content = request.get_json()
    name = content['name']
    cur = conn.cursor(dictionary = True)
    try:
        cur.execute('INSERT INTO team (name) VALUES (?)', (name,))
    except mariadb.Error as e:
        app.logger.error(e)
    conn.commit()
    rv = {
            'id': cur.lastrowid,
            'name': name
    }
    cur.close()
    return(rv)

# get team
@app.route('/team', methods=['GET'])
def get_team():
    args = request.args
    id = args.get('id')
    name = args.get('name')
    cur = conn.cursor(dictionary = True)
    try:
        if id:
            cur.execute('SELECT * FROM team WHERE id = ?', (id,))
        elif name:
            cur.execute('SELECT * FROM team WHERE name = ?', (name,))
        else:
            cur.execute('SELECT * FROM team')
    except mariadb.Error as e:
        app.logger.error(e)
    rv = cur.fetchall()
    cur.close()
    return jsonify(rv)

# update team
@app.route('/team/<id>', methods=['PATCH'])
def update_team(id):
    content = request.get_json()
    name = content['name']
    cur = conn.cursor(dictionary = True)
    cur.execute('UPDATE team SET name = ? WHERE id = ?', (name, id,))
    conn.commit()
    rv = {
            'name': name
    }
    cur.close()
    return rv

# delete team
@app.route('/team/<id>', methods=['DELETE'])
def delete_team(id):
    cur = conn.cursor(dictionary = True)
    cur.execute('DELETE FROM membership WHERE team = ?', (id,))
    conn.commit()
    cur.execute('DELETE FROM post WHERE team = ?', (id,))
    conn.commit()
    cur.execute('DELETE FROM team WHERE id = ?', (id,))
    conn.commit()
    cur.close()
    return make_response('', 204)

# create membership
@app.route('/membership', methods=['POST'])
def create_membership():
    content = request.get_json()
    team = content['team']
    person = content['person']
    cur = conn.cursor(dictionary = True)
    cur.execute('INSERT INTO membership (team, person) VALUES (?, ?)', (team, person,))
    conn.commit()
    rv = {
            'id': cur.lastrowid,
            'team': team,
            'person': person
    }
    cur.close()
    return rv

if __name__ == "__main__":
    app.run(host='0.0.0.0')
