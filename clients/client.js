const socket = io('http://localhost:8000' , {transports:['websocket']});

const form = document.getElementById('msgsend');
const msginput= document.getElementById('msginput');
const msgcontainer = document.querySelector('.container');

const appendmsg = (message , position) =>{
 const msgelement= document.createElement('div');
 msgelement.innerText = message;
 msgelement.classList.add(position);
 msgcontainer.append(msgelement);
 
}

form.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    const message = msginput.value;
    appendmsg(`You: ${message}` , 'msgright');
    socket.emit('send' , message);
    msginput.value=''; 
});

const username = prompt('Enter your name to join chat','abhi');
socket.emit('new-user-joined', username);

socket.on('user-joined' , username=>{
    appendmsg(`${username} joined the chat` , 'msgleft');
})
socket.on('receive' , data=>{
    appendmsg(`${data.name} : ${data.message}` , 'msgleft');
})
socket.on('left' , name=>{
    appendmsg(`${name} left the chat` , 'msgleft');
})





