//////////
// MASKS
//////////
(function($, APP) {
  APP.Plugins.Masks = {
    init: function() {
      $("input[type='tel']").mask('+7 (000) 000-0000');
    },
  };
})(jQuery, window.APP);
