import requests
from bs4 import BeautifulSoup as soup
import pandas as pd
from multiprocessing import Pool
import sys
import re
import json
import os

year_term = "2022/spring"
school_url = "https://courses.illinois.edu/schedule/"+(year_term)

def job(diction, url, dep):
  response_coures_list = requests.get(url)
  page_courses_list = soup(response_coures_list.text, 'html.parser')
  courses_name_nums = dict()
  for st_a in page_courses_list.find_all('a'):
    nums_pre = str(st_a.get('href'))
    if ((year_term + '/' + dep) in nums_pre and 'pdf' not in nums_pre):
      num = str(st_a.get('href'))[-3:]
      name = st_a.string
      courses_name_nums[num] = name
       
  diction[dep] = courses_name_nums
  
  
def job_2(department, all_data):
  #print(department)
  department_dataframe = pd.DataFrame()
  for course_number in all_data[department]:
    course_url = school_url + '/' + department + '/' + course_number
    #print(course_url)
    response = requests.get(course_url)
    text = response.text
    page = soup(text, 'html.parser')
    pattern = re.compile(r"var sectionDataObj = (.*?);$", re.MULTILINE | re.DOTALL) #get target variable using regular expression
    script = page.find("script", text=pattern)
    info = pattern.search(script.prettify()).group(1)
    data = json.loads(info)     #data: list of dictionary, where each dictionary is a course
    #print(data[0]["crn"])
    crn = []
    type_ = []
    section = []
    time = []
    day = []
    location = []
    instructor = []
    for course in data:
      crn.append(course["crn"].strip())
      type_.append(course["type"].split("meeting\">")[1].split("</div>")[0].strip())
      section.append(course["section"].split("meeting\">")[1].split("</div>")[0].strip())
      time.append(course["time"].split("meeting\">")[1].split("</div>")[0].strip())
      day.append(course['day'].split("meeting\">")[1].split("</div>")[0].strip())
      location.append(course['location'].split("meeting\">")[1].split("</div>")[0].strip())
      instr_info = course['instructor'].split("meeting\">")[1].split("</div>")[0].strip()
      if instr_info:
        instr_info = instr_info[:-6].replace("<br />", " & ", 10)
      instructor.append(instr_info)
    course_data = pd.DataFrame({"Course":department+course_number, "Name":all_data[department][course_number].strip(), "CRN":crn, "Type":type_, "Section":section, "Time":time, "Day":day, "Location":location, "Instructor":instructor})
    department_dataframe = pd.concat([department_dataframe, course_data], ignore_index=True)
  department_dataframe.to_csv('flask-server/course_info/' + department + '.csv')

class Crawler():

  def __init__(self):
    self.department_name = []
    #manager = multiprocessing.Manager()
    #self.all_data = manager.dict()
    self.all_data = dict()


  def getDepartmentName(self):
    response = requests.get(school_url)
    page = soup(response.text, 'html.parser')

    for link in page.find_all('a'):
      candidates = str(link.get('href'))
      if (candidates.find('/schedule/2022/spring/') != -1):
        self.department_name.append(candidates[22:])
    

  def getCourseName(self):
    url_list=[]
    for dep in self.department_name:
      dep_url = school_url + '/' + dep
      url_list.append(dep_url)

    #p = Pool(16)
    #sys.setrecursionlimit(2500000)
    for i in range(len(url_list)):
      job(self.all_data, url_list[i], self.department_name[i])  
    #p.close()
    #p.join()

  def getAllInfo(self):
    if not (os.path.exists('flask-server/course_info')):
      os.mkdir('flask-server/course_info')

    p = Pool(16)
    sys.setrecursionlimit(2500000)
    for i in range(len(self.department_name)):
      p.apply_async(job_2, (self.department_name[i], self.all_data))  
    p.close()
    p.join()

if __name__ == '__main__':
  my_crawler = Crawler()
  my_crawler.getDepartmentName()
  my_crawler.getCourseName()
  my_crawler.getAllInfo()
  
  
