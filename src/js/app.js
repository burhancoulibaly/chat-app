var socket = io.connect();
var $chatBox = $('#chat-box');
var $userBox = $('#user-box');
var chatBoxes = 1;

function textAreaSubmit(){
  var $textArea = document.getElementById('message-box').value;
  socket.emit('send message', $textArea);
  document.getElementById('message-box').value = '';
}

$(".userForm").submit(function(e) {
  e.preventDefault();

  $username = $('#username').val();
  if($username != ''){
    console.log($username);
    socket.emit('new user', $username, (data)=>{
      $(".userFormArea").addClass('display-none');
      $("#chat-app").removeClass('display-none');
      $("#chat-app").addClass('chat-app');
      $('.username').val('');
    })
  }
});

function submit(){
  $(".userForm").submit(function(e) {
    e.preventDefault();

    $username = $('#username').val();
    if($username != ''){
      console.log($username);
      socket.emit('new user', $username, (data)=>{
        $(".userFormArea").addClass('display-none');
        $("#chat-app").removeClass('display-none');
        $("#chat-app").addClass('chat-app');
        $('.username').val('');
      })
    }
  });
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
