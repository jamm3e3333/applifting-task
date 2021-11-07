import { Server, Socket } from 'socket.io';
import { EVENTS } from './constants';



function socket({io}: { io: Server}) {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log(socket.id);
        socket.emit(EVENTS.connection, {id: socket.id});
    })
}

export default socket;