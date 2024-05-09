"""
conector.py

Consumes RESTful API from the frontend GUI.

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

import re

from flask import abort, request, send_from_directory

from utils import app, cors, bad_route, logger
from christoffel_symbols_route import put_christoffel_symbols_json

if __name__ != "__main__":
    logger.debug("Asumming app is configured for gunicorn in Docker container.")

    @app.route("/")
    def index():
        """
        Serve the index.html file when client requests the static url (e.g., <http://localhost:5000/>).
        """
        logger.info(f"Serving index.html because client requested {app.static_url_path}/")
        return app.send_static_file("index.html")

@app.route("/", defaults={"path": ""})
@app.route("/<string:path>", methods=["GET", "PUT"])
@app.route("/<path:path>", methods= ["GET", "PUT"])
def redirect(path):
    """
    Redirects request to the appropriate function based on the path.
    """

    if re.search(r"\bchristoffelsymbols\b", path) is not None:
        logger.info("Redirecting request to /christoffelsymbols")
        if request.method != "PUT":
            abort(405)

        return put_christoffel_symbols_json()
    
    elif re.search(r"\bmanifest.json\b", path) is not None:
        logger.info("Serving manifest.json")
        if request.method != "GET":
            abort(405)

        return app.send_static_file("manifest.json")
    
    elif re.search(r"\bfavicon.ico\b", path) is not None:
        logger.info("Serving favicon.ico")
        if request.method != "GET":
            abort(405)

        return app.send_static_file("favicon.ico")
    
    elif re.search(r"\brobots.txt\b", path) is not None:
        logger.info("Serving robots.txt")
        if request.method != "GET":
            abort(405)
        
        return app.send_static_file("robots.txt")
    
    else:
        filename = re.search(r"[^/?]*\.(?:gif|png|jpeg|jpg|ico|js|css)$", path)
        if app.static_folder is not None and filename is not None:
            if request.method != "GET":
                abort(405)
            logger.debug(f"Serving some image/js/css at /{path}")
            return send_from_directory(app.static_folder, filename.group())
        else:
            logger.error(f"Bad route: route=/{path}")
            return bad_route(path)
        


if __name__== "__main__":
    cors.init_app(app)
    app.run(port=5000, debug=True)