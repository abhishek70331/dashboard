from flask import Flask,jsonify,request
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from flask_cors import CORS
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import csv
import time
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class User(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(150), nullable= False)
    email = db.Column(db.String(150), unique= True,nullable= False)
    age = db.Column(db.Integer, nullable = False)
    gender = db.Column(db.String(100),nullable=False)
    password = db.Column(db.String(150),nullable= False)

with open ("archive\worldcup_2024.csv", 'r') as cricket:
    reader = pd.read_csv(cricket)

def match_score():

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    
    # Open Cricbuzz live scores page
    driver.get("https://www.cricbuzz.com/cricket-match/live-scores")
    time.sleep(3)  # Allow the page to load

    # Click to expand match details
    button = driver.find_element(By.CSS_SELECTOR, 'div.cb-ico.cb-lv-scr-chvrn-bg')
    button.click()
    time.sleep(2)
    
    # Click on the Scorecard link
    scorecard_link = driver.find_element(By.LINK_TEXT, "Scorecard")
    scorecard_link.click()
    time.sleep(3)  # Allow the scorecard to load

    match_details = {}

    match_data = driver.find_elements(By.CSS_SELECTOR, ".cb-col.cb-col-100.cb-ltst-wgt-hdr")
    
    for match in match_data:
        inning1 = match.find_elements(By.CSS_SELECTOR,".cb-col.cb-col-100.cb-scrd-hdr-rw")
        for inn in inning1:
            
            innings = inn.text.split("\n")
            if len(innings)>1:
                team_name = innings[0]
                score = innings[1]
                match_details[team_name]=score  
    print(match_details)        




def match_data():

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    
    # Open Cricbuzz live scores page
    driver.get("https://www.cricbuzz.com/cricket-match/live-scores")
    time.sleep(3)  # Allow the page to load

    # Click to expand match details
    button = driver.find_element(By.CSS_SELECTOR, 'div.cb-ico.cb-lv-scr-chvrn-bg')
    button.click()
    time.sleep(2)
    
    # Click on the Scorecard link
    scorecard_link = driver.find_element(By.LINK_TEXT, "Scorecard")
    scorecard_link.click()
    time.sleep(3)  # Allow the scorecard to load

    match_details = {}

    match_data = driver.find_elements(By.CSS_SELECTOR, ".cb-col.cb-col-100.cb-ltst-wgt-hdr")
    
    for match in match_data:
        inning1 = match.find_elements(By.CSS_SELECTOR,".cb-col.cb-col-100.cb-scrd-hdr-rw")
        for inn in inning1:
            
            innings = inn.text.split("\n")
            if len(innings)>1:
                team_name = innings[0]
                score = innings[1]
                match_details[team_name]=score  
    print(match_details)        


    match_div = driver.find_elements(By.CSS_SELECTOR, ".cb-col.cb-col-100.ng-scope")

    left_side = []
    right_side=[]
    for match in match_div:
        left_div = match.find_elements(By.CSS_SELECTOR,".cb-col.cb-col-100.cb-mtch-info-itm")
        # print(left_div.text)
        for left in left_div:
            ltable = left.find_element(By.CSS_SELECTOR,".cb-col.cb-col-27").text
            print(ltable)
            left_side.append(ltable)
            rtable = left.find_element(By.CSS_SELECTOR,".cb-col.cb-col-73").text
            print(rtable)
            right_side.append(rtable)

    result = dict(zip(left_side,right_side))
    match_details.update(result)
    return match_details


def scrap():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("https://www.cricbuzz.com/cricket-match/live-scores")
    time.sleep(5)

    match_element = driver.find_elements(By.CSS_SELECTOR, '.cb-lv-scrs-well, .cb-schdl')
    score_data = []

    for i, match in enumerate(match_element[:2]):
        match_html = match.get_attribute('innerHTML')


        team = match.find_elements(By.CSS_SELECTOR,".cb-hmscg-tm-nm")
        score = match.find_elements(By.CSS_SELECTOR,".cb-hmscg-bat-txt .cb-ovr-flo, .cb-hmscg-bwl-txt .cb-ovr-flo")

        print(len(team),len(score))

        if len(team) == 2 and len(score) >= 2:
            team1 = team[0].text
            team2 = team[1].text
            score1= score[0].text
            score2 = score[1].text
            print(team1,team2,score1,score2)

            score_data.append({
                'team1':team1,
                'score1':score1,
                'team2':team2,
                'score2':score2
                })
            
    driver.quit()        
    return score_data


@app.route("/live",methods=['GET','POST'])
def live():
    data = scrap()
    return jsonify(data)

@app.route("/toss",methods=['GET','POST'])
def toss():
    with open ("archive\worldcup_2024.csv", 'r') as cricket:
        reader = pd.read_csv(cricket)

    data = reader['Toss Decision'].value_counts().to_dict()
    print(data)
    return jsonify(data)

@app.route("/player",methods=['GET','POST'])
def player():
    with open ("archive\worldcup_2024.csv", 'r') as cricket:
        reader = pd.read_csv(cricket)

    data = reader[reader['Player Of The Match']!='Rain']['Player Of The Match'].value_counts().head(6).to_dict()    
    return jsonify(data)

@app.route("/scorer", methods=['GET','POST'])
def scorer():
    with open('archive/worldcup_2024.csv', 'r') as cricket:
        df = pd.read_csv(cricket)

    df = df[df['Top Scorer'] != 'Rain']

    df['Highest Score'] = pd.to_numeric(df['Highest Score'], errors='coerce')

    top_scorers = df.groupby('Top Scorer')['Highest Score'].sum()

    top_scorers = top_scorers.sort_values(ascending=False).head(5).to_dict()
    return jsonify(top_scorers)

@app.route("/bowler",methods=['GET','POST'])
def bowler():
    with open('archive/worldcup_2024.csv', 'r') as cricket:
        df = pd.read_csv(cricket)

    df = df[df['Best Bowler'] != 'Rain']

    # Calculate total wickets for each bowler
    df['Best Bowler Figure(Wickets Taken)'] = pd.to_numeric(df['Best Bowler Figure(Wickets Taken)'], errors='coerce')
    top_bowlers = df.groupby('Best Bowler')['Best Bowler Figure(Wickets Taken)'].sum()

    # Get the top 5 bowlers
    top_5_bowlers = top_bowlers.sort_values(ascending=False).head(5)

    # Convert the result to a dictionary
    data = top_5_bowlers.to_dict()
    return jsonify(data)    

@app.route("/total",methods=['GET','POST'])
def total():
    with open('archive/worldcup_2024.csv', 'r') as cricket:
        reader = pd.read_csv(cricket)

    first_score = reader[reader['First Innings Score']!= 'Rain']['First Innings Score'].astype(int)
    second_score= reader[reader['Second Innings Score']!= 'Rain']['Second Innings Score'].astype(int)
    total_run = [int(first_score.sum() + second_score.sum())]

    #total no of wickets taken
    first_wicket = reader[reader['Fall of wickets First Innings']!='Rain']['Fall of wickets First Innings'].astype(int)
    second_wicket = reader[reader['Fall of wickets Second Innings']!='Rain']['Fall of wickets Second Innings'].astype(int)
    total_wicket = [int(first_wicket.sum() + second_wicket.sum())]

    total = total_wicket + total_run
    data = {
        'total_wicket':total[0],
        'total_run':total[1]
    }

    return jsonify(data)    

@app.route("/signup", methods=['GET','POST'])
def signup():
    data = request.get_json()
    name = data['name']
    email = data['email']
    age = data['age']
    gender = data['gender']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "user already exists"})
    else:
        new_user = User(name=name,email=email,age=age,gender=gender,password=password)
        db.session.add(new_user)
        db.session.commit()
        
        print("user created")
        return jsonify({"message":"user Created"})

@app.route("/login", methods=['GET','POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        return jsonify({"message":"login Successful"})
    else:
        return jsonify({"message":"check login credentials"})
    

@app.route("/match", methods=['GET','POST'])
def match():
    match = match_data()

    return jsonify(match)

@app.route("/mat", methods=['GET','POST'])
def mat():
    match = match_score()

    return "Hello"



@app.cli.command("create_db")
def create_db():
    db.create_all()
    print("Database created!") 

if __name__ == "__main__":
    app.run()