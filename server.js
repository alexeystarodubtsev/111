const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribe', (name) => {
    console.log(client.conn.remoteAddress + ' в сети');
    client.broadcast.emit('getMessage', {message : "Опа, кто-то новенький зашел", receiver : 'other'} );
    client.on('Send', (message) => 
    {
      client.broadcast.emit('getMessage', message)
    });
    client.on('close', () =>
    {
      console.log(client.conn.remoteAddress + ' вышел');
      client.disconnect();
    }
    
    )
  })
  
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);