from app.models import Doctor
from app.models import db 

def get_all_doctors():
    return Doctor.query.all()

def add_new_doctor(name, specialty):
    new_doctor = Doctor(name=name, specialty=specialty)
    db.session.add(new_doctor)
    db.session.commit()
    return new_doctor
