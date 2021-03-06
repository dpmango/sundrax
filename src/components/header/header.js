//////////
// HEADER
//////////
(function($, APP) {
  APP.Components.Header = {
    data: {
      header: {
        container: undefined,
        bottomPoint: undefined,
      },
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        this.getHeaderParams();
        this.hamburgerClickListener();
        this.searchClickListener();
        this.mnavClickListener();
        this.listenScroll();
        this.listenResize();
        this.menuHover();
      }

      this.setMenuClass();
      this.controlHeaderClass();
    },
    getHeaderParams: function() {
      var $header = $('.header');
      var headerOffsetTop = 0;
      var headerHeight = $header.outerHeight() + headerOffsetTop;

      this.data.header = {
        container: $header,
        bottomPoint: headerHeight,
      };
    },
    closeMobileMenu: function(isOnload) {
      $('[js-hamburger]').removeClass('is-active');
      $('.header').removeClass('is-menu-open');
      $('.mobile-navi').removeClass('is-active');

      APP.Plugins.ScrollBlock.blockScroll(isOnload);
    },
    hamburgerClickListener: function() {
      _document.on('click', '[js-hamburger]', function() {
        $(this).toggleClass('is-active');
        $('.header').toggleClass('is-menu-open');
        $('.mobile-navi').toggleClass('is-active');

        APP.Plugins.ScrollBlock.blockScroll();
      });
    },
    searchClickListener: function() {
      var $searchForm = $('[js-header-search]');

      _document
        .on('click', '[js-header-search] button', function(e) {
          if (window.innerWidth <= 1080) {
            if (!$searchForm.is('.is-open')) {
              e.preventDefault();
              e.stopPropagation();
              $searchForm.addClass('is-open');
            }

            // if need redirect instead
            // var dataHref = $searchForm.data('target');
            // if (dataHref && dataHref !== '#') {
            //   e.preventDefault();
            //   e.stopPropagation();
            //   Barba.Pjax.goTo(dataHref);
            // }
          }
        })
        .on('click', function(e) {
          if ($(e.target).closest('[js-header-search]').length === 0) {
            $searchForm.removeClass('is-open');
          }
        });
    },
    mnavClickListener: function() {
      _document.on('click', '[js-mobile-nav] li a', function(e) {
        var $nav = $('[js-mobile-nav]');

        if (window.innerWidth <= 568) {
          var $li = $(this).closest('li');
          console.log($li.is('.is-open'));
          if ($li.is('.is-open')) {
          } else {
            e.preventDefault();
            e.stopPropagation();
            // cleanup
            $nav.find('li').removeClass('is-open');
            $nav
              .find('li')
              .find('ul')
              .slideUp();

            // add active
            $li.addClass('is-open');
            $li.find('ul').slideDown();
          }
        }
      });
    },
    listenScroll: function() {
      _window.on('scroll', this.scrollHeader.bind(this));
    },
    listenResize: function() {
      _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    },
    menuHover: function() {
      var $menuLi = $('.header__menu > li').filter(function(index, el) {
        return $(el).find('ul').length > 0;
      });

      $menuLi.on('mouseenter', function() {
        var $li = $(this);
        if (!$li.is('.is-active')) {
          $('.header__menu > li.is-active').addClass('is-sibling-hovered');
        }
      });

      $menuLi.on('mouseleave', function() {
        var $li = $(this);
        if (!$li.is('.is-active')) {
          $('.header__menu > li.is-active').removeClass('is-sibling-hovered');
        }
      });
    },
    scrollHeader: function() {
      if (this.data.header.container !== undefined) {
        var fixedClass = 'is-fixed';
        var visibleClass = 'is-fixed-visible';

        // get scroll params from blocker function
        var scroll = APP.Plugins.ScrollBlock.getData();

        if (scroll.blocked) return;

        if (scroll.y > this.data.header.bottomPoint) {
          this.data.header.container.addClass(fixedClass);

          if (scroll.y > this.data.header.bottomPoint * 2 && scroll.direction === 'up') {
            this.data.header.container.addClass(visibleClass);
          } else {
            this.data.header.container.removeClass(visibleClass);
          }
        } else {
          // emulate position absolute by giving negative transform on initial scroll
          var normalized = Math.floor(normalize(scroll.y, this.data.header.bottomPoint, 0, 0, 100));
          var reverseNormalized = (100 - normalized) * -1;
          reverseNormalized = reverseNormalized * 1.2; // a bit faster transition

          this.data.header.container.css({
            transform: 'translate3d(0,' + reverseNormalized + '%,0)',
          });

          this.data.header.container.removeClass(fixedClass);
        }
      }
    },
    setMenuClass: function() {
      // SET ACTIVE CLASS IN HEADER
      var headerMenuList = $('.header__menu li');
      if (headerMenuList.length === 0) return;

      // cleanup
      $('.header__menu > li.is-active').removeClass('is-sibling-hovered');

      headerMenuList.each(function(i, el) {
        if (
          $(el)
            .find('a')
            .attr('href') === window.location.pathname.split('/').pop()
        ) {
          $(el).addClass('is-active');
          // check if parent active
          var $elParentLi = $(el)
            .parent()
            .closest('li');
          if ($elParentLi.length > 0) {
            $elParentLi.addClass('is-active');
          }
        } else {
          $(el).removeClass('is-active');
        }
      });
    },
    controlHeaderClass: function() {
      this.data.header.container.attr('data-modifier', false);

      var $modifierElement = $('.page')
        .last()
        .find('[js-header-class]');

      if ($modifierElement.length > 0) {
        this.data.header.container.attr('data-modifier', $modifierElement.data('class'));
      }
    },
  };
})(jQuery, window.APP);
