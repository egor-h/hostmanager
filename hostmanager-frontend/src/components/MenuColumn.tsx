import React from 'react'
import { Container } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import ComputerIcon from '@material-ui/icons/Computer'
import ExploreIcon from '@material-ui/icons/Explore'
import NoteIcon from '@material-ui/icons/Note'
import SettingsIcon from '@material-ui/icons/Settings'
// import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom'

export default class MenuColumn extends React.Component {
  render () {
    return (<Container>
      <Link to="/">
        <IconButton aria-label="delete">
          <HomeIcon />
        </IconButton>
      </Link>
      <Link to="/objects">
        <IconButton aria-label="delete">
          <ComputerIcon />
        </IconButton>
      </Link>
      <Link to="/map">
        <IconButton aria-label="delete">
          <ExploreIcon />
        </IconButton>
      </Link>
      <Link to="/notes">
        <IconButton aria-label="delete">
          <NoteIcon />
        </IconButton>
      </Link>
      <Link to="/settings">
        <IconButton aria-label="delete">
          <SettingsIcon />
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
