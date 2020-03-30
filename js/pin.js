'use strict';

(function () {

  var PINS_LIMIT = 5;

  var createPin = function (card) {
    var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
    var anotherPin = mapPin.cloneNode(true);
    var mapPinImg = anotherPin.querySelector('img');
    anotherPin.style.left = card.location.x - (window.utils.MAP_PIN_WIDTH / 2) + 'px';
    anotherPin.style.top = card.location.y - window.utils.MAP_PIN_HEIGHT + 'px';
    mapPinImg.src = card.author.avatar;
    mapPinImg.alt = card.offer.title;
    anotherPin.addEventListener('click', function () {
      window.utils.removeMapCard();
      window.popup.fillInfo(card);
      activatePin(anotherPin);

    });
    return anotherPin;
  };

  var renderPins = function (cards) {
    var map = document.querySelector('.map');
    var fragment = document.createDocumentFragment();
    window.form.enablePage();
    window.utils.removePins();
    if (cards.length > PINS_LIMIT) {
      for (var i = 0; i < PINS_LIMIT; i++) {
        fragment.appendChild(createPin(cards[i]));
      }
    } else {
      cards.forEach(function (card) {
        fragment.appendChild(createPin(card));
      });
    }
    map.appendChild(fragment);
  };

  var activatePin = function (pin) {
    var pinActivated = document.querySelector('.map__pin--active');
    if (pinActivated) {
      pinActivated.classList.remove('map__pin--active');
    }
    pin.classList.add('map__pin--active');
  };

  // Exports
  window.pin = {
    render: renderPins,
  };

})();
