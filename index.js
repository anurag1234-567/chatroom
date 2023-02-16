const express = require('express');
const socketio = require('socket.io');
const app=express();

app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

const server=app.listen(3000,()=>{
    console.log('server running!');
})

const io= socketio(server);
let users={};

io.on('connection',(socket)=>{
    socket.on('user-joined',(name)=>{
      users[socket.id]=name;
      socket.broadcast.emit('user-joined',name);
    });

    socket.on('disconnect',()=>{
        var name=users[socket.id];
        socket.broadcast.emit('user-left',name);
    });

    socket.on('message',(ob)=>{
       socket.broadcast.emit('message',ob);
    });
    
})