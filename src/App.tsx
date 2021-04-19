import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootStore } from './store/store'
import { getCharacters, getFilms } from './actions/appActions'
import { appState } from './reducers/appReducer'
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Character from './components/Character';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow } from '@material-ui/core'


const App: React.FC = () => {

  const dispatch = useDispatch()
  const charactersState: appState = useSelector((state: rootStore) => state.app)
  const [page, setPage] = useState(1)

  const handleGetButton = () => { // just for testing
    dispatch(getCharacters(page))
    dispatch(getFilms())
    setPage(page + 1)
  }

  return (

    <div className="App">
      {charactersState.characters && (
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Birth Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {charactersState.characters.map(character => (
                  <Character
                    key={uuidv4()}
                    name={character.name}
                    gender={character.gender}
                    birth_year={character.birth_year}
                    height={+character.height}
                    films={character.films}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>)}
      <div>
        {charactersState.isLoading ? <p>Loading...</p> : <button onClick={handleGetButton}>Get Characters</button>}
      </div>
    </div>
  );
}

export default App;
