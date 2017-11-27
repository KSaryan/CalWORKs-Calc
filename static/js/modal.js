"use strict";

function calculateSelfEmp(earnings, expenses, percent){
	// do stuff
	let calculation = 5;
	return calculation
}


function calcIncome(){
	// get info from form
	let earnings = $("#earnings-self-em").val();
	let expenses = $("#expenses").val();
    let percent = $("input[name='percent']:checked").val();
   
	// calculate
	let calculation = calculateSelfEmp(earnings, expenses, percent)

	//need to link to makemoney file
	let dlrAmnt = makeMoney(calculation)
	$("#displayIncome").html(`Add 5 to your monthly income`);
}

// event listeners
function addModalListeners(){
	$('#self-emp-btn').click(calcIncome);
	// clears div
	$('.close-btn').click(() => $("#displayIncome").empty());
}

addModalListeners();