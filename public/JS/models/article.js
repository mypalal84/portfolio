'use strict';
(function(module){
  function Article(opts) {
  // Save ALL the properties of `opts` into `this`
    this.title = opts.title;
    this.category = opts.category;
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.publishedOn = opts.publishedOn;
    this.body = opts.body;
  }

  Article.all = [];

  Article.prototype.toHtml = function () {
    // Use handlebars to render articles.
    // Get template from the DOM.
    // "compile" template with Handlebars.
    let template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
    // passing the body into the marked.js library to format the markdown input!
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = function(projects) {
    projects.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    projects.map(function(ele) {
      Article.all.push(new Article(ele));
    })
  }

  // This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
  Article.fetchAll = function() {
    if (localStorage.projects) {
      console.log('loading from local storage');
      var ajaxCall = $.ajax({
        url: 'DATA/blogarticles.json',
        type: 'HEAD',
        //dataType: 'json'
      })
      .done(function(data, message, xhr) {
        if (JSON.parse(localStorage.getItem('ETag')) !== xhr.getResponseHeader('ETag')) {
          console.log(xhr.getResponseHeader('ETag'));
          localStorage.setItem('ETag', JSON.stringify(xhr.getResponseHeader('ETag')));
          $.getJSON('DATA/blogarticles.json').then(function(data) {
            localStorage.setItem('projects', JSON.stringify(data));
          });
        }
        data = JSON.parse(localStorage.getItem('projects'));
        Article.loadAll(data);
        articleView.initIndexPage();
      });
      // When projects is already in localStorage, we can load it with the .loadAll function above, and then render the index page (using the proper method on the articleView object). Article.loadAll(JSON.parse(localStorage.projects));
    } else {
      console.log('loading from JSON');
      $.getJSON('DATA/blogarticles.json')
      .then(function(data){
        console.log(data);
        localStorage.setItem('projects',JSON.stringify(data));
        Article.loadAll(data);
        articleView.initIndexPage();
      });
      var ajaxCall = $.ajax({
        url: 'DATA/blogarticles.json',
        type: 'HEAD',
        //dataType: 'json'
      })
      .done(function(data, message, xhr) {
        if (JSON.parse(localStorage.getItem('ETag')) !== xhr.getResponseHeader('ETag')) {
          console.log(xhr.getResponseHeader('ETag'));
        }

      // When we don't already have the projects, we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?), cache it in localStorage so we can skip the server call next time, then load all the data into Article.all with the .loadAll function above, and then render the index page.
      });
    }
  }

  Article.truncateTable = callback => {
    $.ajax({
      url: '/articles',
      method: 'DELETE',
    })
    .then(console.log)
    .then(callback);
  };

  Article.prototype.insertRecord = function(callback) {
    $.post('/articles/insert', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
    .then(console.log)
    .then(callback);
  };

  Article.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
    .then(console.log)
    .then(callback);
  };

  Article.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        authorUrl: this.authorUrl,
        body: this.body,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title}
    })
    .then(console.log)
    .then(callback);
  };
module.Article = Article;
})(window);
