from flask import Blueprint, request, jsonify
from app.models.channeling import Channeling
from app.models.doctor import Doctor
from app.models.patient import Patient
from app import db

channeling_bp = Blueprint('channeling_bp', __name__)

# Create channeling
@channeling_bp.route('/', methods=['POST'])
def create_channeling():
    data = request.get_json()
    doctor = Doctor.query.get(data['doctor_id'])
    patient = Patient.query.get(data['patient_id'])

    if not doctor or not patient:
        return jsonify({"message": "Invalid doctor or patient ID"}), 400

    new_channeling = Channeling(
        doctor_id=data['doctor_id'],
        patient_id=data['patient_id'],
        date=data['date'],
        time=data['time']
    )
    db.session.add(new_channeling)
    db.session.commit()
    return jsonify({"message": "Channeling created", "channeling": new_channeling.to_dict()}), 201

# Get all channelings
@channeling_bp.route('/', methods=['GET'])
def get_all_channelings():
    channelings = Channeling.query.all()
    return jsonify([c.to_dict() for c in channelings])

# Get single channeling
@channeling_bp.route('/<int:id>', methods=['GET'])
def get_channeling(id):
    c = Channeling.query.get_or_404(id)
    return jsonify(c.to_dict())

# Update channeling
@channeling_bp.route('/<int:id>', methods=['PUT'])
def update_channeling(id):
    c = Channeling.query.get_or_404(id)
    data = request.get_json()

    c.doctor_id = data.get('doctor_id', c.doctor_id)
    c.patient_id = data.get('patient_id', c.patient_id)
    c.date = data.get('date', c.date)
    c.time = data.get('time', c.time)

    db.session.commit()
    return jsonify({"message": "Channeling updated", "channeling": c.to_dict()})

# Delete channeling
@channeling_bp.route('/<int:id>', methods=['DELETE'])
def delete_channeling(id):
    c = Channeling.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return jsonify({"message": "Channeling deleted"})
