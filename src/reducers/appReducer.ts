import { AnyAction } from 'redux'
import { REQUEST_CHARACTERS, LOAD_CHARACTERS, LOAD_fILMS, LOAD_fAIL, characterType, filmType } from '../actions/appActionTypes'

export interface appState {
    characters: characterType[],
    films: filmType[],
    charactersCount: number,
    isLoading: boolean,
    error: boolean
}

const initialState = {
    characters: [],
    films: [],
    charactersCount: 0,
    isLoading: true,
    error: false
}

const appReducer = (state: appState = initialState, action: AnyAction): appState => {
    switch (action.type) {
        case REQUEST_CHARACTERS: {
            return { ...state, isLoading: true }
        }
        case LOAD_CHARACTERS: {
            return { ...state, isLoading: false, charactersCount: action.payload.count, characters: [...state.characters, ...action.payload.results] }
        }
        case LOAD_fILMS: {
            return { ...state, films: [...state.films, ...action.payload] }
        }
        case LOAD_fAIL: {
            return { ...state, isLoading: false, error: true }
        }
        default:
            return state
    }
}

export default appReducer