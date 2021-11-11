import { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionType } from './state/action-types';
import { useTypedSelector } from './hooks/use-typed-selector';



function App() {
  const dispatch = useDispatch();
  const teamNameRef = useRef<HTMLInputElement | null>(null);
  const { myTeam, teams, myClicks} = useTypedSelector(state => state.teams);

  const handleJoinTeam = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
  }


  const handleClickUser = () => {
   
  }


  return (
      <div>
        {myTeam !== '' && <h1>{myTeam}</h1>}
        <button disabled={myTeam === ''} onClick={handleClickUser}>Click</button>
        <form onSubmit={handleJoinTeam}>
          <input type="text" ref={teamNameRef}/>
          <button type="submit">Join Team</button>
        </form>
        {teams.length !== 0 && teams.map(team => {
          return (
            <div key={team.name}>
              <p>{team.name}</p>
              <p>{team.clicks}</p>
              <p>{team.order}</p>
            </div>
          )
        })}
      </div>
  );
}

export default App;
