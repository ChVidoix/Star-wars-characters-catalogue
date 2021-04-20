import React, { useRef, useState, useCallback, useEffect, ForwardedRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { rootStore } from './store/store'
import { getCharacters, getFilms } from './actions/appActions'
import { appState } from './reducers/appReducer'
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Character from './components/Character';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow } from '@material-ui/core'

const App: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch()
  const observer: React.MutableRefObject<any> = useRef()
  const charactersState: appState = useSelector((state: rootStore) => state.app)
  const { characters, films, isLoading, error, charactersCount } = charactersState
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const lastCharacterRef: any = useCallback((node: Element) => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(getCharacters(page))
        setHasMore(page * 10 < charactersCount)
        setPage(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoading, hasMore])

  useEffect(() => {
    dispatch(getCharacters(page))
    setPage(prev => prev + 1)
  }, [])

  return (

    <div className="App">
      {characters && (
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
                {characters.map((character, index) => (
                  <Character
                    key={uuidv4()}
                    ref={index + 1 === characters.length ? lastCharacterRef : undefined}
                    name={character.name}
                    gender={character.gender}
                    birth_year={character.birth_year}
                    height={+character.height}
                    films={character.films}
                  />)
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </div>)}
      <div>
        {isLoading && <p>Loading...</p>}
      </div>
      <div>
        {!hasMore && <p>Nothing to load</p>}
      </div>
    </div>
  );
}

export default App;
