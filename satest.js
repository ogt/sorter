var test = require('tap').test;
var spawn = require('child_process').spawn;
var request = require('request');

var ps = spawn('node', [ __dirname+'/../index.js' ],{cwd:__dirname+'/..'});
var strData='';
setTimeout(dorequest,5000);
function dorequest(){
    request.post('http://127.0.0.1:8000/cat?args=words.txt&pipes=http%3A%2F%2F127.0.0.1%3A8000%2Fgrep%3Fargs%3D%5Elove&pipes=http%3A%2F%2F127.0.0.1%3A8000%2Fsort%3Fargs%3D-r')
    .on('data', function(data){strData+=data;console.log(data);}).on('end',function(){
        console.log('END OF STREAM '+ strData);
    });
}

