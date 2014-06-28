require.config({
  baseUrl: '/',
  paths: {

    // Bower Components
    jquery: 'assets/bower_components/jquery/dist/jquery.min',
    tweenlite: 'assets/bower_components/greensock/src/minified/TweenLite.min',
    easing: 'assets/bower_components/greensock/src/minified/easing/EasePack.min',
    easeljs: 'assets/bower_components/easeljs/lib/easeljs-0.7.1.min',

    // Modules
    app: 'assets/js/app',
    domReady: 'assets/js/modules/domReady',
    cover: 'assets/js/modules/cover'

  }
  // shim: {

  // },

});

require([
  'jquery',
  'domReady',
  'app'
]);