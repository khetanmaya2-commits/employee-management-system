from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, Employee

app=FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Employees Management API"}

@app.get("/employees")
def fetchEmployees(db: Session=Depends(get_db)):
    return db.query(Employee).all()

@app.post("/employees")
def add_employee(employee:dict, db: Session=Depends(get_db)):
    new_employee = Employee(
        id=employee["id"],
        name=employee["name"],
        email=employee["email"],
        role=employee["role"],
        dept=employee["dept"],
        status =employee["status"],
        joiningDate = employee["joiningDate"],
    )

    db.add(new_employee)
    db.commit()
    return {"message": "Employee added", "employee":new_employee}

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int, db:Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if employee:
        db.delete(employee)
        db.commit()
        return {"message": "Employee deleted"}
    
        
    return {"message":"Employee not found"}    

@app.put("/employees/{employee_id}")
def update_employee(employee_id: int, updated_employee: dict, db: Session=Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if employee:
        employee.name = updated_employee["name"]
        employee.email = updated_employee["email"]
        employee.role = updated_employee["role"]
        employee.dept = updated_employee["dept"]
        employee.status= updated_employee["status"]

        db.commit()
        db.refresh(employee)

        return {"message": "Employee updated", "employee": employee}
    
    return {"message": "Employee not found"}   
