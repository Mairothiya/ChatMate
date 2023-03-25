const socket =io();
const chatForm = document.getElementById('chat-form');
const chatMessages =document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


//Get username and room from url
const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true 
});

//join chtroom
socket.emit('joinRoom',{ username, room });

//get room and users
socket.on('roomUsers', ({ room,users}) =>{
    outputRoomName(room);
});


//message from server
socket.on('message',message =>{
    outputMessage(message);
    //auto-scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
}); 

//message submission

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get message
    const msg = e.target.elements.msg.value;
    //emit message
    socket.emit('chatMessage',msg);   
    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

//output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');

    div.innerHTML = `<p class="meta">${message.username} 
    <span>${message.time}</span></p>
    <p class="text">  ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div); 
}

//outputRoomName..add roomName to DOM
function outputRoomName(room){
    roomName.innerText = room;
}

    

