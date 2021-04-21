import { Dispatch } from "redux";
import {
  dispatchTypes,
  REQUEST_CHARACTERS,
  LOAD_CHARACTERS,
  LOAD_fILMS,
  LOAD_fAIL,
  charactersPayload,
  filmType,
  rawFilmType,
} from "./appActionTypes";
import axios from "axios";

export const getCharacters = (pageNum: number) => async (
  dispatch: Dispatch<dispatchTypes>
) => {
  try {
    dispatch({
      type: REQUEST_CHARACTERS,
    });

    await axios({
      method: "GET",
      url: `https://swapi.dev/api/people/?page=${pageNum}`,
    }).then((response) => {
      const data: charactersPayload = {
        count: response.data.count,
        results: response.data.results,
      };

      dispatch({
        type: LOAD_CHARACTERS,
        payload: data,
      });
    });
  } catch (e) {
    dispatch({
      type: LOAD_fAIL,
    });
  }
};

export const getFilms = () => async (dispatch: Dispatch<dispatchTypes>) => {
  try {
    await axios({
      method: "GET",
      url: `https://swapi.dev/api/films/`,
    }).then((response) => {
      const films: filmType[] = [];
      response.data.results.forEach((film: rawFilmType) => {
        const id = +film.url.split("/")[5];

        films.push({
          id,
          title: film.title,
        });
      });
      dispatch({
        type: LOAD_fILMS,
        payload: films,
      });
    });
  } catch (e) {
    dispatch({
      type: LOAD_fAIL,
    });
  }
};
