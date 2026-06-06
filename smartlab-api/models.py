from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    role = Column(String(50), default="staff") # e.g. admin, staff
    name = Column(String(255))

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String(50), unique=True, index=True) # e.g., PT-2025-001
    first_name = Column(String(100))
    last_name = Column(String(100))
    dob = Column(String(50))
    gender = Column(String(20))
    email = Column(String(255))
    phone = Column(String(50))
    address = Column(Text)
    blood_group = Column(String(10))
    allergies = Column(Text)
    status = Column(String(50), default="Active")
    last_visit = Column(String(50))
    
    test_results = relationship("TestResult", back_populates="patient")

class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    test_id = Column(String(50), unique=True, index=True) # e.g., TST-8829
    patient_id = Column(Integer, ForeignKey("patients.id"))
    test_name = Column(String(255)) # e.g. Complete Blood Count
    collection_date = Column(String(50))
    status = Column(String(50), default="Pending Verification")
    notes = Column(Text)
    
    patient = relationship("Patient", back_populates="test_results")
    parameters = relationship("TestParameter", back_populates="test_result")

class TestParameter(Base):
    __tablename__ = "test_parameters"
    
    id = Column(Integer, primary_key=True, index=True)
    result_id = Column(Integer, ForeignKey("test_results.id"))
    name = Column(String(100)) # e.g. Hemoglobin
    unit = Column(String(50))
    ref_range = Column(String(50))
    value = Column(String(50))
    status = Column(String(50)) # Normal, High, Low
    
    test_result = relationship("TestResult", back_populates="parameters")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    trx_id = Column(String(50), unique=True, index=True)
    patient_name = Column(String(255))
    date = Column(String(50))
    amount = Column(String(50))
    status = Column(String(50)) # Completed, Pending
