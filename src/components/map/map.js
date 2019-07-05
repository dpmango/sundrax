//////////
// SCROLLTOP
//////////
(function($, APP) {
  APP.Components.Map = {
    init: function() {
      if ($('#contact-map').length > 0) {
        ymaps.ready(this.initContactMap);
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
