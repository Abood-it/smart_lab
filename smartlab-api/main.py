from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
import auth
from jose import JWTError, jwt
import models
from database import get_db, engine
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="SmartLab API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- Pydantic Models ---

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class PatientCreate(BaseModel):
    first_name: str
    last_name: str
    dob: str
    gender: str
    email: str
    phone: str
    address: str
    blood_group: str
    allergies: str

class PatientResponse(BaseModel):
    id: int
    patient_id: str
    first_name: str
    last_name: str
    dob: str
    gender: str
    phone: str
    address: str
    status: str
    last_visit: str

    class Config:
        orm_mode = True

# --- Setup Dummy Data for Demo ---
def create_dummy_data(db: Session):
    if not db.query(models.User).first():
        db.add(models.User(email="admin@smartlab.com", hashed_password=auth.get_password_hash("123456"), name="Admin", role="admin"))
        db.commit()
    
    if not db.query(models.Patient).first():
        db.add(models.Patient(patient_id="PT-2025-001", first_name="Ahmad", last_name="Khan", dob="1980-01-01", gender="Male", email="ahmad@example.com", phone="+971 50 123 4567", address="Dubai, UAE", blood_group="O+", allergies="None", status="Active", last_visit="2025-10-24"))
        db.add(models.Patient(patient_id="PT-2025-002", first_name="Sarah", last_name="Jenkins", dob="1992-05-12", gender="Female", email="sarah@example.com", phone="+971 55 987 6543", address="Abu Dhabi, UAE", blood_group="A+", allergies="Penicillin", status="Pending Results", last_visit="2025-10-22"))
        db.commit()
        
    if not db.query(models.Transaction).first():
        db.add(models.Transaction(trx_id="TRX-101", patient_name="Ahmad Khan", date="2025-10-24", amount="$120.00", status="Completed"))
        db.add(models.Transaction(trx_id="TRX-102", patient_name="Sarah Jenkins", date="2025-10-23", amount="$340.50", status="Pending"))
        db.commit()

@app.on_event("startup")
def startup_event():
    db = next(get_db())
    create_dummy_data(db)

# --- Routes ---

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@app.get("/api/dashboard")
def get_dashboard_stats(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Mocking real stats logic based on DB
    patients_count = db.query(models.Patient).count()
    transactions = db.query(models.Transaction).order_by(models.Transaction.id.desc()).limit(5).all()
    
    return {
        "kpi": {
            "revenue": "$124,500",
            "tests": "8,420",
            "active_patients": patients_count
        },
        "revenueData": [
            { "name": 'Jan', "value": 4000 },
            { "name": 'Feb', "value": 3000 },
            { "name": 'Mar', "value": 5000 },
            { "name": 'Apr', "value": 2780 },
            { "name": 'May', "value": 6890 },
            { "name": 'Jun', "value": 8390 },
        ],
        "trafficData": [
            { "name": 'Direct', "value": 400 },
            { "name": 'Referral', "value": 300 },
            { "name": 'Social', "value": 300 },
        ],
        "transactions": transactions
    }

@app.get("/api/patients", response_model=List[PatientResponse])
def get_patients(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Patient).all()

@app.post("/api/patients", response_model=PatientResponse)
def create_patient(patient: PatientCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    count = db.query(models.Patient).count()
    new_patient_id = f"PT-2025-{count+1:03d}"
    db_patient = models.Patient(
        patient_id=new_patient_id,
        first_name=patient.first_name,
        last_name=patient.last_name,
        dob=patient.dob,
        gender=patient.gender,
        email=patient.email,
        phone=patient.phone,
        address=patient.address,
        blood_group=patient.blood_group,
        allergies=patient.allergies,
        status="Active",
        last_visit=datetime.utcnow().strftime("%Y-%m-%d")
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

