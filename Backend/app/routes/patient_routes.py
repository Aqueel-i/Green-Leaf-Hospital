from flask import Blueprint, request, jsonify
from app.models.patient import Patient
from app import db

patient_bp = Blueprint('patient_bp', __name__)

# Create a patient
@patient_bp.route('/', methods=['POST'])
def add_patient():
    data = request.get_json()
    new_patient = Patient(
        name=data['name'],
        age=data['age'],
        gender=data['gender'],
        contact=data.get('contact')
    )
    db.session.add(new_patient)
    db.session.commit()
    return jsonify({"message": "Patient added", "patient": new_patient.to_dict()}), 201

# Get all patients
@patient_bp.route('/', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([patient.to_dict() for patient in patients])

# Get patient by ID
@patient_bp.route('/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    return jsonify(patient.to_dict())

# Update patient
@patient_bp.route('/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    data = request.get_json()
    patient.name = data.get('name', patient.name)
    patient.age = data.get('age', patient.age)
    patient.gender = data.get('gender', patient.gender)
    patient.contact = data.get('contact', patient.contact)
    db.session.commit()
    return jsonify({"message": "Patient updated", "patient": patient.to_dict()})

# Delete patient
@patient_bp.route('/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    db.session.delete(patient)
    db.session.commit()
    return jsonify({"message": "Patient deleted"})
