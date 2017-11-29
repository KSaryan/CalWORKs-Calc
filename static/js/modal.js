"use strict";


function calcIncome(){
	// get info from form
	debugger;
	let earnings = Number($("#earnings-self-emp").val());
	let expenses = $("#expense-input").val();

	let msg;
	// displays error message if something wrong
	if (expenses == ""){
		msg = 'You have made an error in filling out this form. Please try again.'
	}else{
	// displays calculation
		let calculation = earnings - Number(expenses)
		if (calculation < 0){
			msg = 'Your expenses are greater than your earnings'
		}else{
		let dlrAmnt = makeMoney(calculation)
		msg = `Add ${dlrAmnt} to your monthly income`
		}
	}

	$("#displayIncome").html(msg);	
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