let express = require('express');
let app = express();
let http = require('http');
let server = http.createServer(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');
let port = 3000;

// Using the favicon
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.of('/stream').on('connection', stream);

// Start the server with error handling
server.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is listening at ${port}`);
    }
});
