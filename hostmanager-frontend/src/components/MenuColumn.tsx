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
      <Link to="/" tabIndex={-1}>
        <Tooltip title={t("menu_column_home_page")} placement="right">
          <IconButton aria-label="home" tabIndex={0}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/objects" tabIndex={-1}>
        <Tooltip title={t("menu_column_objects")} placement="right">
          <IconButton aria-label="objects" tabIndex={0}>
            <ComputerIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/search" tabIndex={-1}>
        <Tooltip title={t("menu_column_search")} placement="right">
          <IconButton aria-label="search" tabIndex={0}>
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
      <Link to="/notes" tabIndex={-1}>
        <Tooltip title={t("menu_column_notes")} placement="right">
          <IconButton aria-label="notes" tabIndex={0}>
            <NoteIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/protocols" tabIndex={-1}>
        <Tooltip title={t("menu_column_protocols")} placement="right">
          <IconButton aria-label="protocol" tabIndex={0}>
            <ReceiptIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/tags" tabIndex={-1}>
        <Tooltip title={t("menu_column_tags")} placement="right">
          <IconButton aria-label="tags" tabIndex={0}>
            <LocalOfferIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/stats" tabIndex={-1}>
        <Tooltip title={t("menu_column_stats")} placement="right">
          <IconButton aria-label="stats" tabIndex={0}>
            <BarChartIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Link to="/settings" tabIndex={-1}>
        <Tooltip title={t("menu_column_settings")} placement="right">
          <IconButton aria-label="settings" tabIndex={0}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </Container>)
  }

}

export default withTranslation()(MenuColumn);