import { AnyAction } from "redux"
import { Dispatch } from "redux"
import { dispatchTypes, REQUEST_CHARACTERS, LOAD_CHARACTERS, LOAD_fILMS, LOAD_fAIL } from './appActionTypes'
import axios from 'axios'

export const getCharacters = (page: number) => async (dispatch: Dispatch<dispatchTypes>) => {
    try {
        dispatch({
            type: REQUEST_CHARACTERS
        })

        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`)

        dispatch({
            type: LOAD_CHARACTERS,
            payload: response.data.results
        })
    } catch (e) {
        dispatch({
            type: LOAD_fAIL
        })
    }
}

export const getFilms = () => async (dispatch: Dispatch<dispatchTypes>) => {
    try {
        const response = await axios.get(`https://swapi.dev/api/films/`)

        dispatch({
            type: LOAD_fILMS,
            payload: response.data.results
        })
    } catch (e) {
        dispatch({
            type: LOAD_fAIL
        })
    }
}