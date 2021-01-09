import React from 'react'
import { Container, Tooltip } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import ComputerIcon from '@material-ui/icons/Computer'
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExploreIcon from '@material-ui/icons/Explore'
import NoteIcon from '@material-ui/icons/Note'
import ReceiptIcon from '@material-ui/icons/Receipt';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings'
import { Link } from 'react-router-dom'

export default class MenuColumn extends React.Component {
  render() {
    return (<Container>
      <Link to="/">
        <Tooltip title="Home page" placement="right">
          <IconButton aria-label="home">
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/objects">
        <Tooltip title="Objects" placement="right">
          <IconButton aria-label="objects">
            <ComputerIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/search">
        <Tooltip title="Search" placement="right">
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/map">
        <Tooltip title="Map" placement="right">
          <IconButton aria-label="map">
            <ExploreIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/notes">
        <Tooltip title="Notes" placement="right">
          <IconButton aria-label="notes">
            <NoteIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/protocols">
        <Tooltip title="Protocols" placement="right">
          <IconButton aria-label="protocol">
            <ReceiptIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/tags">
        <Tooltip title="Tags" placement="right">
          <IconButton aria-label="tags">
            <LocalOfferIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/stats">
        <Tooltip title="Statistics" placement="right">
          <IconButton aria-label="stats">
            <BarChartIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/settings">
        <Tooltip title="Settings" placement="right">
          <IconButton aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </Container>)
  }

}
