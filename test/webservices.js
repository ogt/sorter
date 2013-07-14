var test = require('tap').test;
var spawn = require('child_process').spawn;
var request = require('request');

var ps;

function setup (t) {
    //ps = spawn('node', [ 'index.js' ],{cwd:'C:\\Users\\Maurits.Maurits-PC\\Documents\\GitHub\\webcommand-app\\'});
    ps = spawn('node', [ __dirname+'/../index.js' ],{cwd:__dirname+'/..', detached:true});
}

function teardown (t) {
    ps.kill('KILL');
}

test(setup);
test( function (t) {
    //t.plan(1);
    var strData='';
    setTimeout(dorequest,10000);//wait for the server to be up
    function dorequest(){
        request.post('http://127.0.0.1:8000/cat?args=words.txt&pipes=http%3A%2F%2F127.0.0.1%3A8000%2Fgrep%3Fargs%3D%5Elove&pipes=http%3A%2F%2F127.0.0.1%3A8000%2Fsort%3Fargs%3D-r')
        .on('data', function(data){strData+=data;console.log(data);}).on('end',function(){
            t.equal('loves\r\nlovers\r\nlover\r\nlovely\r\nlovelorn\r\nloveliness\r\nloveliest\r\nlovelies\r\nlovelier\r\nloved\r\nlove\r\n', strData,'thats an answer');
            t.end();
        });
    }
    

});
//test(teardown);