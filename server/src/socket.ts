import { Server, Socket } from 'socket.io';
import { EVENTS } from './constants';

interface TeamsStats {
    name: string;
    clicks: number;
    order: number;
}

const teams: TeamsStats[] = [];

function socket({io}: { io: Server}) {
    //socket connection
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log(socket.id);
        socket.emit(EVENTS.connection, {id: socket.id});
        io.emit(EVENTS.getStats, teams);

        //join the team
        socket.on(EVENTS.joinTeam, (teamName) => {
            const findTeam = teams.find(value => {
                value.name === teamName;
            });
            if(findTeam) return;
            if(!findTeam) {
                teams.push({
                    name: teamName,
                    clicks: 0,
                    order: teams.length + 1,
                });
                teams.sort((a,b) => {
                    if(a.order < b.order) return -1;
                    else if(a.order > b.order) return 1;
                    return 0;
                });
            }
            io.emit(EVENTS.getStats, teams);
        })

        //click by a team
        socket.on(EVENTS.clickTeam, (teamName) => {
            const teamIndex = teams.findIndex(value => {
                return value.name === teamName;
            });
            if(teamIndex === -1) return;
            teams[teamIndex].clicks = teams[teamIndex].clicks + 1;
            io.emit(EVENTS.getStats, teams);
        });
    });
}

export default socket;