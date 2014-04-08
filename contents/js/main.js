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
        console.log('loaded events');
        $(document).on('click', '.open .activate', function(event) {
          event.preventDefault();
          that.closeMenu();
          console.log('click event close');
        });

        $(document).on('click', '.closed .activate', function(event) {
          event.preventDefault();
          that.openMenu();
          console.log('click event open');
        });

      }
    };






  $(App.init);




}($));