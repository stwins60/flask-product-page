from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

EMAIL_PATTERN = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/waitlist", methods=["POST"])
def join_waitlist():
    data = request.get_json()
    email = data.get("email", "").strip()

    if not re.match(EMAIL_PATTERN, email):
        return jsonify({
            "success": False,
            "message": "Please enter a valid email address."
        }), 400

    # Replace this with database, CRM, email platform, etc.
    print(f"New waitlist signup: {email}")

    return jsonify({
        "success": True,
        "message": "You are on the list. Welcome to Orbit!"
    })


if __name__ == "__main__":
    app.run(debug=True)