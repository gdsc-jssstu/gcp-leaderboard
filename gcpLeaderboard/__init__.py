import atexit

from flask import Flask, render_template, jsonify

from gcpLeaderboard.scripts import fetchDetails

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor

sched = BackgroundScheduler(daemon=True)
sched.add_job(fetchDetails.main, "interval", minutes=30)
sched.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: sched.shutdown())


def create_app():
    """Function to create and return an application"""
    app = Flask(__name__, static_url_path="/static")

    @app.route("/")
    def index():
        with open("gcpLeaderboard/static/lastUpdated.txt", "r") as file:
            lastUpdated = file.read()
        return render_template("index.html", lastUpdated=lastUpdated)

    @app.route("/details", methods=["GET"])
    def details():
        with open("gcpLeaderboard/static/details.json", "r") as file:
            detailsFile = file.read()
        return jsonify(detailsFile)

    # app.debug = True
    return app
