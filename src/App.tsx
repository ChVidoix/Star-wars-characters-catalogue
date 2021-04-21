import React, { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { rootStore } from "./store/store";
import { getCharacters, getFilms } from "./actions/appActions";
import { appState } from "./reducers/appReducer";
import { v4 as uuidv4 } from "uuid";
import Character from "./components/Character";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  makeStyles,
  Paper,
  ThemeProvider,
  createMuiTheme,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import MainWrapper from "./styled/MainWrapper";
import CharacterDetails from "./components/CharacterDetails";
import { calculateAge } from "./utils";
import Error from "./components/Error";

const useStyles = makeStyles({
  root: {
    width: "90%",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    margin: "auto",
    height: "80vh",
  },
  container: {
    height: "100%",
    borderRadius: "15px",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-track-piece:start": {
      background: "transparent",
      marginTop: "15px",
    },
    "&::-webkit-scrollbar-track-piece:end": {
      background: "transparent",
      marginBottom: "15px",
    },
  },
  header: {
    textAlign: "center",
    color: "white",
    padding: "2vh",
  },
  loader: {
    marginTop: "5vh",
  },
});

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const classes = useStyles();

  const dispatch: Dispatch<any> = useDispatch();
  const observer: React.MutableRefObject<any> = useRef();
  const charactersState: appState = useSelector(
    (state: rootStore) => state.app
  );
  const {
    characters,
    charactersCount,
    films,
    isLoading,
    error,
    selectedCharacter,
    modalOpened,
  } = charactersState;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { name, birth_year, height } = selectedCharacter;
  const selectedFilms = selectedCharacter.films;
  const lastCharacterRef: any = useCallback(
    (node: Element) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(getCharacters(page));
          setHasMore(page * 10 < charactersCount);
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const loadData: (isReload: boolean) => void = (isReload) => {
    if (isReload) setPage(1);
    dispatch(getCharacters(page));
    dispatch(getFilms());
  };

  useEffect(() => {
    loadData(false);
    setPage((prev) => prev + 1);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MainWrapper>
        <Typography variant="h2" className={classes.header}>
          Star Wars Catalogue
        </Typography>
        {error ? (
          <Error reload={loadData} />
        ) : (
          <Paper className={classes.root}>
            {characters && (
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Name</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Birth Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {characters.map((character, index) => (
                      <Character
                        key={uuidv4()}
                        ref={
                          index + 1 === characters.length
                            ? lastCharacterRef
                            : undefined
                        }
                        name={character.name}
                        gender={character.gender}
                        birth_year={character.birth_year}
                        height={+character.height}
                        characterFilms={character.films}
                        films={films}
                      />
                    ))}
                  </TableBody>
                </Table>
                {isLoading && <CircularProgress className={classes.loader} />}
                {!hasMore && <Divider variant="fullWidth" />}
              </TableContainer>
            )}
          </Paper>
        )}
      </MainWrapper>
      <CharacterDetails
        name={name}
        age={calculateAge(birth_year)}
        height={+height}
        films={selectedFilms}
        open={modalOpened}
      />
    </ThemeProvider>
  );
};

export default App;
