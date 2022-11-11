from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db_user, db_course, User, Course
from flask import render_template
from flask_sqlalchemy import SQLAlchemy
import json

import utilities
import pandas as pd
import json

app = Flask(__name__)

app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db_user.init_app(app)
db_course.init_app(app)
db = SQLAlchemy(app)

with app.app_context():
    db_user.create_all()


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db_user.session.add(new_user)
    db_user.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route("/authentication", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


@app.route('/courses', methods=["POST", "GET"])
def get_course():
    if request.method == 'POST':
        dep = request.json["dep"].upper()

        courses = Course.query.filter_by(Dep=dep).all()
        courses_list = []
        for course in courses:
            courses_list.append({'Dep': course.Dep, 'Name': course.Name, 'CRN': course.CRN, 'Type': course.Type,
                                 'Section': course.Section, 'Time': course.Time, 'Day': course.Day,
                                 'Location': course.Location,
                                 'Instructor': course.Instructor, 'Num': course.Number, 'Student': course.Students})

        with open('../my-app/src/components/table/course_temp.json', 'w') as outfile:
            outfile.write(json.dumps(courses_list))
    return jsonify(courses_list)


@app.route('/schedule', methods=['POST', 'GET'])
def get_course_schedule():
    if request.method == 'POST':
        dep = request.json["dep"].upper()

        courses = Course.query.filter_by(Dep=dep).all()
        courses_list = []
        for course in courses:
            courses_list.append({'Dep': course.Dep, 'Name': course.Name, 'CRN': course.CRN, 'Type': course.Type,
                                 'Section': course.Section, 'Time': course.Time, 'Day': course.Day,
                                 'Location': course.Location,
                                 'Instructor': course.Instructor, 'Num': course.Number, 'Student': course.Students})

        with open('../my-app/src/components/table/course_temp.json', 'w') as outfile:
            outfile.write(json.dumps(courses_list))
    return jsonify(courses_list)


@app.route('/add', methods=['POST', 'GET'])
def add_person():
    if request.method == 'POST':
        person_name = request.json['cid']
        person_email = request.json['cemail']
        course_num = request.json['data']
        course = Course.query.filter_by(Number=int(course_num)).first()
        print(course)
        print(course.Students)
        add_ = person_name + ': ' + person_email
        if ('None' in course.Students):
            course.Students = ''
        if add_ not in course.Students:
            course.Students = course.Students + ',' + person_name + ': ' + person_email
            db_course.session.commit()

            courses = Course.query.filter_by(Dep=course.Dep).all()
            courses_list = []
            for course in courses:
                courses_list.append({'Dep': course.Dep, 'Name': course.Name, 'CRN': course.CRN, 'Type': course.Type,
                                     'Section': course.Section, 'Time': course.Time, 'Day': course.Day,
                                     'Location': course.Location,
                                     'Instructor': course.Instructor, 'Num': course.Number, 'Student': course.Students})

            with open('../my-app/src/components/table/course_temp.json', 'w') as outfile:
                outfile.write(json.dumps(courses_list))
            return 'successful'
        else:
            return 'fail'


if __name__ == "__main__":
    app.run(debug=True)
