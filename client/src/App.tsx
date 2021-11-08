import io, { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { EVENTS } from './constants/EVENTS';

const socket: Socket = io({ path: '/socket.io' });

function App() {
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    socket.on(EVENTS.connection, (id) => {
      setSocketId(id.id);
    });
  })

  return (
    <div>
      {socketId && socketId}
    </div>
  );
}

export default App;
