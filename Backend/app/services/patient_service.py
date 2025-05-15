from app.models.patient import Patient
from app import db

# Create a new patient
def create_patient(data):
    new_patient = Patient(
        name=data.get('name'),
        age=data.get('age'),
        gender=data.get('gender'),
        contact_number=data.get('contact_number'),
        address=data.get('address')
    )
    db.session.add(new_patient)
    db.session.commit()
    return new_patient

# Get all patients
def get_all_patients():
    return Patient.query.all()

# Get a single patient by ID
def get_patient_by_id(patient_id):
    return Patient.query.get(patient_id)

# Update a patient
def update_patient(patient_id, data):
    patient = Patient.query.get(patient_id)
    if not patient:
        return None

    patient.name = data.get('name', patient.name)
    patient.age = data.get('age', patient.age)
    patient.gender = data.get('gender', patient.gender)
    patient.contact_number = data.get('contact_number', patient.contact_number)
    patient.address = data.get('address', patient.address)

    db.session.commit()
    return patient

# Delete a patient
def delete_patient(patient_id):
    patient = Patient.query.get(patient_id)
    if not patient:
        return False

    db.session.delete(patient)
    db.session.commit()
    return True
