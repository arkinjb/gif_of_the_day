// gifOfTheDay: a jQuery plugin

// Using an IIFE, see: http://gregfranko.com/blog/jquery-best-practices
(function(window, document, $) {

  $.fn.gifOfTheDay = function(){
    this.text("The plugin will put the gif here.");
  };

}(window, document, window.jQuery)); // The global window, document, and jQuery objects are passed into the anonymous function
