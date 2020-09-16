var http = require('http');
var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))



/*
 ** ROUTER 
 */

var Users = require("./routes/Users")

app.use("/users", Users)

var Articles = require("./routes/Articles")

app.use("/articles", Articles)



/*
** SERVER
*/

// returns a valid port
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.SERVER_PORT);
app.set('port', port);


// find errors and handle them appropriately
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);
server.on('error', errorHandler);


// event listener
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);