"use strict";

const altNames = {'A': 'Assitance Unit (non-penalized)' ,
                  'B': 'Penalized Assistance Unit', 
                  'C': 'non-AU (if income counted or ineligible non citizen)', 
                  'E': 'Sanctioned'}

var famObj = {};

// adding another family member form
function addMember(evt){
  evt.preventDefault();

  // disable button
  $(evt.target).attr("disabled", "disabled");

  // get number for next family memeber
  let data = $(evt.target).data("form");
  let idName = data + 1; 

  // adding another family member to DOM
  $('#fam-mems').append(`<div class="row">
  <form class="form-horizontal" id = ${idName} >
  <fieldset>

  <legend> Family Member ${idName} </legend>

  <div class="form-group">
    <label class="col-md-4 control-label" for="ABCDE">Category</label>
    <div class="col-md-4">
      <select name="ABCDE" class="form-control save-change ${idName}">
        <option value="None"> Choose a Category</option>
        <option value="A">Assitance Unit (non-penalized)</option>
        <option value="B">Penalized Assitance Unit</option>
        <option value="C">non-AU (if income counted or ineligible non citizen)</option>
        <option value="E">Sanctioned</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label class="col-md-4 control-label" for="income">Monthly Earned Income (pre-tax)</label>  
    <div class="col-md-4">
    <input name="income" type="number" placeholder="0" class="form-control input-md save-change ${idName}" required="">
      
    </div>
    <div class="col-md-4 tips">
      <a data-toggle="modal" href="#self-emp-modal">
      Calculate Self-Employment Income
      </a>
    </div>
  </div>
  
  <div class="form-group">
    <label class="col-md-4 control-label" for="dis_based_unearned">Disability-Based Unearned Income</label>  
    <div class="col-md-4">
    <input name="dis_based_unearned" type="number" placeholder="0" class="form-control input-md save-change ${idName}" required="">
      
    </div>
  </div>


  <div class="form-group">
    <label class="col-md-4 control-label" for="child/spousal_support">Child/Spousal Support Received</label>  
    <div class="col-md-4">
    <input name="child/spousal_support" type="number" placeholder="0" class="form-control input-md save-change ${idName}" required="">
      
    </div>
  </div>


  <div class="form-group">
    <label class="col-md-4 control-label" for="nonexempt_income">Non-Exempt Income*</label>  
    <div class="col-md-4">
    <input name="nonexempt_income" type="number" placeholder="0" class="form-control input-md save-change ${idName}" required="">
      
    </div>
  </div>

  <div class="form-group">
    <label class="col-md-4 control-label" for="mem-sub">Save Member</label>
    <div class="col-md-8">
      <button name="mem-sub" class="btn btn-success save-btn-${idName}" data-form = ${idName}>Save</button>
      <button name="add" class="btn btn-primary save-btn-${idName} add-btn-${idName} btn${idName}" data-form = ${idName}>Save And Add Another Member</button>
      <button name="remove" class="btn btn-primary rmv-btn" data-form = ${idName}>Remove Member</button>
    </div>
  </div>`);

  // adding event listeners
  addEventListeners();
  addEventListenersBtns(idName);
  addModalListeners();
}

// adding family member info to famObj and putting in hidden form
function saveMember(evt){
  evt.preventDefault();

	let data = $(evt.target).data("form");
  let id = '#' + data
	let info = $(id).serializeArray();
  let memObj = {};

  for (let item of info){
    // replacing empty fields with 0
    let value = item['value'] == "" ? 0 : item['value']
    // creating object with individual famil member info
    memObj[item['name']] = value
  }

  // adding family member to family object
  famObj[data] = memObj;

  $('#family').val(JSON.stringify(famObj));

  updateModal();
}

// remove a family member
function removeMember(evt){
  let data = $(evt.target).data("form");
  $("#"+data).parent().remove();
  let prevMember = data - 1;
  $('.btn' + prevMember).attr("disabled", false);

  delete famObj[data];

  updateModal();

}


// update info in modal
function updateModal(){
  $('#fam-table').empty();
  for (let member in famObj){
    let category = famObj[member]['ABCDE']
    //replacing letter category with more user friendly text
    let altCategory = altNames[category]
    let income = makeMoney(famObj[member]['income'])
    let disBasedUnearned = makeMoney(famObj[member]['dis_based_unearned'])
    let support =  makeMoney(famObj[member]['child/spousal_support'])
    let nonexemptIncome = makeMoney(famObj[member]['nonexempt_income'])
    $('#fam-table').append(`<tr>
                           <td>${ member }</td>
                           <td>${ altCategory }</td>
                           <td>${ income }</td>
                           <td>${ disBasedUnearned }</td>
                           <td>${ support }</td>
                           <td>${ nonexemptIncome }</td>
                           </tr>`)
  }
}