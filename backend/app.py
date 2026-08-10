import os
from flask import Flask, jsonify
import psycopg2
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

app= Flask(__name__)

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        user=os.environ["POSTGRES_USER"],
        password=os.environ["POSTGRES_PASSWORD"],
        dbname=os.environ["POSTGRES_DB"],
    )

@app.route("/api/ping")
def ping():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT NOW();")
    db_time = cur.fetchone()[0]
    cur.close()
    conn.close()
    return jsonify({"db_time": db_time.isoformat()})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
