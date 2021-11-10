import io, { Socket } from 'socket.io-client';
import { FormEvent, useEffect, useState, ChangeEvent, useRef } from 'react';
import { EVENTS } from './constants/EVENTS';
import { useDispatch } from 'react-redux';
import { ActionType } from './state/action-types';
import { useTypedSelector } from './hooks/use-typed-selector';

const socket: Socket = io({ path: '/socket.io' });

function App() {
  const [socketId, setSocketId] = useState('');
  const [teamName, setTeamName] = useState('');
  const dispatch = useDispatch();
  const teamNameRef = useRef<HTMLInputElement | null>(null);
  const { myTeam, teams, myClicks} = useTypedSelector(state => state.teams);

  console.log(myTeam, teams, myClicks);

  const handleJoinTeam = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkTeamName = teams.find(value => value.name === teamName.trim());
    if(!checkTeamName) {
      socket.emit(EVENTS.joinTeam, teamName);
    }
    else {
      alert('Team\'s name already exist');
      setTeamName('');
      if(!teamNameRef.current) return;
      teamNameRef.current.focus();
    }
  }

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  }

  const handleClickUser = () => {
    // socket.emit(EVENTS.clickTeam, myTeam);
    dispatch({
      type: ActionType.CLICK_USER, 
      payload: {
        myClicks: 10,
      }
    })
  }

  socket.on(EVENTS.getStats, (teams) => {
    dispatch({
      type: ActionType.GET_STATS,
      payload: {
        teams: teams
      }
    })
  })

  useEffect(() => {
    socket.on(EVENTS.connection, (id) => {
      setSocketId(id.id);
    });
  });

  return (
      <div>
        {socketId && socketId}
        <button onClick={handleClickUser}>Click</button>
        <form onSubmit={handleJoinTeam}>
          <input onChange={handleNameInput} type="text" value={teamName} ref={teamNameRef}/>
          <button type="submit">Join Team</button>
        </form>
      </div>
  );
}

export default App;
