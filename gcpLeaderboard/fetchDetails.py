# Import libraries
import requests
import urllib.request
import time
from pytz import timezone
from bs4 import BeautifulSoup
import fileinput
import json
import time
from datetime import datetime
import concurrent.futures
import os
from dotenv import load_dotenv

load_dotenv(".env")
biglist = []
url = []
url2 = []

lab = [
    "A Tour of Google Cloud Hands-on Labs",
]
course = [
    "Preparing for Your Associate Cloud Engineer Journey",
    "Google Cloud Fundamentals: Core Infrastructure",
    "Essential Google Cloud Infrastructure: Foundation",
    "Essential Google Cloud Infrastructure: Core Services",
    "Elastic Google Cloud Infrastructure: Scaling and Automation",
    "Getting Started with Google Kubernetes Engine",
    "Logging, Monitoring and Observability in Google Cloud",
    "Getting Started with Terraform for Google Cloud",
]
quest_list = [
    "Create and Manage Cloud Resources",
    "Perform Foundational Infrastructure Tasks in Google Cloud",
    "Set Up and Configure a Cloud Environment in Google Cloud",
    "Automating Infrastructure on Google Cloud with Terraform",
]
# get the url in list


def data_scraping(url):
    # print("in data scraping")
    fetchUrl = os.environ.get("FETCH_URL")
    f = urllib.request.urlopen(fetchUrl)
    for line in f:
        url.append(line.decode("utf8").replace("\n", ""))
    for ele in url:
        if ele.strip():
            url2.append(ele)
    start_thread(url2)

    # Connect to the URL


def data_gathering(link):
    # print(link)
    tempdic = {}
    response = requests.get(link)
    soup = BeautifulSoup(response.text, "html.parser")
    labcompleted = []
    coursecompleted = []
    questcompleted = []
    profile = soup.findAll("div", attrs={"class": "text--center"})[0]
    # print(profile)
    # dp = profile.findAll("ql-avatar")[0]["src"]
    dp = "abc"
    name = profile.h1.text
    # print(name)
    tempdic["name"] = name.strip()
    tempdic["dp"] = dp
    quests = soup.findAll("div", attrs={"class": "profile-badge"})
    for quest in quests:
        allquest = quest.findAll("span", attrs={"class": "ql-subhead-1"})[
            0
        ].text.strip()
        if allquest in lab:
            labcompleted.append(allquest)
        if allquest in course:
            coursecompleted.append(allquest)
        if allquest in quest_list:
            questcompleted.append(allquest)
    tempdic["lab"] = labcompleted
    tempdic["course"] = coursecompleted
    tempdic["quest"] = questcompleted
    tempdic["qcomplete_no"] = len(labcompleted) + len(coursecompleted) + len(questcompleted)
    # print(tempdic)

    if tempdic["qcomplete_no"] != 0:
        biglist.append(tempdic)


def data_saving(biglist):
    # print("in data saving")
    res = sorted(biglist, key=lambda x: x["qcomplete_no"], reverse=True)
    now = datetime.now(timezone("Asia/Kolkata"))
    dt_string = now.strftime("%d/%m/%Y %H:%M") + " IST"
    with open("gcpLeaderboard/static/lastUpdated.txt", "w") as f:
        print(dt_string, file=f)
    with open("gcpLeaderboard/static/details.json", "w") as f:
        json.dump(res, f)
    f.close()


def start_thread(url2):
    threads = 10

    with concurrent.futures.ThreadPoolExecutor(max_workers=threads) as executor:
        executor.map(data_gathering, url2)
    data_saving(biglist)


def main():
    # print("in main")
    data_scraping(url)


t0 = time.time()
main()
t1 = time.time()
print(f"{t1-t0} seconds to download {len(url2)} profile.")
print("number of people started", len(biglist))
