"use strict";

let data = {};

// placing info in form
function passInfo(name){
	let val = $("#" + name).val();

	if (name == "income"){
		val = makeMoney(val);
	}
	data[name] = val;
	$("." + name + "info").html(val);
}

// replacing null values
function replaceNulls(name){
	let val = $("#" + name).val();

	if (val == ""){
		$("#" + name).val(0)
	}
}

// cleaning info and passing to form
function confirmInfo(evt){
	evt.preventDefault();

	const formNames = ["fammembers", "empmembers", "county", "income"]
	
	for (let name of formNames){
		replaceNulls(name);
		passInfo(name);
	}
	
	$('#home-modal').modal('show');
}

// event listeners 
$('#submithome').on('click', confirmInfo);

$('#submitmodal').on('click', function(){$('#home-modal').modal('hide'); $("#homeform").submit(); })






