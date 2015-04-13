(function () {

  'use strict';

  angular.module('testApp.basketItems', [])
    .factory('BusinessCard', BusinessCardFactory)
    .factory('Letterhead', LetterheadFactory);


  function BasketItem (name, quantity) {
    this.name = name;
    this.quantity = quantity;
    this.thumb = "thumb.jpg";
  }

  BasketItem.prototype = {
    getPrice: function () {
      for (var i = 0; i < this.priceList.length; i += 1) {
        if (this.quantity === this.priceList[i][0]) {
          return this.priceList[i][1];
        }
      }
    }
  };


  function BusinessCardFactory () {

    function BusinessCard (name, quantity) {
      BasketItem.call(this, name, quantity)
    }

    BusinessCard.prototype = Object.create(BasketItem.prototype);

    angular.extend(BusinessCard.prototype, {
      constructor: BusinessCard,
      priceList: [
        [50, 15],
        [100, 25],
        [250, 35]
      ],
      productName: 'Business Card',
      fields: ['name', 'title', 'street', 'city, state, zip', 'phone', 'email']
    });

    return BusinessCard;
  }


  function LetterheadFactory () {

    function Letterhead (name, quantity) {
      BasketItem.call(this, name, quantity);
    }

    Letterhead.prototype = Object.create(BasketItem.prototype);

    angular.extend(Letterhead.prototype, {
      constructor: Letterhead,
      priceList: [
        [10, 5],
        [20, 10],
        [50, 25]
      ],
      productName: 'Letterhead',
      fields: ['name', 'title', 'phone', 'email']
    });

    return Letterhead;
  }

}) ();
