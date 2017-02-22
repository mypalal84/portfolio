(function() {
  const newArticle = {};

  newArticle.initNewArticlePage = function() {
    $('.tab-content').show();
  // The new articles we create will be copy/pasted into our source data file.
  // Set up "export" functionality. We can hide it for now, and show it once we have data to export.
    $('#export-field').hide();

    $('#article-json').on('focus', function(){
      this.select();
    });
  // Event handler to update the preview and the export field if any inputs change.
    $('#new-form').on('change', newArticle.create);
    //need to get newArticle.create done before we can do this
  };

  newArticle.create = function() {
  // Var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
    var article;
    $('#article-preview').empty();

  // Instantiate an article based on what's in the form fields:
    let newArticle = new Article({
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
    $('#article-json').val(JSON.stringify(newArticle) + ',');
  };

  newArticle.initNewArticlePage();
})();
