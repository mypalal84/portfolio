'use strict';

(function(module) {
  const repoView = {};

  // Private methods declared here live only within the scope of the wrapping IIFE.
  const ui = function() {
    let $about = $('#about'); // Best practice: Cache the DOM query if it's used more than once.

    $about.find('.ul').empty();
    // $about.show().siblings().hide();
  };

  // compile new handlebars
  // Save the result in this `render` variable.


  repoView.index = function() {
    ui();
    let render = Handlebars.compile($('#repo-template').text());

    // The jQuery `append` method lets us append an entire array of HTML elements at once:
    $('#about ul').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
