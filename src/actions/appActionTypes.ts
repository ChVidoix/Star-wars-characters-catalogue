export const REQUEST_CHARACTERS = "REQUEST_CHARACTERS"
export const LOAD_CHARACTERS = "LOAD_CHARACTERS"
export const LOAD_fILMS = "LOAD_fILMS"
export const LOAD_fAIL = "LOAD_fAIL"
export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"

export type characterType = {
    name: string,
    gender: string,
    birth_year: string,
    height: string,
    films: string[],
}

export interface charactersPayload {
    count: number,
    results: characterType[]
}

export type rawFilmType = {
    title: string,
    url: string
}

export type filmType = {
    id: number,
    title: string
}

export interface requestCharacters {
    type: typeof REQUEST_CHARACTERS
}

export interface loadCharacters {
    type: typeof LOAD_CHARACTERS
    payload: charactersPayload
}

export interface loadFilms {
    type: typeof LOAD_fILMS
    payload: filmType[]
}

export interface loadFail {
    type: typeof LOAD_fAIL
}

export interface openModal {
    type: typeof OPEN_MODAL
}

export interface closeModal {
    type: typeof CLOSE_MODAL
}

export type dispatchTypes = requestCharacters | loadCharacters | loadFilms | loadFail | openModal | closeModal