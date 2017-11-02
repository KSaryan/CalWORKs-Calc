let data = {};


function passInfo(name){
	let val = $("#" + name).val();
	data[name] = val;
	$("." + name + "info").html(val);
}

// putting info into modal
function confirmInfo(evt){
	evt.preventDefault();

	passInfo("fammembers");
	passInfo("empmembers");
	passInfo("city");
	passInfo("income");
	
	$('#home-modal').modal('show');
}


// event listeners 
$('#submithome').on('click', confirmInfo);

$('#submitmodal').on('click', function(){$('#home-modal').modal('hide'); $("#homeform").submit(); })






