"use strict";

// create warning to user to remember to save
function addWarning(evt){
  $(evt.target).css("border", "1px solid red");
  $("div.warning").html("There is unsaved information.");
  $("div.warning").css("color", "red");
}

// clear away warning to save information
function clearWarning(evt){
  let data = $(evt.target).data("form");
  $("." + data).css("border", "1px solid #ccc");
  $("div.warning").empty();
}

// confirms if send family member with no category
function lastConfirm(){
  $('#fam-modal').modal('hide'); 
  for (let key in famObj){
    if (famObj[key]['ABCDE'] == "None"){
      if (confirm("You are submitting this form with missing information. Proceed?")){
        $('#calc-grant').submit();
      }
    }else{
      $('#calc-grant').submit();
    }
  }
}

// event listeners for individual family member forms
function addEventListeners(){
  $('.save-change').keydown(addWarning);
  $('.save-change').change(addWarning);
  $('.rmv-btn').click(removeMember);
}

function addEventListenersBtns(num){
  $('.save-btn-'+ num).on('click', function(evt){saveMember(evt); clearWarning(evt);});
  $('.add-btn-' + num).on('click', function(evt){addMember(evt)});
}

addEventListeners();
addEventListenersBtns(1);

// event listeners for final submission
$('#calc-btn').click(function(evt){evt.preventDefault(); $('#fam-modal').modal('show');});
$('#submitmodal-fam').click(lastConfirm)





