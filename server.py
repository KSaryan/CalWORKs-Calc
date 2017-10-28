from jinja2 import StrictUndefined
from flask import jsonify
from flask import (Flask, render_template, redirect, request, flash,
                   session)

import json

import requests

import os

from calworks import * 

import ast


app = Flask(__name__)
app.secret_key = "ABC"


@app.route('/')
def show_homepage():
	"""Displays homepage with preliminary form"""

	return render_template('homepage.html', region_one = REGION_1)


@app.route('/passed_net_income_test', methods=["POST"])
def check_net_income():
	"""checks if family passes net_income_test and redirects user accordingly"""

	total_income = int(request.form.get('income'))
	fam_members = int(request.form.get('fammembers'))
	emp_fam_members = int(request.form.get('empmembers'))
	city_of_res = request.form.get('city')

	if net_income_test(total_income, fam_members, emp_fam_members, city_of_res):
		return render_template("fam_form.html", city= city_of_res)
	else:
		return redirect("/sorry")


@app.route('/calc_grant', methods=["POST"])
def cal_grant():
	"""Calculates family grant and returns results"""

	family = request.form.get('family')
	family = ast.literal_eval(family)
	
	city = request.form.get('city').replace("-", " ")
	

	result = pass_section_a(family)

	if result:
		grant = grant_computation(family, city, result)
		return render_template('grant.html', grant=grant)
	else:
		return redirect ('/sorry')



@app.route('/sorry')
def show_sorry_message():
	"""Diaplays page with sorry message"""

	return render_template("sorry.html")


if __name__ == "__main__":
	app.debug = True
	app.run(port=5000, host='0.0.0.0')






