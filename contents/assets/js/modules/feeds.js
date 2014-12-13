/**
 *   Feeds
 */
define([], function(){
  return {

    init: function(){
      var self = this;
      this.getFeeds();
      this.setHeights();

      $(window).resize(function(event) {
        self.setHeights();
      });

    },

    getFeeds: function(){
      //var self = this;
      var url = 'http://23.239.7.50/api';
      $.ajax({
           url: url,
           contentType: 'application/json; charset=utf-8',
           data: {},
           success: this.ajaxSuccess,

           xhr: function(){
             var xhr = new window.XMLHttpRequest();

             //Download progress
             xhr.addEventListener('progress', function(evt){


               if (evt.lengthComputable) {
                 var percentComplete = evt.loaded / evt.total;

                 // Do something with download progress
                 var statusbar = Math.ceil(percentComplete * 100);

                 $('.loading').css('width', statusbar + '%');

                 if (statusbar === 100){

                   setTimeout(function(){
                     $('.loading').remove();
                     $('.frame').css('opacity', 1);
                     $('.overlay').css('opacity', 0.7);
                      setTimeout(function(){
                        $('.intro-text').css('opacity', 1).find('.inner').addClass('moveup');
                        $('.full-width').css({'opacity': 1, 'height':'2000px'});
                      }, 500);
                   }, 500);
                 }

               }
             }, false);
             return xhr;
           }
         });




    },
    ajaxSuccess: function(data){
      for (var key in data) {
        if (data.hasOwnProperty(key)) {

          for (var i in data[key].instagram) {
            $('.instagram').eq(i).css('background-image', 'url('+data[key].instagram[i].image+')');
          }

          for (var i in data[key].twitter) {
            $('.twitter').eq(i).find('.tweet').append(data[key].twitter[i].tweet);
          }

        }
      }

    },

    setHeights: function(){
      var squareH = $('.square').innerWidth();

      $('.square, .rectangle').each(function() {
        $(this).css('height', squareH);
      });

      $('.square-small').each(function() {
        $(this).css('height', squareH/2);
      });





      // get the width of a square.. that's the basis of height
      // height of rectangles same.. height of small squares is half
      // add the heights of each row to get full height
    }


  };

});




