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
  var $newArticle = $('article.template').clone().removeClass('template');

  $newArticle.attr('data-category', this.category);
  $newArticle.attr('data-author', this.author);

//   $newArticle.find('.byline a').text(this.author);
//   $newArticle.find('.byline a').attr('href', this.authorUrl);
//   $newArticle.find('h1:first').text(this.title);
//   $newArticle.find('.article-body').html(this.body);
//   $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
//   $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
//   $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
//   return $newArticle;
// };
  $newArticle.find('h1').html(this.title);
  $newArticle.find('section').html(this.category);
  $newArticle.find('a').html(this.author);
  $newArticle.find('header a').attr('href', this.authorUrl);
  $newArticle.find('section.article-body').html(this.body);

  // Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
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
