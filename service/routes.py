import sys
import logging
from flask import jsonify, request, json, url_for, make_response, abort
from . import app
import pandas as pd
dfrom .utils import status  # HTTP Status Codes
from .utils import error_handlers
# import sklearn
import joblib


######################################################################
# GET INDEX
######################################################################
@app.route("/")
def index():
    """Base URL for our service"""
    return app.send_static_file("index.html")

@app.route("/get-runner-quote", methods=['GET'])
def runner_quote():
    """Base URL for our service"""
    return app.send_static_file("quote.html")

@app.route("/get-runner-quote", methods=['POST'])
def runner_quote_submit():
    json_ = request.json

    query_df = pd.DataFrame([json_])
    query = pd.get_dummies(query_df)

    query = [[162.932192]]
    classifier = joblib.load('classifier.pkl')
    prediction = classifier.predict(query)

    print({'prediction': list(prediction)})
    score = str(list(prediction)[0])

    result = {
        'fitness_score': score,
        'quote': 100
    }

    return make_response(jsonify(result), status.HTTP_200_OK)


