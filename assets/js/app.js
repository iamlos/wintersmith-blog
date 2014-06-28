define(['jquery', 'domReady', 'tweenlite', 'easing', 'easeljs', 'cover'], function ($, domReady, tweenlite, easing, easeljs, cover) {
  domReady(function () {

    if ($('.frame').length){
      cover.init( $('.frame') );
    }



  });
});