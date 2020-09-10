import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';


const  socket = openSocket('http://localhost:8000');


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

export { subscribe, SendMessage };