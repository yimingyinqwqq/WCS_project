from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
import pandas as pd
from yourapp import User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///classmatesfinder.sqlite3'
db = SQLAlchemy(app)

#annother dabase that stored the user netid, and enmail, the course they choose etc.
#the database will look like
#dep(one column) coursenumber(one column) netid(one column) enmail(one column)
class Classmates(db.Model):
    Course = db.Column(db.string(30))
    NetID = db.Column(db.string(30))
    Name = db.Column(db.String(200))
    Enmail = db.Column(db.String(200))


    def __init__(self, course, netid, name, enmail):
        self.Course = course
        self.NetID = netid
        self.Name = name
        self.Enmail = enmail

    db.create_all()

    #this is only a virtual user, need to improve for future
    me = User('CS125','junjieg2', 'Junjie Gao', 'junjieg2@illinois.edu')

    #me is now in the database if the method is Post, add user to the database
@app.route('/courses',methods=["POST","GET"])
def find_classmates(requestcourse):
    if request.method == 'POST':
        try:
            db.session.add(me)
            db.session.commit()
        #after we add the person into the database, we re-order the database by the course
            Classmates.query.order_by(Classmates.Course).all()
        except:
            db.session.rollback()
    #if the method is GET, return the user that shares the same course
    else :
        information = []
        #will return a list of query objects that share the same course
        classmates = Classmates.query.filter_by(Course = requestcourse).all()
        #for each query objeect, use it to find the netid and the enmail
        for i in range(len(classmates)):
            information.append((classmates[i].NetID, classmates[i].Enmail))
        return information


if __name__ == "__main__":
    app.run(debug=True)
