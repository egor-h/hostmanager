import React from 'react'
import { Container, Grid, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default class MenuColumn extends React.Component {

    render() {
        return (<Container>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                </Container>)
    }

    // render() {
    //     return (<Grid>
    //         <Grid xs={1} >
    //             <IconButton aria-label="delete">
    //                 <DeleteIcon />
    //             </IconButton>
    //         </Grid>
    //         <Grid xs={1} >
    //             <IconButton aria-label="delete">
    //                 <DeleteIcon />
    //             </IconButton>
    //         </Grid>
    //         <Grid xs={1} >
    //             <IconButton aria-label="delete">
    //                 <DeleteIcon />
    //             </IconButton>
    //         </Grid>
    //     </Grid>)
    // }
}