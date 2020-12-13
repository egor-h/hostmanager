import React from 'react'
import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

export default class MenuColumn extends React.Component {

    render() {
        return (<Container>
                    <Link to="/">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Link>
                    <Link to="/objects">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Link>
                    <Link to="/map">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Link>
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