from app import app

# gunicorn -b 0.0.0.0:50000 wsgi:app -D --reload --log-file phoreasem-api.log --log-level 'debug'

if __name__ == "__main__":
    app.run(debug=True)
