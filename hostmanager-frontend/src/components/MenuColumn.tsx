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
import { WithTranslation, withTranslation } from 'react-i18next'

class MenuColumn extends React.Component<WithTranslation> {

  constructor(props: WithTranslation) {
    super(props);
  }

  render() {
    const { t } = this.props;

    return (<Container>
      <Link to="/">
        <Tooltip title={t("menu_column_home_page")} placement="right">
          <IconButton aria-label="home">
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/objects">
        <Tooltip title={t("menu_column_objects")} placement="right">
          <IconButton aria-label="objects">
            <ComputerIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/search">
        <Tooltip title={t("menu_column_search")} placement="right">
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Link>
      {/* <Link to="/map">
        <Tooltip title={t("menu_column_map")} placement="right">
          <IconButton aria-label="map">
            <ExploreIcon />
          </IconButton>
        </Tooltip>
      </Link> */}
      <Link to="/notes">
        <Tooltip title={t("menu_column_notes")} placement="right">
          <IconButton aria-label="notes">
            <NoteIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/protocols">
        <Tooltip title={t("menu_column_protocols")} placement="right">
          <IconButton aria-label="protocol">
            <ReceiptIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/tags">
        <Tooltip title={t("menu_column_tags")} placement="right">
          <IconButton aria-label="tags">
            <LocalOfferIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/stats">
        <Tooltip title={t("menu_column_stats")} placement="right">
          <IconButton aria-label="stats">
            <BarChartIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/settings">
        <Tooltip title={t("menu_column_settings")} placement="right">
          <IconButton aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </Container>)
  }

}

export default withTranslation()(MenuColumn);