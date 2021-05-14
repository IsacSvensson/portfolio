from flask import Flask
from flask_cors import CORS

def create_app():
    """
    Creates the app, sets up for CORS and includes routes.
    """
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    with app.app_context():
        from . import routes  # Import routes

    return app
