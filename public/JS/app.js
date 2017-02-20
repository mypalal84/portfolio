'use strict';

var articles = [];

function Article(opts) {
  // Save ALL the properties of `opts` into `this`
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function () {
  // Use handlebars to render your articles.
  // Get your template from the DOM.
  // "compile" your template with Handlebars.
  var template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  // passing the body into the marked.js library to format our markdown input!
  this.body = marked(this.body);

  return template(this);
};

projects.sort(function (a, b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projects.forEach(function (articleObject) {
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
