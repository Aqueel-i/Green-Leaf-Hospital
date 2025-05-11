from app.models import Channeling
from app.models import db 

def create_channeling(patient_name, doctor_id, date, time):
    new_channeling = Channeling(
        patient_name=patient_name,
        doctor_id=doctor_id,
        date=date,
        time=time
    )
    db.session.add(new_channeling)
    db.session.commit()
    return new_channeling
