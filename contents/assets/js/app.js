define(['jquery', 'domReady', 'cover', 'tweenlite', 'easing', 'easeljs'], function ($, domReady, cover, tweenlite, easing, easeljs) {
  domReady(function () {

    if ($('.frame').length){
      cover.init( $('.frame') );
    }



  });
});