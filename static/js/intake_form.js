let data = {};


function passInfo(name){
	let val = $("#" + name).val();
	if (name == "income"){
		val = makeMoney(val);
	}
	data[name] = val;
	$("." + name + "info").html(val);
}

// putting info into modal
function confirmInfo(evt){
	evt.preventDefault();

	passInfo("fammembers");
	passInfo("empmembers");
	passInfo("county");
	passInfo("income");
	
	$('#home-modal').modal('show');
}


// event listeners 
$('#submithome').on('click', confirmInfo);

$('#submitmodal').on('click', function(){$('#home-modal').modal('hide'); $("#homeform").submit(); })






