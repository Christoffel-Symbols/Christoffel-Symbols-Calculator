#!/bin/bash


# it is running in gunicorn
TIMEOUT=120

echo "Starting gunicorn..."

cd /backend
gunicorn -b 0.0.0.0:5000 connector:app \
        --log-level=debug \
        --log-file=/dev/stdout \
        --timeout $TIMEOUT \