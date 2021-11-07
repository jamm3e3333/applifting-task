import io, { Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { EVENTS } from './constants/EVENTS';

function App() {
  const socket: Socket = io('http://localhost:4000');
  useEffect(() => {
    socket.on(EVENTS.connection, (id) => {
      console.log(id);
    })
  })

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
