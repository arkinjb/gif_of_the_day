// gifOfTheDay: a jQuery plugin

// Using an IIFE, see: http://gregfranko.com/blog/jquery-best-practices
(function(window, document, $) {

  $.fn.gifOfTheDay = function(){
    var self = this;
    var category = "funny+cat";
    var apiKey = "dc6zaTOxFJmzC"; // Note: this is the *public beta* key.  Use env var for personal keys.
    var giphyUrl = "http://api.giphy.com/v1/gifs/search?limit=1&rating=pg&q=" + category + "&api_key=" + apiKey;
    $.getJSON( giphyUrl).then(function(giphyResults){
      var imageUrl = parseImageFromGiphy(giphyResults, 0); // we only requested one (limit=1)
      appendImageTag(self, imageUrl, category);
    });

    return this; // for jQuery chaining
  };

  function parseImageFromGiphy(giphyResults, imageIndex) {
    var imageData = giphyResults.data[imageIndex];
    var imageUrl = imageData.images.fixed_height.url; // because `.url` was https
    return imageUrl;
  }

  function appendImageTag(container, imageUrl, category){
    var $imageTag = $("<img>");
    $imageTag.attr('src', imageUrl).attr('alt', category); //note: chaining!
    $(container).append($imageTag);
  }

}(window, document, window.jQuery)); // The global window, document, and jQuery objects are passed into the anonymous function
