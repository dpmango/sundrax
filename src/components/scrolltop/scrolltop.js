//////////
// SCROLLTOP
//////////
(function($, APP) {
  APP.Components.Scrolltop = {
    init: function() {
      this.listenScroll();
      this.listenClicks();
    },
    listenClicks: function() {
      _document.on('click', '[js-scrolltop]', function() {
        TweenLite.to(window, 1, {
          scrollTo: { y: 0, autoKill: false },
          ease: easingSwing,
        });
      });
    },
    listenScroll: function() {
      _window.on('scroll', this.scrollHandler.bind(this));
    },
    scrollHandler: function() {
      var scroll = APP.Plugins.ScrollBlock.getData();

      if (scroll.blocked) return;

      var endOfThePage = _document.height() - _window.height();
      var scrollBpFooter = endOfThePage - $('.footer').outerHeight() + 30;
      var scrollBpBody = scrollBpFooter - 500;

      if (scroll.y > scrollBpBody) {
        $('[js-scrolltop]').addClass('is-visible');
      } else {
        $('[js-scrolltop]').removeClass('is-visible');
      }

      if (scroll.y > scrollBpFooter) {
        $('[js-scrolltop]').addClass('is-white');
      } else {
        $('[js-scrolltop]').removeClass('is-white');
      }
    },
  };
})(jQuery, window.APP);
