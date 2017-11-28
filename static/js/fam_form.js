"use strict";

// saves all family member information
function saveInfo(evt){
  evt.preventDefault();
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
  if ("None" in famObj){
      if (confirm("You are submitting this form with missing information. Proceed?")){
        $('#calc-grant').submit();
      }else{
        $('#fam-modal').modal('hide');
      }
  }else{
      $('#calc-grant').submit();
    }
}


// event listeners for final submission
$('#calc-btn').click(saveInfo);
$('#submitmodal-fam').click(lastConfirm)






