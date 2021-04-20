import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import RootRef from '@material-ui/core/RootRef'

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

const Character = React.forwardRef((props: propTypes, ref: any) => {
    return (
        ref
            ?
            <RootRef rootRef={ref}>
                <TableRow onClick={() => handleClick(props.name)}>
                    <TableCell>{props.name}</TableCell>
                    <TableCell>{props.gender !== "n/a" ? props.gender : "unknown"}</TableCell>
                    <TableCell>{props.birth_year}</TableCell>
                </TableRow>
            </RootRef>
            : <TableRow onClick={() => handleClick(props.name)}>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.gender !== "n/a" ? props.gender : "unknown"}</TableCell>
                <TableCell>{props.birth_year}</TableCell>
            </TableRow>
    )
})

export default Character
