var app = require('webcommand-express')(require('./commands'));

var port = process.env.PORT || 8000;

app.get('/', function(req,res) {
    res.sendfile('index.html');
});

app.listen(port);
console.log('Listening on port: '+port);
