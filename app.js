var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var http = require("http");
var mongoose = require('mongoose'); 
var db = mongoose.connection;
var host = "127.0.0.1";
var port = 1337;
var toshow = "<html><body><ul>";
var grmnda = "";


var urlschema = new mongoose.Schema({
    number:String,
    url:String
});
var url = mongoose.model('url', urlschema);

mongoose.connect('mongodb://localhost/flickrapi');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.post('/save', function(req, res){
    url.remove({}, function(err) { 
        console.log('collection removed') 
    });
    for(var i = 0; i<5; ++i){
        var item = req.body.items[i].media.m;
        var towrite = new url({
            number:i,
            url:item
        });
        towrite.save(function(err, data) {
            if (err) return console.error(err);
        });
    }
});
app.use('/recently', function(req, res){

    var query = url.find();

    query.where('url');
    query.limit(5);

    query.exec(function (err, docs) {
        var toshow = '';
        for (var i = 0; i < 5; i++) {
            toshow += "<li><img src=\"" + docs[i].url +  "\" /></li>";
        };
        res.send(toshow);
    });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;




app.listen(port, host, function(){
    console.log("Listening " + host + ":" + port);
});