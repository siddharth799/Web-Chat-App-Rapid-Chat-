const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput =document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const audio =new Audio('sound.mp3');

const append =(message, position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerHTML =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position==='left'){
    audio.play();
}
}

const append2 =(message, position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerHTML =message;
    messageElement.classList.add('message2');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.play();
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value='';
})
const name =prompt("Enter Your Name to join Chat");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=> {
    append2(`${name} :👀joined the chat`, 'right');
})    

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
}) 
socket.on('left', name => {
    append2(`${name}: left the chat`, 'left');
}) 

