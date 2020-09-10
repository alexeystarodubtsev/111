const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribe', (name) => {
    console.log(name + ' в сети');
    client.emit('getMessage', 'Привет, ' + name);
    client.on('Send', (message) => 
    {
      client.emit('getMessage', message)
    });
  })
  
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);