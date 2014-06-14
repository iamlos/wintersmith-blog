(function($) {

  var App = {
    Modules: {},
    init: function () {
      // here we are looping round all of the modules in our app.Modules object. We could have an exclude array for modules
      // that we don't want to be immediately initialised. We could initialise them later on in our application lifecycle
      for(var x in App.Modules) {
        if (App.Modules.hasOwnProperty(x)) {
          App.Modules[x].init();
        }
      }
    }
  };
  // expose the App globally
  window.App = App;


  App.Modules.cover = {
    el: $('.frame'),
    text: $('.intro-text'),
    init: function(){
      this.windowSize();
      this.verticalCenter();

      var that = this;
      $(window).resize(function() {
        that.windowSize();
        that.verticalCenter();
      });

    },
    windowSize: function(){
      var windowHeight = $(window).innerHeight();
      this.el.height(windowHeight);
    },
    verticalCenter: function(){
      var windowHeight = $(window).innerHeight();
      var contentHeight = this.text.find('.inner').innerHeight();
      var topMargin = Math.round(( windowHeight - contentHeight ) / 2);
      this.text.find('.inner').css('margin-top', topMargin);
    }
  };

  App.Modules.coverVideo = {
    init: function(){

      var ajaxUrl = '/img/frames/imageset.json';
      var frame = $('.frame');

      // ajax success
      function frameInit(data) {

        frame.css('opacity', 1);
        frame.css('background-image', 'url('+data[0].data+')');

        setTimeout(function(){
          $('.intro-text').css('opacity', 1).find('.inner').addClass('moveup');
        }, 500);


        $(window).scroll(function() {
          var st = $(window).scrollTop();

          for(var x in data) {
            if(st == x && st < data.length && st > 0){
              frame.css('background-image', 'url('+data[x].data+')');
            }
          }

        });
      }

      // ajax fail
      function ajaxError() {
        console.log('ajax failed');
      }


      $.ajax({
          url: ajaxUrl,
          contentType: 'application/json; charset=utf-8',
          data: {},
          success: frameInit,
          error: ajaxError,
          xhr: function(){
            var xhr = new window.XMLHttpRequest();

            //Download progress
            xhr.addEventListener('progress', function(evt){
              if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;

                //Do something with download progress
                var statusbar = Math.ceil(percentComplete * 100);

                $('.loading').css('width', statusbar+'%');

                if (statusbar === 100){
                  setTimeout(function(){
                    $('.loading').remove();
                  }, 500);
                }

              }
            }, false);
            return xhr;
          }
        });




    }

  };


  App.Modules.navigation = {
      init: function(){
        this.rememberState();
        this.events();
      },
      openMenu: function(){
        var body = $('body');
        localStorage.setItem('navState', 'open');

        body.addClass('transition').removeClass('closed').removeClass('showicons').addClass('open');


        setTimeout(function(){
          body.removeClass('hide-content');
        },400);
      },
      closeMenu: function(){
        var body = $('body');
        localStorage.setItem('navState', 'closed');

        body.addClass('transition').addClass('hide-content');

        setTimeout(function(){
          body.removeClass('open').addClass('closed');

          setTimeout(function(){
            body.addClass('showicons');
          },500);

        },400);

      },
      rememberState: function(){
        if (Modernizr.localstorage) {
          var navState = localStorage.getItem('navState');
          var body = $('body');

          if (navState === null){
            localStorage.setItem('navState', 'open');
          }

          if (navState === 'open'){
            body.removeClass('closed').removeClass('showicons').addClass('open').removeClass('hide-content');

          }
          else if(navState === 'closed'){
            body.addClass('hide-content').removeClass('open').addClass('closed').addClass('showicons');
          }


        }
      },
      events: function(){
        var that = this;
        $(document).on('click', '.open .activate', function(event) {
          event.preventDefault();
          that.closeMenu();
        });

        $(document).on('click', '.closed .activate', function(event) {
          event.preventDefault();
          that.openMenu();
        });

      }
    };






  $(App.init);




}($));