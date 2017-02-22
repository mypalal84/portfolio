'use strict';

(function(module) {
  const skillsController = {};

  // function that hides all main section elements, and then reveals just the #skills section:
  skillsController.init = function() {
    $('.tab-content').hide();
    $('#skills').show();
  };

  module.skillsController = skillsController;
})(window);
