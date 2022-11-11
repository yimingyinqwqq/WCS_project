# ONLY run this file if we need to update the database

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask import render_template
import utilities
import pandas as pd
import json
import numpy as np
from sqlalchemy import update

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///courses.sqlite3'
CORS(app, supports_credentials=True)
server_session = Session(app)
db = SQLAlchemy(app)


class Course(db.Model):
    Dep = db.Column(db.String(7))
    Name = db.Column(db.String(200))
    CRN = db.Column(db.Integer)
    Type = db.Column(db.String(200))
    Section = db.Column(db.String(7))
    Time = db.Column(db.String(20))
    Day = db.Column(db.String(30))
    Location = db.Column(db.String(30))
    Instructor = db.Column(db.String(30))
    Students = db.Column(db.String(10000))
    Number = db.Column(db.Integer, primary_key=True)

    def __init__(self, dep, name, crn, type, section, time, day, location, instructor, num, students):
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
        self.Students = students



# path_list = utilities.readAllFiles('course_info')
# db.create_all()
# count = 0
# for dep_path in path_list:
#     course = pd.read_csv(dep_path)
#     for i in course.index:
#         query = Course(course.loc[i][1], course.loc[i][2], int(course.loc[i][3]), course.loc[i][4],
#                        course.loc[i][5], course.loc[i][6], course.loc[i][7], course.loc[i][8], course.loc[i][9], count, 'None')
#         try:
#             db.session.add(query)
#             db.session.commit()
#             count += 1
#         except:
#             db.session.rollback()
#
# test = Course.query.filter_by(Dep = 'CS446').all()
# test[0].Students = 'None'
# test[1].Students = 'None'
# db.session.commit()

with open('course_test_374.json') as json_file:
    students_data = json.load(json_file)

course_student = dict()

for i in students_data:
    for course in students_data[i]:
        number = str(np.random.randint(1, 100))
        if course in course_student:
            course_student[course].append(i + ': ' + i + number + '@illinois.edu')
        else:
            course_student[course] = [i + ': ' + i + number + '@illinois.edu']

for course in course_student:
    temp = Course.query.filter_by(CRN = int(course)).first()
    ist = ','.join(course_student[course])
    temp.Students = ist
    db.session.commit()






@app.route('/courses',methods=["POST","GET"])
def get_course():
    if request.method == 'POST':
        dep = request.json["dep"].upper()

        courses = Course.query.filter_by(Dep=dep).all()
        courses_list = []
        for course in courses:
            courses_list.append({'Dep':course.Dep, 'Name':course.Name, 'CRN':course.CRN, 'Type' : course.Type,
                                'Section':course.Section, 'Time':course.Time, 'Day':course.Day, 'Location':course.Location,
                                 'Instructor':course.Instructor, 'Num':course.Number, 'Students':course.Students})

        with open('../my-app/src/components/table/course_temp.json', 'w') as outfile:
            outfile.write(json.dumps(courses_list))
    return jsonify(courses_list)


if __name__ == "__main__":
    app.run(debug=True)
