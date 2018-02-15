"use strict";

// caluclates income form self-employment
function calculateIncome(earnings, expenses){

	let msg;
	// displays error message if something wrong
	if (expenses == ""){
		msg = 'You have made an error in filling out this form. Please try again.'
	}else{
	// displays calculation
		let calculation = Number(earnings) - Number(expenses)
		if (calculation < 0){
			msg = 'Your expenses are greater than your earnings'
		}else{
		let dlrAmnt = makeMoney(calculation)
		msg = `Add ${dlrAmnt} to your monthly income`
		}
	}
	return msg;
}

// displays income ftom self-empployment
function calcIncome(){
	
	let earnings = $("#earnings-self-emp").val();
	let expenses = $("#expense-input").val();

	let msg = calculateIncome(earnings, expenses)
	

	$("#displayIncome").html(msg);	
}

// calculates expenses for self-emp modal
function calcExpenses(choice, earnings){

	let expenses;
	if(choice == "forty"){
		expenses = earnings * .4

	}else{
		expenses = ""
	} 
	return expenses;
}

// gets and displays expenses
function getExpenses(evt){
	let choice = this.value;
	let earnings = Number($("#earnings-self-emp").val());

	let expenses = calcExpenses(choice, earnings);
	
	$("#expense-input").removeClass("hidden");
	$("#expense-input").val(expenses);
}

// resets self-emp income modal to original state
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