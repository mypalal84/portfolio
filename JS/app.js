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
  var source = $('#articles-template').html();
  var templateRender = Handlebars.compile(source);
  console.log(templateRender);
  return templateRender(this);
  // Display how old the post was
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
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
