var webcommand=webcommand||{};

$(function () {
    var branch = 'master';
    $('body').append($('<a href="https://github.com/ogt/webcommand-app/tree/'+branch+'"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub"></a>'));
    $('body').append($('<h3>Unix sort as a web service</h3>'));
    $('body').append($('<a href="https://github.com/ogt/webcommand-app">Check out the project home for details</p>'));
    $('#input').val('boo,*,23\nfoo,*,32\npoo,*,3\ndoo,*,2');
    $('#arguments').val('-t\n,\n-k\n3\n-n\n-r');
    
    //get the commandlist
    webcommand.instructionCount=1;
    $.ajax({
        url: '/getCommands',
    }).done(function (data) {
        console.log(data);
        console.log(JSON.parse(data).sort());
        webcommand.commands=JSON.parse(data).sort();
        if(webcommand.commands.length===1){
            $('#cmd_holder_1').append('<input id="cmd_1" name="cmd_1" class="arguments" type="text" disabled="true" value="'+webcommand.commands[0]+'" >');
        }else{
            var ddl=$('<select input id="cmd_1" name="cmd_1" class="arguments" >');
            for(var i=0;i<webcommand.commands.length;i++){
                ddl.append($('<option></option>').val(webcommand.commands[i]).html(webcommand.commands[i]));
            }
            $('#cmd_holder_1').append(ddl);
        }
    });
});

$('#btnAddPipe').click(function () {
    webcommand.instructionCount++;
    $('#btnAddPipe').parent().parent().before('<tr><td><input id="cmd_'+webcommand.instructionCount+'" class="arguments" type="text" value="sort" ></td></tr>');
    $('#btnAddPipe').parent().parent().before('<tr><td height="10px;">&nbsp;</td></tr>');
    $('#btnAddPipe').parent().parent().before('<tr style="height: 9%"><td><label for="arguments">parameters (1 per line)</label><textarea id="arguments_'+webcommand.instructionCount+'" class="arguments" ></textarea></td></tr>');
    $('#btnAddPipe').parent().parent().before('<tr><td height="10px;">&nbsp;</td></tr>');
    return false;
});

$('#btnSubmit').click(function () {
    //pipes
    var pipes='';
    while( webcommand.instructionCount >1){
        var command =$('#cmd_'+webcommand.instructionCount).val()+'?';
        args=$('#arguments_'+webcommand.instructionCount).val().split('\n');
        pipes='&pipes='+encodeURIComponent(command+args.map(function(a) { return 'args='+a;}).join('&'))+pipes;
        webcommand.instructionCount--; 
    }
        
    //command
    var args = $('#arguments').val().split('\n');
    $.ajax({
        url: '/'+$('#cmd_1').val() + '?' + args.map(function(a) { return 'args='+a;}).join('&')+pipes ,
        type: 'POST',
        data: $('#input').val()
    }).done(function (data) { 
        $('#output').val((data));
    }).fail(function (arg1) { 
        alert(JSON.stringify(arg1));
    });
    return false;
});