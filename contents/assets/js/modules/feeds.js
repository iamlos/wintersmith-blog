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
        success: this.ajaxSuccess
      });




    },
    ajaxSuccess: function(data){
      setTimeout(function(){
        $('.loading').remove();
        $('.frame').css('opacity', 1);
        $('.overlay').css('opacity', 0.7);
        setTimeout(function(){
          $('.intro-text').css('opacity', 1).find('.inner').addClass('moveup');
          $('.full-width').css({'opacity': 1, 'height':'2000px'});
        }, 200);
      }, 100);
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
