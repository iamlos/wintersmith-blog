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


scrollJack = true;


  App.Modules.cover = {
    el: $('.frame'),
    text: $('.intro-text'),
    init: function(){
      this.windowSize();
      this.verticalCenter();
      this.canvasDraw();

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
    },

    canvasDraw: function(){
      var stage;
      var circles;
      var offsetX, offsetY;
      var colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];

      function init() {
          initStages();
          initCircles();
          animate();
          $('.frame').css('opacity', 1);

          setTimeout(function(){
            $('.intro-text').css('opacity', 1).find('.inner').addClass('moveup');
          }, 500);


      }

      // Init Canvas
      function initStages() {
          offsetX = (window.innerWidth-600)/2;
          offsetY = (window.innerHeight-300)/2;

          stage = new createjs.Stage("stage");
          stage.canvas.width = window.innerWidth;
          stage.canvas.height = window.innerHeight;
      }




      function initCircles() {
          circles = [];
          for(var i=0; i<50; i++) {
              var circle = new createjs.Shape();
              var r = 200;
              var x = window.innerWidth*Math.random();
              var y = window.innerHeight*Math.random();
              var color = colors[Math.floor(i%colors.length)];
              var alpha = 0.2 + Math.random()*0.5;
              circle.alpha = alpha;
              circle.radius = r;
              circle.graphics.beginFill(color).drawCircle(0, 0, r);
              circle.x = x;
              circle.y = y;
              circles.push(circle);
              stage.addChild(circle);
              circle.movement = 'float';
              tweenCircle(circle);
          }

          $('.peter').on('click', function(event) {
            event.preventDefault();

            for(var i= 0; i < circles.length; i++) {
              tweenCircle(circles[i], 'down');

            }

          });
      }


      // animating circles
      function animate() {
          stage.update();
          requestAnimationFrame(animate);
      }

      function tweenCircle(c, dir) {
          if(c.tween) c.tween.kill();
          if(dir == 'up') {
              c.tween = TweenLite.to(c, 0.4, {x: c.originX, y: c.originY, ease:Quad.easeInOut, alpha: 1, radius: 5, scaleX: 0.4, scaleY: 0.4, onComplete: function() {
                  c.movement = 'jiggle';
                  tweenCircle(c);
              }});
          } else if(dir == 'down') {
              c.tween = TweenLite.to(c, 0.8, {x: window.innerWidth*Math.random(), y: window.innerHeight*Math.random(), ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5, scaleX: 1, scaleY: 1, onComplete: function() {
                  c.movement = 'float';
                  tweenCircle(c);
              }});
          } else {
              if(c.movement == 'float') {
                  c.tween = TweenLite.to(c, 5 + Math.random()*3.5, {x: c.x + -100+Math.random()*200, y: c.y + -100+Math.random()*200, ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5,
                      onComplete: function() {
                          tweenCircle(c);
                      }});
              } else {
                  c.tween = TweenLite.to(c, 0.05, {x: c.originX + Math.random()*3, y: c.originY + Math.random()*3, ease:Quad.easeInOut,
                      onComplete: function() {
                          tweenCircle(c);
                      }});
              }
          }
      }

      window.onload = function() { init() };




      // $(window).on({
      //  'DOMMouseScroll mousewheel': function(e){
      //   if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
      //     for(var i= 0; i < circles.length; i++) {
      //         tweenCircle(circles[i], 'up');
      //     }
      //   }
      //   else {
      //     for(var i= 0; i < circles.length; i++) {
      //         tweenCircle(circles[i], 'down');
      //     }

      //     setTimeout(function(){
      //       scrollJack = false;
      //     }, 1200);

      //   }

      //   if (scrollJack === true ){
      //     return false;
      //   }

      //  }
      // });


    }


  };





  // App.Modules.coverVideo = {
  //   ajaxData: {},
  //   startFrame: $('.frame'),
  //   frameDelta: 0,

  //   init: function(){
  //     var that = this;

  //     var ajaxUrl = '/img/frames/imageset.json';

  //     var frame = this.startFrame;

  //     // ajax success
  //     function ajaxSuccess(data) {
  //       App.Modules.coverVideo.ajaxData = data;


  //       frame.css('opacity', 1);
  //     //  frame.css('background-image', 'url('+data[0].data+')');

  //       setTimeout(function(){
  //         $('.intro-text').css('opacity', 1).find('.inner').addClass('moveup');


  //       }, 500);

  //     }

  //     // ajax fail
  //     function ajaxError() {
  //       console.log('ajax failed');
  //     }


  //     $.ajax({
  //         url: ajaxUrl,
  //         contentType: 'application/json; charset=utf-8',
  //         data: {},
  //         success: ajaxSuccess,
  //         error: ajaxError,
  //         xhr: function(){
  //           var xhr = new window.XMLHttpRequest();

  //           //Download progress
  //           xhr.addEventListener('progress', function(evt){
  //             if (evt.lengthComputable) {
  //               var percentComplete = evt.loaded / evt.total;

  //               //Do something with download progress
  //               var statusbar = Math.ceil(percentComplete * 100);

  //               $('.loading').css('width', statusbar+'%');

  //               if (statusbar === 100){
  //                 setTimeout(function(){
  //                   $('.loading').remove();
  //                 }, 500);
  //               }

  //             }
  //           }, false);
  //           return xhr;
  //         }
  //       });



  //     $(window).on({
  //      // 'DOMMouseScroll mousewheel': that.scrollControl
  //     });

  //   },
  //   scrollControl: function(e){

  //     // --- Scrolling up ---
  //     if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {

  //       console.log('up');
  //       console.log(App.Modules.coverVideo.frameDelta);
  //       if (App.Modules.coverVideo.frameDelta > 0){
  //         App.Modules.coverVideo.frameDelta--;

  //        // App.Modules.coverVideo.playSlide(App.Modules.coverVideo.frameDelta);
  //       }


  //     }

  //     // --- Scrolling down ---
  //     else {
  //       console.log('down');

  //       if(App.Modules.coverVideo.frameDelta < App.Modules.coverVideo.ajaxData.length){
  //         App.Modules.coverVideo.frameDelta++;

  //         //App.Modules.coverVideo.playSlide(App.Modules.coverVideo.frameDelta);
  //       }

  //     }




  //     return false;


  //   },


  // };





  // App.Modules.navigation = {
  //   init: function(){
  //     this.rememberState();
  //     this.events();
  //   },
  //   openMenu: function(){
  //     var body = $('body');
  //     localStorage.setItem('navState', 'open');

  //     body.addClass('transition').removeClass('closed').removeClass('showicons').addClass('open');


  //     setTimeout(function(){
  //       body.removeClass('hide-content');
  //     },400);
  //   },
  //   closeMenu: function(){
  //     var body = $('body');
  //     localStorage.setItem('navState', 'closed');

  //     body.addClass('transition').addClass('hide-content');

  //     setTimeout(function(){
  //       body.removeClass('open').addClass('closed');

  //       setTimeout(function(){
  //         body.addClass('showicons');
  //       },500);

  //     },400);

  //   },
  //   rememberState: function(){
  //     if (Modernizr.localstorage) {
  //       var navState = localStorage.getItem('navState');
  //       var body = $('body');

  //       if (navState === null){
  //         localStorage.setItem('navState', 'open');
  //       }

  //       if (navState === 'open'){
  //         body.removeClass('closed').removeClass('showicons').addClass('open').removeClass('hide-content');

  //       }
  //       else if(navState === 'closed'){
  //         body.addClass('hide-content').removeClass('open').addClass('closed').addClass('showicons');
  //       }


  //     }
  //   },
  //   events: function(){
  //     var that = this;
  //     $(document).on('click', '.open .activate', function(event) {
  //       event.preventDefault();
  //       that.closeMenu();
  //     });

  //     $(document).on('click', '.closed .activate', function(event) {
  //       event.preventDefault();
  //       that.openMenu();
  //     });

  //   }
  // };





  $(App.init);




}($));