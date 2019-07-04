//////////
// MASKS
//////////
(function($, APP) {
  APP.Plugins.Masks = {
    init: function() {
      $('[js-dateMask]').mask('99.99.99');
      $("input[type='tel']").mask('+7 (000) 000-0000');
    },
  };
})(jQuery, window.APP);
