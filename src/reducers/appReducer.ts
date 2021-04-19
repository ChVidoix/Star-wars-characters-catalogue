import { AnyAction } from 'redux'
import { REQUEST_CHARACTERS, LOAD_CHARACTERS, LOAD_fILMS, LOAD_fAIL, characterType, filmType } from '../actions/appActionTypes'

interface appState {
    characters: characterType[],
    films: filmType[],
    isLoading: boolean,
    error: boolean
}

const initialState = {
    characters: [],
    films: [],
    isLoading: true,
    error: false
}

const appReducer = (state: appState = initialState, action: AnyAction): appState => {
    switch (action.type) {
        case REQUEST_CHARACTERS: {
            return { ...state, isLoading: true }
        }
        case LOAD_CHARACTERS: {
            return { ...state, isLoading: false, characters: [...state.characters, ...action.payload] }
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