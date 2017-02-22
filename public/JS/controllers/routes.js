'use strict';

// Configure routes for this app with page.js, by registering each URL your app can handle,
// linked to a a single controller function to handle it:
page('/', articleController.init);
page('/about', aboutController.init);
page('/skills', skillsController.init);
page();
