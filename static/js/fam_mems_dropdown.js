"use strict";

function changeFamAmount(){
//get from dropdown hom many they want
	let newSelection = parseInt($('#fam-mems-select').val());
	let prevSelection = parseInt($('#prev-select').val());
	if (newSelection > prevSelection){
		for(let i=(prevSelection+1); i<=newSelection; i++){
			addMember(i);
		}
	}else if (newSelection < prevSelection) {
		for(let i=(newSelection+1); i<=prevSelection; i++){
			removeMember(i);
		}
	}

	$('#prev-select').val(newSelection);
}

$('#fam-mems-select').change(changeFamAmount);