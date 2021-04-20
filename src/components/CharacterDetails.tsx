import { Backdrop, createStyles, Fade, Grid, makeStyles, Modal, Paper, Theme, Typography } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React, { Dispatch } from 'react'
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../actions/appActionTypes';
import { v4 as uuidv4 } from 'uuid';
import DetailsModal from '../styled/Modal'

interface propTypes {
    name: string,
    age: string | number,
    height: number,
    films: string[],
    open: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        mainPaper: {
            height: '50vh',
            width: '60vw',
            outline: 'none',
            borderRadius: '15px',
            textAlign: 'center'
        },
        descriptionPaper: {
            background: '#333',
            margin: '0 2vw 2vw 2vw'
        },
        header: {
            marginTop: '4vh',
            marginBottom: '4vh'
        },
        film: {
            marginBottom: '.6vh'
        }
    }),
)

const CharacterDetails: React.FC<propTypes> = ({ name, age, height, films, open }) => {

    const classes: ClassNameMap<any> = useStyles()
    const dispatch: Dispatch<any> = useDispatch()

    const handleClose = () => {
        dispatch({
            type: CLOSE_MODAL
        })
    }

    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className={classes.mainPaper}>
                        <Grid container spacing={2} justify="space-around">
                            <Grid item xs={12}>
                                <Paper className={classes.descriptionPaper}>
                                    <Typography className={classes.header} variant="h3">
                                        {name}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Paper className={classes.descriptionPaper}>
                                            <Typography variant="h5">
                                                Height
                                        </Typography>
                                        </Paper>
                                        <Typography variant="h5">
                                            {`${height} cm`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className={classes.descriptionPaper}>
                                            <Typography variant="h5">
                                                Age
                                        </Typography>
                                        </Paper>
                                        <Typography variant="h5">
                                            {age === 'unknown' ? age : `${age} years`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={12}>
                                        <Paper className={classes.descriptionPaper}>
                                            <Typography variant="h5">
                                                Films
                                            </Typography>
                                        </Paper>
                                        <Grid item xs={12}>
                                            {films.map(title => (
                                                <Typography key={uuidv4()} variant="body1" className={classes.film}>
                                                    {title}
                                                </Typography>

                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    )
}

export default CharacterDetails
