'use strict';

(function(module) {
  const repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // fetch the repos. Callback.
    $.ajax({
      url: 'https://api.github.com/user/repos',
      method: 'GET',
      headers: {
        Authorization: githubToken
      }
    }).then(
      data => {
        data.forEach(repo => {
          repos.all.push(repo);
        });
        callback();
      },
      err => {
        console.error('Status code:', err.status);
      })
  };

  // Model method that filters the full collection for repos with a particular attribute.
  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(window);
