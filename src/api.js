import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';

const  socket = openSocket('http://31.216.165.10:8000');


function subscribe(name,cb) {
  socket.emit('subscribe', name);
  socket.on('getMessage', message => cb(message));
}

function SendMessage(message)
{
  socket.emit('Send', message);
  
}

subscribe.propTypes = {
  cb: PropTypes.func.isRequired
}
function closeConnection () {
  socket.emit('close');
  socket.close();
}

export { subscribe, SendMessage, closeConnection };