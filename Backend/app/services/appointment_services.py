from app import db
from app.models.appointment import Appointment
from datetime import datetime

def get_all_appointments():
    return Appointment.query.all()

def get_appointment_by_id(appointment_id):
    return Appointment.query.get(appointment_id)

def create_appointment(patient_id, doctor_id, appointment_date, time_slot):
    # Check for double booking:
    existing = Appointment.query.filter_by(
        doctor_id=doctor_id,
        appointment_date=appointment_date,
        time_slot=time_slot
    ).first()
    if existing:
        raise ValueError("This time slot is already booked for this doctor.")

    new_appointment = Appointment(
        patient_id=patient_id,
        doctor_id=doctor_id,
        appointment_date=appointment_date,
        time_slot=time_slot
    )
    db.session.add(new_appointment)
    db.session.commit()
    return new_appointment

def update_appointment(appointment_id, patient_id, doctor_id, appointment_date, time_slot):
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        raise ValueError("Appointment not found.")

    # Check for double booking except current appointment
    existing = Appointment.query.filter(
        Appointment.doctor_id == doctor_id,
        Appointment.appointment_date == appointment_date,
        Appointment.time_slot == time_slot,
        Appointment.id != appointment_id
    ).first()
    if existing:
        raise ValueError("This time slot is already booked for this doctor.")

    appointment.patient_id = patient_id
    appointment.doctor_id = doctor_id
    appointment.appointment_date = appointment_date
    appointment.time_slot = time_slot
    db.session.commit()
    return appointment

def delete_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        raise ValueError("Appointment not found.")
    db.session.delete(appointment)
    db.session.commit()
