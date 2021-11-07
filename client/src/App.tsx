import io, { Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { EVENTS } from './constants/EVENTS';

function App() {
  const socket: Socket = io({ path: '/socket.io' });
  useEffect(() => {
    socket.on(EVENTS.connection, (id) => {
      console.log(id);
    })
  })

  return (
    <div>
      Ahoj
    </div>
  );
}

export default App;
