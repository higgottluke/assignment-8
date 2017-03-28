(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector:' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };

  CheckList.prototype.addRow = function (coffeeOrder) {
    var rowElement = new Row(coffeeOrder);
    this.removeRow(coffeeOrder.emailAddress);
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
    .find('[value="' + email + '"]')
    .closest('[data-coffee-order="checkbox"]')
    .remove();
  };

  function Row(coffeeOrder) {
    /* extra processing for the chapter 11 silver challenge, which we didn't need to do */
    var classes = 'checkbox ';
    if (coffeeOrder.strength >= 85) {
      classes += 'checkbox-red ';
    }
    else if (coffeeOrder.strength <= 15) {
      classes += 'checkbox-green ';
    }
    else {
      classes += 'checkbox-yellow ';
    }
    if (coffeeOrder.flavor == 'caramel') {
      classes += 'caramel';
    }
    else if (coffeeOrder.flavor == 'mocha') {
      classes += 'mocha';
    }
    else if (coffeeOrder.flavor == 'almond') {
      classes += 'almond';
    }
    /* end extra silver challenge stuff */
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': classes,
    });
    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }
    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strength + 'x]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }


  App.CheckList = CheckList;
  window.App = App;
}) (window);
