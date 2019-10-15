var socket = io.connect();
var $chatBox = $('#chat-box');
var $userBox = $('#user-box');
var chatBoxes = 1;

function textAreaSubmit(){
  var $textArea = document.getElementById('message-box').value;
  socket.emit('send message', $textArea);
  document.getElementById('message-box').value = '';
}
function userFormSubmit(){
  $username = document.getElementById('username').value;
  if($username != ''){
    console.log($username);
    socket.emit('new user', $username, (data)=>{
      document.getElementById("userFormArea").className = 'display-none';
      document.getElementById("chat-app").className='chat-app';
      document.getElementById('username').value = '';
    })
  }
}

socket.on('get users', function(data){
  document.getElementById('user-box').innerHTML = '';
  for(i = 0; i < data.length; i++){
    $userBox.append('<li class="list-group-item">'+data[i]+'</li>');
    if(typeof $chatBox[0].children[i+chatBoxes] == 'undefined'){
      $chatBox.append('<div class="new-user well"><strong>New User</strong>:'+data[i]+'</div>');
    }
  }
})

socket.on('new message', function(data){
  $chatBox.append('<div class="well"><strong>'+data.user+'</strong>:'+data.msg+'</div>')
  chatBoxes++;
})
