"use strict";


function calcIncome(){
	// get info from form
	let earnings = Number($("#earnings-self-emp").val());
	let expenses = Number($("#expense-input").val());
	// sets expenses to ) if they didn't type anything in
	if (isNaN(expenses)){
		expenses = 0;
	}

	let calculation = earnings - expenses

	// displays error message if something wrong
	if (isNaN(calculation)){
		let errorMsg = 'You have made an error in filling out this form please try again.'
		$("#displayIncome").html(errorMsg);
	}else{
	// displays calculation
	let dlrAmnt = makeMoney(calculation)
	$("#displayIncome").html(`Add ${dlrAmnt} to your monthly income`);
}
}

function getExpenses(evt){
	let choice = this.value;

	if(choice == "forty"){
		let earnings = $("#earnings-self-emp").val()
		let expenses = earnings * .4

		$("#expense-input").removeClass("hidden");
		$("#expense-input").val(expenses);

	}else{
		$("#expense-input").removeClass("hidden");
		$("#expense-input").val("");
	} 
}

function resetModal(){
	// clears div
	$("#displayIncome").empty()
	// hides and clears expenses
	$("#expense-input").val("");
	$("#expense-input").addClass("hidden");
	$("#expenses-div").addClass("hidden");
	// clears earnings
	$("#earnings-self-emp").val("")
	// unchecks radio buttons
	$(".modal-radio").prop("checked", false);
}

// event listeners
function addModalListeners(){
	$('#self-emp-btn').click(calcIncome);
	$('.close-btn').click(resetModal);
	$('.modal-radio').click(getExpenses);
	$('#earnings-self-emp').keydown(() => $("#expenses-div").removeClass("hidden"));
}

addModalListeners();

// hide expenses div and input
$("#expense-input").addClass("hidden");
$("#expenses-div").addClass("hidden");