'use strict';

(function (module){
  const articleView = {};

  articleView.populateFilters = function() {
    $('article').each(function() {
      if (!$(this).hasClass('template')) {
        var val = $(this).find('address a').text();
        var optionTag = `<option value="${val}">${val}</option>`;

        if ($(`#author-filter option[value="${val}"]`).length === 0) {
          $('#author-filter').append(optionTag);
        }

        val = $(this).attr('data-category');
        optionTag = `<option value="${val}">${val}</option>`;
        if ($(`#category-filter option[value="${val}"]`).length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };


  articleView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
      if ($(this).val()) {
        // If the select box changes to an option that has a value, hide all of the articles and fade in only the articles that match based on on the author that was selected.
        $('article').hide();
        $('article[data-author="' + $(this).val() + '"]').fadeIn(1000);
      } else {
        // Show all the articles except the template
        $('article').fadeIn(1000);
        $('article.template').hide();
      }
      $('#category-filter').val('');
    });
  };

  articleView.handleCategoryFilter = function() {
    // Handle change events on the #author-filter and #category-filter element.
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn(1000);
      } else {
        $('article').fadeIn(1000);
        $('article.template').hide();
      }
      $('#author-filter').val(''); //reset author filter
    });
  };


  // articleView.handleMainNav = function () {
  //   $('.main-nav').on('click', '.tab', function() {
  // //Hide all of the .tab-content sections
  // //Fade in the single .tab-content section that is
  // //associated with the .tab element's data-content attribute.
  //     $('.tab-content').hide();
  //     $('#' + $(this).data('content')).fadeIn(1000);
  //   });
  //   $('.main-nav .tab:first').click();
  // };

  articleView.setTeasers = function() {
    //show only first two elements within the article body.
    $('.article-body *:nth-of-type(n+2)').hide();
    //Delegated event handler to reveal the remaining paragraphs.
    $('#articles').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn(100);
      $(this).hide();
    });
  };

  // articleView.initIndexPage = () => {
  //   $('#ajax-spinner').fadeOut();
  //   $('#filters').fadeIn();
  //   Article.all.forEach(article => {
  //     $('#articles').append(article.toHtml('#article-template'));
  //     if($(`#category-filter option:contains("${article.category}")`).length === 0) {
  //       $('#category-filter').append(article.toHtml('#category-filter-template'));
  //     }
  //     if($(`#author-filter option:contains("${article.author}")`).length === 0) {
  //       $('#author-filter').append(article.toHtml('#author-filter-template'));
  //     }
  //   });
  articleView.initIndexPage = function() {
    Article.all.forEach(function(a) {
      $('#articles').append(a.toHtml())
    });

    //Invoke all of the methods
    articleView.populateFilters();
    articleView.handleAuthorFilter();
    articleView.handleCategoryFilter();
    // articleView.handleMainNav();
    articleView.setTeasers();
  };

  Article.fetchAll(articleView.initIndexPage);

  module.articleView = articleView;
})(window)
