'use strict';

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


articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
//Hide all of the .tab-content sections
//Fade in the single .tab-content section that is
//associated with the .tab element's data-content attribute.
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn(1000);
  });
  $('.main-nav .tab:first').click();
};

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

articleView.initNewArticlePage = function() {
  $('.tab-content').show();
  // The new articles we create will be copy/pasted into our source data file.
  // Set up "export" functionality. We can hide it for now, and show it once we have data to export.
  $('#export-field').hide();

  $('#article-json').on('focus', function(){
    this.select();
  });
  // Event handler to update the preview and the export field if any inputs change.
  $('#new-form').on('change', articleView.create);
    //need to get articleView.create done before we can do this
};

articleView.create = function() {
  // Var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  var article;
  $('#article-preview').empty();

  // Instantiate an article based on what's in the form fields:
  article = new Article({
    author: $('#article-author').val(),
    authorUrl: $('#article-authorUrl').val(),
    title: $('#article-title').val(),
    category: $('#article-category').val(),
    body: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? new Date() : null
  });
  // Use our interface to the Handblebars template to put this new article into the DOM:
  $('#article-preview').append(article.toHtml());
  // Activate the highlighting of any code blocks:
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  // Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  $('#export-field').show();
  $('#article-json').val(JSON.stringify(article) + ',');
};

articleView.initIndexPage = function() {
  Article.all.forEach(function(a) {
    $('#articles').append(a.toHtml())
  });

  //Invoke all of the methods
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
