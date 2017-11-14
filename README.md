# CALWorks Calculator
visit at [https://calworks-calc.herokuapp.com/](https://calworks-calc.herokuapp.com/)

The CALWorks Calculator is designed to help non-profit workers estimate the CALWorks grant a family will receive.

## Contents
* [Technologies](#technologies)
* [Features](#features)
* [Installation](#install)
* [Testing](#testing)
* [To Do](#todo)

## <a name="technologies"></a>Technologies
<b>Backend:</b> Python, Flask<br/>
<b>Frontend:</b> JavaScript, jQuery, Jinja2, Bootstrap, HTML5, CSS3<br/>

## <a name="features"></a>Features
User fills out inital information on a family
![alt text](screenshots/homepage.png "Homepage")

They need to confirm information
![alt text](screenshots/confirm-info-1.png "Confirmation on Homepage")

If the family passes the net income test, they will fill out more information on the family
![alt text](screenshots/1familymember.png "Family Info Form")

They can add and remove members
![alt text](screenshots/2familymembers.png "2 Family Members")

And will be reminded to save before submitting
![alt text](screenshots/unsaved-info.png "Warning Message")

Once again, they can review information before submitting
![alt text](screenshots/confirm-Info-2.png "Confirmation on Family Form Page")

They will then get the family's grant amount
![alt text](screenshots/estimated-grant.png "Estimated Grant")

Or a sorry message
![alt text](screenshots/sorry.png "Sorry Message")




## <a name="install"></a>Installation
To run CALWorks Calculator:


Clone or fork this repo:

```
https://github.com/KSaryan/CalWORKS-Calc
```

Create and activate a virtual environment inside your CalWORKS-Calc directory:

```
virtualenv env
source env/bin/activate
```

Install the dependencies:

```
pip install -r requirements.txt
```

Run the app:

```
python server.py
```

You can now navigate to 'localhost:5000/' to access CALWorks Caculator.



## <a name="testing"></a> Testing
To run tests:

```
python calworks.py
```

## <a name="todo"></a> To Do

- [X] Last of backend logic for calculating grant
- [X] Finish unit testing in calworks.py
- [ ] Footnotes
- [ ] Integration testing
- [X] Launch
