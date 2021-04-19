export const REQUEST_CHARACTERS = "REQUEST_CHARACTERS"
export const LOAD_CHARACTERS = "LOAD_CHARACTERS"
export const LOAD_fILMS = "LOAD_fILMS"
export const LOAD_fAIL = "LOAD_fAIL"

export type characterType = {
    name: string,
    gender: string,
    birth_year: string,
    height: string,
    films: string[]
}

export type filmType = {
    title: string
}

export interface requestCharacters {
    type: typeof REQUEST_CHARACTERS
}

export interface loadCharacters {
    type: typeof LOAD_CHARACTERS
    payload: characterType[]
}

export interface loadFilms {
    type: typeof LOAD_fILMS
    payload: filmType[]
}

export interface loadFail {
    type: typeof LOAD_fAIL
}

export type dispatchTypes = requestCharacters | loadCharacters | loadFilms | loadFail