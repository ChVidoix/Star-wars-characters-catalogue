import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { rootStore } from './store/store'
import { getCharacters, getFilms } from './actions/appActions'
import { appState } from './reducers/appReducer'
import { v4 as uuidv4 } from 'uuid';
import Character from './components/Character';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, makeStyles, Paper, ThemeProvider, createMuiTheme } from '@material-ui/core'
import MainWrapper from './styled/MainWrapper'

const useStyles = makeStyles({
  root: {
    width: '90%',
    textAlign: 'center',
    borderRadius: 15,
    height: '90vh'
  },
  container: {
    height: '90%',
    borderRadius: 15,
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: '3px'
    },
    '&::-webkit-scrollbar-track-piece:start': {
      background: 'transparent',
      marginTop: '10px'
    }
  }
})

const App: React.FC = () => {

  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  })

  const classes = useStyles()

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
    <ThemeProvider theme={theme}>
      <MainWrapper>
        <Paper className={classes.root}>
          {characters && (

            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Name
                  </TableCell>
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
          )}
          <div>
            {isLoading && <p>Loading...</p>}
          </div>
          <div>
            {!hasMore && <p>Nothing to load</p>}
          </div>
        </Paper>
      </MainWrapper>
    </ThemeProvider>
  );
}

export default App;
