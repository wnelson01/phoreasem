#!/bin/bash

gunicorn -b 0.0.0.0:5000 wsgi:app -D --reload --log-file phoreasem-api.log --log-level 'debug'
