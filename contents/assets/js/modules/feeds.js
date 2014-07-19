/**
 *   Front Cover
 */
define([], function(){
  return {

    init: function(){

      this.getFeeds();

    },
    getFeeds: function(){
      var url = 'http://owns.io/api';
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

    }


  };

});




