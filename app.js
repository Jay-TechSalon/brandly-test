(function () {

  'use strict';

  window.angular.module('testApp', ['testApp.basketItems'])
    .controller('MainCtrl', MainCtrl)
    .filter('title', title);


  MainCtrl.$inject = ['BusinessCard', 'Letterhead'];

  function MainCtrl (BusinessCard, Letterhead) {
    this.basketItems = [
      new BusinessCard('Bill', 100),
      new Letterhead('Cindy', 50),
      new BusinessCard('Raphael', 50)
    ];
    this.currentItem = this.basketItems[0];
  }

  MainCtrl.prototype = {
    removeItem: function (item) {
      var index = this.basketItems.indexOf(item);
      if (index !== -1) {
        this.basketItems.splice(index, 1);
        if (item === this.currentItem) {
          this.currentItem = this.basketItems[0];
        }
      }
    },
    addAnother: function (item) {
      var ItemConstructor = item.constructor,
          minQuantity     = item.priceList[0],
          newItem         = new ItemConstructor('', 50);
      this.basketItems.push(newItem);
      this.goToItem(newItem);
    },
    goToItem: function (item) {
      this.currentItem = item;
    },
    isCurrent: function (item) {
      return item === this.currentItem;
    },
    basketSum: function () {
      var sum = 0;
      for (var i = 0; i < this.basketItems.length; i += 1) {
        sum += this.basketItems[i].getPrice();
      }
      return sum;
    },
    collapseMiniCart: function () {
      return this.basketItems.length > 5;
    },
    canRemove: function () {
      return this.basketItems.length > 1;
    }
  };


  function title () {
    return function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    };
  }

}) ();
