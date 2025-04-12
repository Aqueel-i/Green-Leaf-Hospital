from flask import Blueprint, request, jsonify
from app.models.doctor import Doctor
from app import db

doctor_bp = Blueprint('doctor_bp', __name__)

# ✅ Create a doctor


@doctor_bp.route('/doctors', methods=['POST'])
def add_doctor():
    data = request.get_json()

    try:
        new_doctor = Doctor(
            name=data['name'],
            specialization=data['specialization'],
            contact=data.get('contact'),
            email=data.get('email')
        )
        db.session.add(new_doctor)
        db.session.commit()

        return jsonify({
            "message": "Doctor added successfully",
            "doctor": new_doctor.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# ✅ Get all doctors


@doctor_bp.route('/', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([doctor.to_dict() for doctor in doctors]), 200

# ✅ Get a doctor by ID


@doctor_bp.route('/<int:doctor_id>', methods=['GET'])
def get_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    return jsonify(doctor.to_dict()), 200

# ✅ Update a doctor


@doctor_bp.route('/<int:doctor_id>', methods=['PUT'])
def update_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    data = request.get_json()

    try:
        doctor.name = data.get('name', doctor.name)
        doctor.specialization = data.get(
            'specialization', doctor.specialization)
        doctor.contact = data.get('contact', doctor.contact)
        doctor.email = data.get('email', doctor.email)

        db.session.commit()

        return jsonify({
            "message": "Doctor updated successfully",
            "doctor": doctor.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# ✅ Delete a doctor


@doctor_bp.route('/<int:doctor_id>', methods=['DELETE'])
def delete_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)

    try:
        db.session.delete(doctor)
        db.session.commit()
        return jsonify({"message": "Doctor deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
