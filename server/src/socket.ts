import { Server, Socket } from 'socket.io';
import { EVENTS } from './constants';

interface TeamsStats {
    name: string;
    clicks: number;
    order: number;
}

const teams: TeamsStats[] = [];

function socket({io}: { io: Server}) {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log(socket.id);
        socket.emit(EVENTS.connection, {id: socket.id});

        //join the team
        socket.on(EVENTS.joinTeam, (teamName) => {
            console.log(teamName);
            const findTeamIndex = teams.find(value => {
                value.name === teamName;
            });
            if(!findTeamIndex) {
                teams.push({
                    name: teamName,
                    clicks: 0,
                    order: teams.length,
                });
                teams.sort((a,b) => {
                    if(a.order < b.order) return -1;
                    else if(a.order > b.order) return 1;
                    return 0;
                });
            }
            io.emit(EVENTS.getStats, teams);
            console.log(teams);
        })

        //click by a team
        socket.on(EVENTS.clickTeam, (teamName) => {
            const teamIndex = teams.findIndex(value => {
                value.name === teamName;
            });
            if(teamIndex === -1) return;
            teams[teamIndex].clicks++;
            io.emit(EVENTS.getStats, teams);
            console.log(teams);
        });
    });
}

export default socket;