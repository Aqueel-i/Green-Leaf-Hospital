from flask import Blueprint, request, jsonify
from app.services.appointment_services import (
    get_all_appointments,
    get_appointment_by_id,
    create_appointment,
    update_appointment,
    delete_appointment
)
from datetime import datetime

appointment_bp = Blueprint('appointment_bp', __name__)

@appointment_bp.route("/", methods=["GET"])
def list_appointments():
    appointments = get_all_appointments()
    result = []
    for a in appointments:
        result.append({
            "id": a.id,
            "patient_id": a.patient_id,
            "doctor_id": a.doctor_id,
            "appointment_date": a.appointment_date.isoformat(),
            "time_slot": a.time_slot,
            "created_at": a.created_at.isoformat()
        })
    return jsonify(result)

@appointment_bp.route("/<int:id>", methods=["GET"])
def get_appointment(id):
    appointment = get_appointment_by_id(id)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404
    return jsonify({
        "id": appointment.id,
        "patient_id": appointment.patient_id,
        "doctor_id": appointment.doctor_id,
        "appointment_date": appointment.appointment_date.isoformat(),
        "time_slot": appointment.time_slot,
        "created_at": appointment.created_at.isoformat()
    })

@appointment_bp.route("/", methods=["POST"])
def add_appointment():
    data = request.json
    try:
        appointment_date = datetime.fromisoformat(data['appointment_date']).date()
        appointment = create_appointment(
            patient_id=data['patient_id'],
            doctor_id=data['doctor_id'],
            appointment_date=appointment_date,
            time_slot=data['time_slot']
        )
        return jsonify({"message": "Appointment created", "id": appointment.id}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Failed to create appointment"}), 500

@appointment_bp.route("/<int:id>", methods=["PUT"])
def edit_appointment(id):
    data = request.json
    try:
        appointment_date = datetime.fromisoformat(data['appointment_date']).date()
        appointment = update_appointment(
            appointment_id=id,
            patient_id=data['patient_id'],
            doctor_id=data['doctor_id'],
            appointment_date=appointment_date,
            time_slot=data['time_slot']
        )
        return jsonify({"message": "Appointment updated", "id": appointment.id})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Failed to update appointment"}), 500

@appointment_bp.route("/<int:id>", methods=["DELETE"])
def remove_appointment(id):
    try:
        delete_appointment(id)
        return jsonify({"message": "Appointment deleted"})
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "Failed to delete appointment"}), 500
