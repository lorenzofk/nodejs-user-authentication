/**
 * Main file that manages the application
 *
 * @author Lorenzo Kniss
*/

const config     = require("config");
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

if (! config.get("private-key")) {
    console.error("Error: The private key is not defined.");
    process.exit(1);
}

// App routes
var userRoute = require('./routes/user.route');

const app = express();
const env = process.env;
const port = env.PORT || 3000;
const mongoDbConnection = config.get("mongo-db-uri") + env.DATABASE_NAME;

// MongoDB connection
mongoose.connect(mongoDbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Sets the middleware to parse responses
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Sets the routes
app.use('/users/', userRoute);

app.use('*', function (req, res) {
    res.status(404).send();
});

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = {
    server: server,
    app: app
};