import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { rootStore } from './store/store'
import { getCharacters, getFilms } from './actions/appActions'

const App: React.FC = () => {

  const dispatch = useDispatch()
  const charactersState = useSelector((state: rootStore) => state.app)
  const [page, setPage] = useState(1)

  const handleGetButton = () => {
    dispatch(getCharacters(page))
    dispatch(getFilms())
    setPage(page + 1)
  }

  return (
    <div className="App">
      <div>
        <button onClick={handleGetButton}>Get Characters</button>
      </div>
      {charactersState.characters && (
        <div>
          {charactersState.characters.map(character => <p key={character.name}>name: {character.name}</p>
          )}
        </div>)}
    </div>
  );
}

export default App;
