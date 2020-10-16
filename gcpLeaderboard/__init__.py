from flask import Flask, render_template


def create_app():
    """Function to create and return an application"""
    app = Flask(__name__, static_url_path="/static")

    @app.route("/")
    def index():
        return render_template("index.html")

    app.debug = True
    return app
