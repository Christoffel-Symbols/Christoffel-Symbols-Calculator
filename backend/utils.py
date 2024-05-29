"""
utils.py

GNU General Public License v3 (GNU GPLv3)

(c) 2024. All rights reserved                  

Dhananjhay Bansal disclaims any warranties, expressed, implied, or statutory, of any kind with rrespect to the software, 
including without limitation any warranty of merchantability or fitness for a particular purpose. Dhananjhay Bansal shall 
not be liable in any event for any damages, whether direct or indirect, special or general, consequential or incidental, 
arising from the use of the software. The name of the Dhananjhay Bansal may be used to endorse or promote products derived 
from this software without specific prior written permission.                  
                                    

This file is part of the Christoffel-Symbols project.              

Christoffel-Symbols is free software:  you can redistribute it and/or modify it under the terms of the GNU General Public 
License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.                   

Christoffel-Symbols is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.                        

You should have received a copy of the GNU General Public License along with Christoffel-Symbols project. 
If not, see<http://www.gnu.org/licenses/>.
"""


import logging
from traceback import format_exception


from flask import Flask, Response, jsonify
from flask_cors import CORS

local_devel = True

if local_devel:
    # --- Python ---
    app = Flask(__name__)
    cors = CORS(app=app)
    #
    # Configure logger
    #
    app.logger.handlers.clear()  # prevent double-logging with Flask logger
    log_handler = logging.StreamHandler()  # log to stdout/stderr
    # log_handler = logging.FileHandler("etc_frontend.log")  # log to file
    # Add logger to Flask app (only logs application errors, not HTTP errors)
    log_formatter = logging.Formatter(
        "%(asctime)s [%(name)-12s] %(levelname)-8s %(message)s"
    )
    log_handler.setFormatter(log_formatter)
    log_handler.setLevel(logging.DEBUG) # this should allow all error messages to be displayed
    app.logger.addHandler(log_handler)
    # Use this logger for manual addition of log messages
    logger = logging.getLogger("werkzeug")
    logger.setLevel(logging.DEBUG)
    # logger.setFormatter(log_formatter)  # this line doesn't work for some reason...
else:
    # --- Gunicorn ---
    app = Flask(
        __name__,
        # static_folder="../frontend/build", # For local testing
        static_folder="/backend/client", #For building inside docker
        # static_folder="/backend/client", #Different path for server
        static_url_path="/",  # https://github.com/opencadc/skaha/pull/323
    )
    cors = CORS()
    # Add logger to Flask app (only logs application errors, not HTTP errors)
    logger = logging.getLogger("gunicorn.error")
    app.logger.handlers = logger.handlers
    app.logger.setLevel(logger.level)
    logger.debug("Static URL path is set to: /" + str(app.static_url_path))

def bad_request(message):
    """
    Return a 400 error with the given message a JSON.
    """
    response = jsonify({"error": message})
    response.status_code = 400
    return response

def server_error(message):
    """
    Return a 500 error with the given message as JSON.
    """
    response = jsonify({"error": message})
    response.status_code = 500
    return response

def bad_route(path):
    """
    Return a 404 error with the given path contained in the HTML.
    """
    response = f"""
    <!DOCTYPE HTML PUBLIC "-//W3C/DTD HTML 3.2 Final//EN">
    <title>404 Not Found</title>
    <h1>Not Found</h1>
    <p>The requested URL (path=/{path}) was not found on the server.
    If you entered the URL manually please check your spelling and try again.</p>
    """
    return Response(response, status=404, mimetype="text/html")

def log_tracebook(e):
    lines = format_exception(type(e), e, e.__traceback__)
    traceback = "".join(lines)
    logger.error(traceback)