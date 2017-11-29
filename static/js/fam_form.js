"use strict";

// saves all family member information
function saveInfo(evt){
  evt.preventDefault();
  if ($('#county').val() == "None"){
    alert("Please choose a county of residence before continuing.");
    return;
  }
  // empty famObj
  famObj = {};
  // getting current family count from hidden input
  let familyCount = parseInt($('#prev-select').val());
  // looping and saving each family member 
  for(let i=0; i<familyCount; i++){
    let num = i + 1;
    saveMember(num);
  }
  // update modal with new info
  updateModal();
  // open modal
  $('#fam-modal').modal('show');
}


// confirms if send family member with no category
function lastConfirm(){
  $('#fam-modal').modal('hide'); 

  // checking if missing category for any family member
  let missingCat;
  for (let key in famObj){
    if(famObj[key]["ABCDE"]=="None"){
      missingCat = true;
    }
  }

  if (missingCat){
      if (confirm("You are submitting this form with missing information. Proceed?")){
        $('#calc-grant').submit();
      }else{
        $('#fam-modal').modal('hide');
      }
  }else{
      $('#calc-grant').submit();
    }
}


// put county in hidden input
function inputCounty (){
  let county = $('#county-backup').val();
  $('#county').val(county);
}


// event listeners for final submission
$('#calc-btn').click(saveInfo);
$('#submitmodal-fam').click(lastConfirm);
$('#county-backup').change(inputCounty);





