"use strict";

const altNames = {'A': 'Assitance Unit (non-penalized)' ,
                  'B': 'Penalized Assistance Unit', 
                  'C': 'non-AU (if income counted or ineligible non citizen)', 
                  'E': 'Sanctioned'}

var famObj ={};

// adding another family member form
function addMember(num){

  // get number for next family member
  let idName = num; 

  // adding another family member to DOM
  $('#fam-mems').append(`<div class="row sorted" data-sort = ${idName}>
  <form class="form-horizontal" id = form-${idName} >
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
      <span data-toggle="tooltip" title="Click to calculate self-employment income">
      <img src="/static/calc-icon.png"data-toggle="modal" href="#self-emp-modal"></img>
      </span>
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
    <label class="col-md-4 control-label" for="nonexempt_income">Non-Exempt Income</label>  
    <div class="col-md-4">
    <input name="nonexempt_income" type="number" placeholder="0" class="form-control input-md save-change ${idName}" required="">
    </div>
    <div class="col-md-2 tips">
     <img src="/static/tooltip-icon.png" alt="info" data-toggle="tooltip" title="Non-Exempt Income is 'unearned' income that is not disability-based (i.e. unemployment income or child/spousal support for C,E).">
    </div>
  </div>
    `);

}

// remove a family member
function removeMember(num){
  console.log(num);
  $('#form-'+num).parent().remove();

  delete famObj[num];

  updateModal();

}

// adding family member info to famObj and putting in hidden form
function saveMember(num){
  let id = '#form-' + num
	let info = $(id).serializeArray();
  let memObj = {};

  for (let item of info){
    // replacing empty fields with 0
    let value = item['value'] == "" ? 0 : item['value']
    // creating object with individual famil member info
    memObj[item['name']] = value
  }

  // adding family member to family object
  famObj[num] = memObj;

  $('#family').val(JSON.stringify(famObj));
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