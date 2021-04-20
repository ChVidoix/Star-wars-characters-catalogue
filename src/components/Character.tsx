import React, { Dispatch } from 'react'
import { TableRow, TableCell, RootRef } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch } from 'react-redux';
import { filmType, OPEN_MODAL } from '../actions/appActionTypes';
import { mapFilms } from '../utils'

interface propTypes {
    name: string,
    gender: string,
    birth_year: string,
    height: number,
    characterFilms: string[],
    films: filmType[]
}

const handleClick = (dispatch: Dispatch<any>, name: string, gender: string, birth_year: string, height: number, characterFilms: string[], films: filmType[]) => {

    const filmTitles = mapFilms(characterFilms, films)

    dispatch({
        type: OPEN_MODAL,
        payload: {
            name,
            gender,
            birth_year,
            height,
            films: filmTitles
        }
    })
}

const Character = React.forwardRef((props: propTypes, ref: any) => {

    const dispatch: Dispatch<any> = useDispatch()

    const { name, gender, birth_year, height, characterFilms, films } = props

    return (
        ref
            ?
            <RootRef rootRef={ref}>
                <TableRow onClick={() => handleClick(dispatch, name, gender, birth_year, height, characterFilms, films)}>
                    <TableCell>
                        <AccountCircleIcon />
                    </TableCell>
                    <TableCell>{props.name}</TableCell>
                    <TableCell>{props.gender !== "n/a" ? props.gender : "unknown"}</TableCell>
                    <TableCell>{props.birth_year}</TableCell>
                </TableRow>
            </RootRef>
            : <TableRow onClick={() => handleClick(dispatch, name, gender, birth_year, height, characterFilms, films)}>
                <TableCell size="small">
                    <AccountCircleIcon />
                </TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.gender !== "n/a" ? props.gender : "unknown"}</TableCell>
                <TableCell>{props.birth_year}</TableCell>
            </TableRow>
    )
})

export default Character
