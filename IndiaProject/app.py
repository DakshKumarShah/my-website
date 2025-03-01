from flask import Flask, render_template, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template(r'graph.html')

@app.route('/data')
def data():
    # Load the data from the CSV file
    file_path = r"D:\my-express-server\IndiaProject\population.csv"
    data = pd.read_csv(file_path)
    return jsonify(data.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)