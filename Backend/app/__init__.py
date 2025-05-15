from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    # Allow only the frontend origin (React dev server)
    CORS(app, origins=["http://localhost:5173"])

    # App configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hospital.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # ✅ Register blueprints
    from app.routes.doctor_routes import doctor_bp
    app.register_blueprint(doctor_bp, url_prefix="/doctors")

    from app.routes.patient_routes import patient_bp
    app.register_blueprint(patient_bp, url_prefix="/patients")

    from app.routes.channeling_routes import channeling_bp
    app.register_blueprint(channeling_bp, url_prefix="/channelings")

    from app.routes.appointment_routes import appointment_bp
    app.register_blueprint(appointment_bp, url_prefix="/appointments")

    return app
