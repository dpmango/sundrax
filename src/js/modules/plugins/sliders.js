//////////
// SLIDERS
//////////
(function($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: [],
      responsiveSwipers: {
        featuredProducts: {
          instance: undefined,
          disableOn: 1201,
        },
      },
    },
    init: function() {
      this.initSwipers();
      // this.initResponsiveSwipers();
      // this.listenResize();
    },
    listenResize: function() {
      _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    },
    initSwipers: function() {
      // ARTICLE SWIPER
      var articleSwiperSelector = '[js-swiper-article-slider]';
      var articleSwiperThumbsSelector = '[js-swiper-article-slider-thumbs]';

      var articleSwiper = new Swiper(articleSwiperSelector, {
        wrapperClass: 'swiper-wrapper',
        slideClass: 'swiper-slide',
        loop: true,
        loopAdditionalSlides: 2,
        spaceBetween: 0,
        slidesPerView: 1,
        normalizeSlideIndex: true,
      });
      // ARTICLE SWIPER THUMBS
      var articleThumbsSwiper = new Swiper(articleSwiperThumbsSelector, {
        wrapperClass: 'swiper-wrapper',
        slideClass: 'swiper-slide',
        loop: true,
        spaceBetween: 24,
        slidesPerView: 3,
        normalizeSlideIndex: true,
        slideToClickedSlide: true,
      });
      if ($(articleSwiperSelector).length && $(articleSwiperThumbsSelector).length) {
        articleSwiper.controller.control = articleThumbsSwiper;
        articleThumbsSwiper.controller.control = articleSwiper;
      }
    },

    initResponsiveSwipers: function() {
      var featuredProducts = '[js-featured-products-swiper]';
      if ($(featuredProducts).length > 0) {
        this.initFeaturedProductsSwiper(featuredProducts);
      }
    },
    initFeaturedProductsSwiper: function(selector) {
      var dataObj = this.data.responsiveSwipers.featuredProducts;

      if ($(selector).length > 0) {
        if (window.innerWidth >= dataObj.disableOn) {
          if (dataObj.instance !== undefined) {
            dataObj.instance.destroy(true, true);
            dataObj.instance = undefined;
          }
        } else {
          if (dataObj.instance === undefined) {
            dataObj.instance = new Swiper(selector, {
              slidesPerView: 'auto',
              breakpoints: {
                992: {
                  spaceBetween: 0,
                },
              },
            });
          }
        }
      }
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
