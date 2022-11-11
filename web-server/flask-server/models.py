from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db_user = SQLAlchemy()
db_course = SQLAlchemy()

def get_uuid():
    return uuid4().hex


class User(db_user.Model):
    __tablename__ = "users"
    id = db_user.Column(db_user.String(), primary_key=True, default=get_uuid())
    email = db_user.Column(db_user.String(400), unique=True)
    password = db_user.Column(db_user.Text, nullable=False)

class Course(db_course.Model):
    __bind_key__ = 'courses'
    Dep = db_course.Column(db_course.String(7))
    Name = db_course.Column(db_course.String(200))
    CRN = db_course.Column(db_course.Integer)
    Type = db_course.Column(db_course.String(200))
    Section = db_course.Column(db_course.String(7))
    Time = db_course.Column(db_course.String(20))
    Day = db_course.Column(db_course.String(30))
    Location = db_course.Column(db_course.String(30))
    Instructor = db_course.Column(db_course.String(30))
    Number = db_course.Column(db_course.Integer, primary_key=True)
    Students = db_course.Column(db_course.String(10000))

    def __init__(self, dep, name, crn, type, section, time, day, location, instructor, num):
        self.Dep = dep
        self.Name = name
        self.CRN = crn
        self.Type = type
        self.Section = section
        self.Time = time
        self.Day = day
        self.Location = location
        self.Instructor = instructor
        self.Number = num