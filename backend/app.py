from flask import Flask,jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from flask_cors import CORS
from webdriver_manager.chrome import ChromeDriverManager
import time


app = Flask(__name__)
CORS(app)

def scrap():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("https://www.cricbuzz.com/cricket-match/live-scores")
    time.sleep(5)

    match_element = driver.find_elements(By.CSS_SELECTOR, '.cb-col-100 .cb-col .cb-schdl')
    print(f"Found {len(match_element)} matches")

    score_data = []
    
    for match in match_element:
        team = match.find_elements(By.CSS_SELECTOR,".cb-ovr-flo .cb-hmscg-tm-nm")
        score = match.find_elements(By.CSS_SELECTOR,".cb-ovr-flo[style='display:inline-block;width:140px']")

        if len(team) >1 and len(score)>1:
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


@app.route("/",methods=['GET','POST'])
def home():
    data = scrap()
    return jsonify(data)

if __name__ == "__main__":
    app.run()