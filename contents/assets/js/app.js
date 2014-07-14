define(['jquery', 'domReady', 'tweenlite', 'easing', 'easeljs', 'cover', 'feeds'], function ($, domReady, tweenlite, easing, easeljs, cover, feeds) {
  domReady(function () {

    if ($('.frame').length){
      cover.init( $('.frame') );
    }

    if ($('.instagram, .twitter').length){
      feeds.init( );
    }



  });
});