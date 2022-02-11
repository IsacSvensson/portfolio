from flask import Flask
from flask_cors import CORS

def create_app():
    """
    Creates the app, sets up for CORS and includes routes.
    """
    app = Flask(__name__, static_url_path='', static_folder='../client/build')
    CORS(app) #comment this on deployment

    with app.app_context():
        from . import routes  # Import routes

    return app
