!function(a){var b={Modules:{},init:function(){for(var a in b.Modules)b.Modules.hasOwnProperty(a)&&b.Modules[a].init()}};window.App=b,b.Modules.navigation={init:function(){this.rememberState(),this.events()},openMenu:function(){var b=a("body");localStorage.setItem("navState","open"),b.addClass("transition").removeClass("closed").removeClass("showicons").addClass("open"),setTimeout(function(){b.removeClass("hide-content")},400)},closeMenu:function(){var b=a("body");localStorage.setItem("navState","closed"),b.addClass("transition").addClass("hide-content"),setTimeout(function(){b.removeClass("open").addClass("closed"),setTimeout(function(){b.addClass("showicons")},500)},400)},rememberState:function(){if(Modernizr.localstorage){var b=localStorage.getItem("navState"),c=a("body");null===b&&localStorage.setItem("navState","open"),"open"===b?c.removeClass("closed").removeClass("showicons").addClass("open").removeClass("hide-content"):"closed"===b&&c.addClass("hide-content").removeClass("open").addClass("closed").addClass("showicons")}},events:function(){var b=this;a(document).on("click",".open .activate",function(a){a.preventDefault(),b.closeMenu()}),a(document).on("click",".closed .activate",function(a){a.preventDefault(),b.openMenu()})}},a(b.init)}($);