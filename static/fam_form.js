let famObj = {};


// adding another family member form
// not working
function addMember(evt){
  evt.preventDefault();

  $(evt.target).attr("disabled", "disabled");

  let data = $(evt.target).data("form");
  let idName = data + 1; 

  $('#fam-mems').append(`<div class="row">
<form class="form-horizontal" id = ${idName} >
<fieldset>

<legend> Family Member ${idName} </legend>

<div class="form-group">
  <label class="col-md-4 control-label" for="ABCDE">Category</label>
  <div class="col-md-4">
    <select name="ABCDE" class="form-control">
      <option value="None"> Choose a Category</option>
      <option value="A">A (AU (non MFG and non-penalized))</option>
      <option value="B">B (Penalized AU)</option>
      <option value="C">C (non-AU (if income counted or ineligible non citizen)</option>
      <option value="D">D (MFG)</option>
      <option value="E">E (SANCTIONED)</option>
      <option value="None">None</option>
    </select>
  </div>
</div>

<div class="form-group">
  <label class="col-md-4 control-label" for="income">Monthly Income</label>  
  <div class="col-md-4">
  <input name="income" type="number" placeholder="#" class="form-control input-md" required="">
    
  </div>
</div>

<div class="form-group">
  <label class="col-md-4 control-label" for="mem-sub">Save Member</label>
  <div class="col-md-8">
    <button name="mem-sub" class="btn btn-success save-mem-btn" data-form = ${idName}>Save</button>
    <button name="add" class="btn btn-primary save-and-add-mem-btn" data-form = ${idName}>Save And Add Another Member</button>
  </div>
</div>`);

  addEventListeners();
}


// adding family member info to famObj and putting in hidden form
function saveMember(evt){
  evt.preventDefault();
	let data = $(evt.target).data("form");
  let id = '#' + data
	let info = $(id).serializeArray();
  let memObj = {};
  for (item of info){
    memObj[item['name']] = item['value']
  }
  famObj[data] = memObj;
  $('#family').val(JSON.stringify(famObj));
  console.log( $('#family').val())
}

function displayInfo(result){
  alert(result);
}

// event listeners
function addEventListeners(){
  $('.save-mem-btn').on('click', function(evt){saveMember(evt);});
  $('.save-and-add-mem-btn').on('click', function(evt){saveMember(evt); addMember(evt)});
}

addEventListeners();



