let famObj = {};

// adding another family member form
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
    <select name="ABCDE" class="form-control save-change ${idName}">
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
  <input name="income" type="number" placeholder="#" class="form-control input-md save-change ${idName}" required="">
    
  </div>
</div>

<div class="form-group">
  <label class="col-md-4 control-label" for="mem-sub">Save Member</label>
  <div class="col-md-8">
    <button name="mem-sub" class="btn btn-success save-mem-btn" data-form = ${idName}>Save</button>
    <button name="add" class="btn btn-primary save-mem-btn save-and-add-mem-btn btn${idName}" data-form = ${idName}>Save And Add Another Member</button>
    <button name="remove" class="btn btn-primary rmv-btn" data-form = ${idName}>Remove Member</button>
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

  console.log(famObj);
  $('#fam-table').empty();
  for (member in famObj){
    $('#fam-table').append(`<tr>
              <td>Member ${member}</td>
              <td>${famObj[member]['income']}</td>
              <td>${famObj[member]['ABCDE']}</td>
            </tr>`);
  }
}

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

// remove a family member
function removeMember(evt){
  let data = $(evt.target).data("form");
  // $("#"+data).remove();
  $("#"+data).parent().remove();
  let prevMember = data - 1;
  $('.btn' + prevMember).attr("disabled", false);

}

// event listeners
function addEventListeners(){
  $('.save-mem-btn').on('click', function(evt){saveMember(evt); clearWarning(evt);});
  $('.save-and-add-mem-btn').on('click', function(evt){addMember(evt)});
  $('.save-change').keydown(addWarning);
  $('.save-change').change(addWarning);
  $('.rmv-btn').click(removeMember);
}

addEventListeners();

$('#calc-btn').click(function(evt){evt.preventDefault(); $('#fam-modal').modal('show');})







