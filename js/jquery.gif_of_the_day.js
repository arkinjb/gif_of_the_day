// gifOfTheDay: a jQuery plugin

// Using an IIFE, see: http://gregfranko.com/blog/jquery-best-practices
(function(window, document, $) {

  $.fn.gifOfTheDay = function(options){
    var self = this;

    // Use options with default options.
    //   see: http://learn.jquery.com/plugins/basic-plugin-creation/
    var settings = $.extend({
        // These are the defaults.
        category: "funny+cat",
        apiKey: "dc6zaTOxFJmzC" // Note: this is the *public beta* key.  Pass your personal key.
    }, options );

    var giphy_url = "http://api.giphy.com/v1/gifs/search?limit=1&rating=pg&q=" + settings.category + "&api_key=" + settings.apiKey;
    $.getJSON( giphy_url).then(function(giphy_results){
      var imageUrl = parseImageFromGiphy(giphy_results, 0); // we only requested one (limit=1)
      appendImageTag(self, imageUrl, settings.category);
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
