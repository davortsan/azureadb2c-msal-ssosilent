const express = require('express'),
    morgan = require('morgan'),
    path = require('path');

const PORT = process.env.PORT || 7000;
const APP_DIR = __dirname + '/app';

//Initialize the express app
const app = express();

app.use(morgan('dev'));

app.use(express.static(APP_DIR));

//Set up route for index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(APP_DIR, '/index.html'));
});

//Start the server
app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});