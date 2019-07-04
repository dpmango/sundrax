//////////
// SCROLLTOP
//////////
(function($, APP) {
  APP.Components.Map = {
    init: function() {
      if ($('#contact-map').length > 0) {
        ymaps.ready(initContactMap);
      }
    },
    initContactMap: function() {
      var myMap;

      myMap = new ymaps.Map('contact-map', {
        center: [55.753215, 37.622504],
        zoom: 10,
      });

      myMap.controls.remove('trafficControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      // myMap.controls.remove('geolocationControl');
      myMap.controls.remove('routeEditor');
      myMap.controls.remove('typeSelector');
      // myMap.controls.remove('zoomControl');
    },
  };
})(jQuery, window.APP);
