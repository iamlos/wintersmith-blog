/**
 *   Front Cover
 */
define([], function(){
  return {
    el: {},
    text: $('.intro-text'),
    init: function(el){

      this.el = el;

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
      var windowHeight = window.innerHeight;
      this.el.height(windowHeight);
    },
    verticalCenter: function(){
      var windowHeight = window.innerHeight;
      var contentHeight = this.text.find('.inner').innerHeight();
      var topMargin = Math.round(( windowHeight - contentHeight ) / 2);
      this.text.find('.inner').css('margin-top', topMargin);
    },

    canvasDraw: function(){
      var stage;
      var circles;
      var offsetX, offsetY;
      var colors = ['#b4909b', '#fff35c', '#fc5887', '#37a5c7', '#1589ac'];

      function init() {
          initStages();
          initCircles();
          animate();


          $('.frame').css('opacity', 1);
          $('.overlay').css('opacity', 0.7);


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

      init();


    }

  };

});




