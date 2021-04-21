import { AnyAction } from "redux";
import {
  REQUEST_CHARACTERS,
  LOAD_CHARACTERS,
  LOAD_fILMS,
  LOAD_fAIL,
  OPEN_MODAL,
  CLOSE_MODAL,
  characterType,
  filmType,
} from "../actions/appActionTypes";

export interface appState {
  characters: characterType[];
  films: filmType[];
  charactersCount: number;
  isLoading: boolean;
  error: boolean;
  modalOpened: boolean;
  selectedCharacter: characterType;
}

const initialState = {
  characters: [],
  films: [],
  charactersCount: 0,
  isLoading: true,
  error: false,
  modalOpened: false,
  selectedCharacter: {
    name: "",
    gender: "",
    birth_year: "",
    height: "string",
    films: [],
  },
};

const appReducer = (
  state: appState = initialState,
  action: AnyAction
): appState => {
  switch (action.type) {
    case REQUEST_CHARACTERS: {
      return { ...state, error: false, isLoading: true };
    }
    case LOAD_CHARACTERS: {
      return {
        ...state,
        isLoading: false,
        charactersCount: action.payload.count,
        characters: [...state.characters, ...action.payload.results],
      };
    }
    case LOAD_fILMS: {
      return { ...state, films: [...state.films, ...action.payload] };
    }
    case LOAD_fAIL: {
      return { ...state, isLoading: false, error: true };
    }
    case OPEN_MODAL: {
      return { ...state, modalOpened: true, selectedCharacter: action.payload };
    }
    case CLOSE_MODAL: {
      return { ...state, modalOpened: false };
    }
    default:
      return state;
  }
};

export default appReducer;
