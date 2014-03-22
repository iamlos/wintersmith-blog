(function($) {

	var App = {
		Modules: {},
		init: function () {
 			// here we are looping round all of the modules in our app.Modules object. We could have an exclude array for modules
      // that we don't want to be immediately initialised. We could initialise them later on in our application lifecycle
      for(var x in App.Modules) {
        App.Modules[x].init();
      }
		}
	};
	// expose the App globally
  window.App = App;


	// App.Modules.verticalcenterContainer = {
	// 		windowHeight: $(window).height(),
	// 		containerHeight: $('.container').height(),
	// 		setMargin: function(){
	// 			var obj = this;
	// 			var topMargin = ( obj.windowHeight - obj.containerHeight ) / 2;
	// 			$('.container').css('margin-top', topMargin);
	// 		},
	// 		init: function(){
	// 			this.setMargin();

	// 			//THIS ISN'T WORKING!
	// 			var lazyLayout = _.debounce(this.setMargin, 300);
	// 			$(window).resize(lazyLayout);
	// 		}
	// };






	$(App.init);




}($));