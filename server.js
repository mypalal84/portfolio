'use strict'

// Require Express and instantiate the app
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Include all of the static resources as an argument to app.use()
app.use(express.static('./public'));

// Write a new route that will handle a request and send the new.html file back to the user
app.get('/new', function(request, response) {
  response.sendFile('public/new.html', {root: '.'});
});

// Using the response object, send the index.html file back to the user
app.get('*', function(request, response) {
  response.sendFile('index.html', {root: './public'});
});

app.listen(PORT, function() {
    // Log to the console a message that lets you know which port your server has started on
  console.log('app is running on localhost:3000');
});
