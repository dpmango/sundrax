//////////
// SCROLLTOP
//////////
(function($, APP) {
  APP.Components.Map = {
    data: {
      scriptsCreated: false,
      ymapsLoaded: false,
    },
    init: function() {
      if ($('#contact-map').length > 0) {
        if (this.data.ymapsLoaded) {
          ymaps.ready(this.initContactMap);
        } else {
          this.tryLoadScripts();
        }
      }
    },
    createScripts: function() {
      var ymapsK = '9ba9a278-66f0-47c6-8197-0d404ee0def5';
      var ymapsScript = document.createElement('script');
      ymapsScript.type = 'text/javascript';
      ymapsScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + ymapsK + '&lang=ru_RU';
      $('head').append(ymapsScript);
      this.data.scriptsCreated = true;
    },
    tryLoadScripts: function() {
      var _this = this;
      if (!_this.data.scriptsCreated) {
        _this.createScripts();
      }

      var ticker = setInterval(readyChecker, 250);
      function readyChecker() {
        if (!_this.data.ymapsLoaded) {
          try {
            if (ymaps.ready()) {
              _this.data.ymapsLoaded = true;
              _this.init(); // reinit
              clearInterval(ticker);
            }
          } catch (e) {
            // console.log('maps not ready yeat, another try');
          }
        }
      }
    },
    initContactMap: function() {
      var myMap;

      myMap = new ymaps.Map('contact-map', {
        center: [55.724713, 37.645034],
        zoom: 15,
      });

      myMap.controls.remove('trafficControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      // myMap.controls.remove('geolocationControl');
      myMap.controls.remove('routeEditor');
      myMap.controls.remove('typeSelector');
      // myMap.controls.remove('zoomControl');

      var placeholder = new ymaps.Placemark(
        [55.724713, 37.645034],
        {
          // balloonContent: 'ул. Летниковская, д. 11/10, стр. 1, подъезд 6',
          iconCaption: 'ул. Летниковская, д. 11/10, стр. 1, подъезд 6',
        },
        {
          preset: 'islands#redCircleDotIconWithCaption',
        }
      );

      myMap.geoObjects.add(placeholder);
    },
  };
})(jQuery, window.APP);
