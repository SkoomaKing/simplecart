// calc cost of one row of items
var calcItemCost = function () {
  var prices = $('.item-price');
  var quantities = $('.item-quantity > input');

  for (var i = 0; i < quantities.length; i++) {
    var price = $(prices[i]).text();
    var itemTotal = Number($(quantities[i]).val()) * price;
    if (itemTotal != 0) {
      $($('.item-total')[i]).text(itemTotal.toFixed(2));
    }
    else{
      $($('.item-total')[i]).text(0);
    }
  }
}

// calc total cost
var calcTotalCost = function () {
  var total = 0;
  var subTotals = $('.item-total');

  for (var i = 0; i < subTotals.length; i++) {
    total += Number($(subTotals[i]).text());
  }
  if (total != 0) {
    $('.total-cost').text('$' + total.toFixed(2));
  }
  else {
    $('.total-cost').text(0);
  }
}

// helper function to calculate all costs
var calcCosts = function () {
  calcItemCost();
  calcTotalCost()
}

// remove an item
var removeItem = function () {
  $(this).closest('tr').remove();
  calcCosts();
}

// add an item
var addItem = function () {
  var newItemName = $('.add-item-name').val();
  var newItemPrice = parseFloat($('.add-item-price').val()).toFixed(2);
  
  // check to see if new item name or quantity are empty/invalid
  if (!newItemName || isNaN(newItemPrice)) {
    alert("Ensure new item name is not empty and price is a number.");
    return false;
  }

  // check to see if cart is empty
  if ($('#cart > tbody > tr').length == 0) {
    $('tbody').append("<tr><td class='item-name'>" + newItemName + "</td>" + 
      "<td class='item-price'>" + newItemPrice + "</td>" +
      "<td class='item-quantity'><input type='number' min='0' value='1' oninput='this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null' /></td>" +
      "<td class='item-total'></td>" + 
      "<td class='item-remove'><button class='btn'><i class='fas fa-trash'></i></button></td></tr>"
    );
  }
  else {
    $('tbody > tr:last-child').after("<tr><td class='item-name'>" + newItemName + "</td>" + 
      "<td class='item-price'>" + newItemPrice + "</td>" +
      "<td class='item-quantity'><input type='number' min='0' value='1' oninput='this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null' /></td>" +
      "<td class='item-total'></td>" + 
      "<td class='item-remove'><button class='btn'><i class='fas fa-trash'></i></button></td></tr>"
    );
  }
  calcCosts();
}

$(document).ready(function() {
  calcCosts();
  $(document).on('input', '.item-quantity', calcCosts);
  $(document).on('click', '.item-remove', removeItem);
  $(document).on('click', '.item-add', addItem);
})