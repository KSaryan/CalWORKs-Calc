from jinja2 import StrictUndefined
from flask import jsonify
from flask import (Flask, render_template, redirect, request, flash,
                   session, g)

import json

import requests

import os

from calworks import * 

import ast


app = Flask(__name__)
app.secret_key = "ABC"

COUNTIES = ['Alameda', 'Alpine', 'Amador', 'Butte', 'Calaveras', 'Colusa', 
'Contra Costa', 'Del Norte', 'El Dorado', 'Fresno', 'Glenn', 'Humboldt', 
'Imperial', 'Inyo', 'Kern', 'Kings', 'Lake', 'Lassen', 'Los Angeles', 
'Madera', 'Marin', 'Mariposa', 'Mendocino', 'Merced', 'Modoc', 'Mono', 
'Monterey', 'Napa', 'Nevada', 'Orange', 'Placer', 'Plumas', 'Riverside', 
'Sacramento', 'San Benito', 'San Bernardino', 'San Diego', 'San Francisco', 
'San Joaquin', 'San Luis Obispo', 'San Mateo', 'Santa Barbara', 'Santa Clara', 
'Santa Cruz', 'Shasta', 'Sierra', 'Siskiyou', 'Solano', 'Sonoma', 'Stanislaus', 
'Sutter', 'Tehama', 'Trinity', 'Tulare', 'Tuolumne', 'Ventura', 'Yolo', 'Yuba']


JS_TESTING_MODE = False


@app.before_request
def add_tests():
    g.jasmine_tests = JS_TESTING_MODE


@app.route('/')
def show_homepage():
	"""Displays homepage"""

	return render_template("homepage.html")


@app.route('/intake_form')
def shot_intake_form():
	"""DIsplays intial form to be completed"""

	return render_template('intake_form.html', counties = COUNTIES)


@app.route('/passed_gross_income_test', methods=["POST"])
def check_gross_income():
	"""Checks if family passes gross_income_test and redirects user accordingly"""
	try: 
		total_income = int(request.form.get('income'))
		fam_members = int(request.form.get('fammembers'))
		emp_fam_members = int(request.form.get('empmembers'))
		county_of_res = request.form.get('county')
	except ValueError:
		return redirect('/error')
	
	if not fam_members or county_of_res == 'other':
		return redirect('/error')

	if gross_income_test(total_income, fam_members, emp_fam_members, county_of_res):
		return render_template("fam_form.html", county= county_of_res, fam_mems_total=fam_members)
	else:
		return redirect("/sorry")


@app.route('/passed_gross_income_test', methods=["GET"])
def show_default_form():
	"""Displays generic family form"""

	return render_template("fam_form.html", county= None, fam_mems_total=1, counties = COUNTIES)


@app.route('/calc_grant', methods=["POST"])
def cal_grant():
	"""Calculates family grant and returns results"""

	family = request.form.get('family')
	try: 
		family = ast.literal_eval(family)
	except:
		return redirect("/error")
	
	county = request.form.get('county').replace("-", " ")
	

	result = pass_section_a(family, county)
	if result:
		grant = grant_computation(family, county, result)
		grant = '{:20,.2f}'.format(grant)
		return render_template('grant.html', grant=grant)
	else:
		return redirect ('/sorry')

		
@app.route('/error')
def show_error_message():
	"""Diaplays page with error message"""

	return render_template("oops.html")


@app.route('/sorry')
def show_sorry_message():
	"""Diaplays page with sorry message"""

	return render_template("sorry.html")



if __name__ == "__main__":

	import sys
	if sys.argv[-1] == "jstest":
		JS_TESTING_MODE = True
        
	app.run(debug=True)
	app.debug = True
	app.run(port=5000, host='0.0.0.0')






