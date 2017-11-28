"use strict";

// formats num into dollar amount
function makeMoney(num){
  num = Number(num);
  var money = '$' + num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return money;
}