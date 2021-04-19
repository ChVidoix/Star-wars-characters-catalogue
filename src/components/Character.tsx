import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'

interface propTypes {
    name: string,
    gender: string,
    birth_year: string,
    height: number,
    films: string[]
}

const handleClick = (name: string) => {
    console.log(name);
}

const Character: React.FC<propTypes> = ({ name, gender, birth_year, height, films }) => {
    return (
        <TableRow onClick={() => handleClick(name)}>
            <TableCell>{name}</TableCell>
            <TableCell>{gender !== "n/a" ? gender : "unknown"}</TableCell>
            <TableCell>{birth_year}</TableCell>
        </TableRow>
    )
}
export default Character
