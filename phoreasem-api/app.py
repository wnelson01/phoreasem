from flask import Flask, request, jsonify, make_response, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import mariadb
import sys
import os
import logging

load_dotenv()                                               # take environment variables from .env.

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

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
    cur.execute('INSERT INTO membership (team, person) VALUES ((SELECT t.id FROM team t WHERE t.name = ?), (SELECT p.id FROM person p WHERE p.name = ?))', (team, person,))
    conn.commit()
    rv = {
            'id': cur.lastrowid,
            'team': team,
            'person': person
    }
    cur.close()
    return rv

# get membership
@app.route('/membership', methods=['GET'])
def get_membership():
    args = request.args
    id = args.get('id')
    team = args.get('team')
    person = args.get('person')
    cur = conn.cursor(dictionary = True)
    try:
        if id:
            cur.execute('SELECT m.id as membership_id, t.name as team_name, p.name as person_name FROM membership m JOIN team t on m.team = t.id JOIN person p on m.person = p.id WHERE m.id = ?', (id,))
        elif team:
            cur.execute('SELECT p.name as person FROM membership m JOIN person p ON m.person = p.id JOIN team t ON t.id = m.team WHERE t.name = ?', (team,))
        elif person:
            cur.execute('SELECT t.name as team FROM membership m JOIN team t ON m.team = t.id JOIN person p ON p.id = m.person WHERE p.name = ?', (person,))
        else:
            cur.execute('SELECT m.id as membership_id, t.name as team_name, p.name as person_name FROM membership m JOIN team t on m.team = t.id JOIN person p on m.person = p.id')
    except mariadb.Error as e:
        app.logger.error(e)
    rv = cur.fetchall()
    cur.close()
    return jsonify(rv)

# delete membership
@app.route('/membership/<id>', methods=['DELETE'])
def delete_membership(id):
    cur = conn.cursor(dictionary = True)
    cur.execute('DELETE FROM membership WHERE id = ?', (id,))
    conn.commit()
    cur.close()
    return make_response('', 204)

@app.route('/post', methods=['POST'])
def create_post():
    content = request.get_json()
    person = content['person']
    team = content['team']
    post_content = content['content']
    response_to = content.get('post', None)
    cur = conn.cursor(dictionary = True)
    cur.execute('INSERT INTO post (person, team, content, post) VALUES (?, ?, ?, ?)', (person, team, post_content, response_to))
    conn.commit()
    rv = {
            'id': cur.lastrowid,
            'person': person,
            'team': team,
            'content': post_content,
            'post': response_to
    }
    cur.close()
    return rv

@app.route('/post', methods=['GET'])
def get_post():
    args = request.args
    team = args.get('team')
    person = args.get('person')
    cur = conn.cursor(dictionary = True)
    if team:
        cur.execute('SELECT po.id as post_id, po.content as post_content, pe.name as person_name FROM post po \
                JOIN person pe ON po.person = pe.id WHERE po.team = ? OR po.team = (SELECT t.id FROM team t WHERE t.name = ?)', (team, team))
    elif person:
        cur.execute('SELECT po.id as post_id, po.content as post_content, t.name as team_name FROM post po \
                JOIN team t ON po.team = t.id \
                WHERE po.person = ? \
                OR po.person = \
                (SELECT p.id FROM person p WHERE p.name = ?)', (person, person))
    else:
        cur.execute('SELECT * FROM post')
    rv = cur.fetchall()
    cur.close()
    return jsonify(rv)

@app.route('/push', methods=['POST'])
def push_test():
    app.logger.debug(request.get_json())
    return(request.get_json())

if __name__ == "__main__":
    app.run(host='0.0.0.0')
