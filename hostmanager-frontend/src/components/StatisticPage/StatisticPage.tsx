import { Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { statBySubnet } from '../../api/stat';
import { AppState } from '../../state/reducers';
import { StatState } from '../../state/reducers/stat';
import CircleLoading from '../CircleLoading';
import { RadialChart, Hint } from 'react-vis';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Skeleton } from '@material-ui/lab';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type StatProps = {
  fetchStats: () => void;
  stats: StatState;
} & WithTranslation & RouteComponentProps;

type StatStatae = {
  value: any;
  showHint: boolean;
  selected: any;
  showInTable: boolean;
}

class StatisticPage extends React.PureComponent<StatProps, StatStatae> {
  constructor(props: StatProps) {
    super(props);
    this.state = {
      value: {},
      showHint: false,
      selected: "",
      showInTable: false
    }
  }

  componentDidMount() {
    if (this.props.stats.data.bySubnet.length == 0) {
      this.props.fetchStats();
    }
  }

  render() {
    const { t } = this.props;
    let subnets = this.props.stats.data.bySubnet
      .sort((a, b) => b.hosts - a.hosts)
      .map(s => ({ label: s.network, angle: s.hosts }))
    return (
      <Box width="50vw">
        <Typography variant="h4">
          <Tooltip title={t("stats_subnet_refresh_tooltip")} placement="right">
            <IconButton onClick={() => this.props.fetchStats()} aria-label="stats">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        {t("stats_subnet_chart_header")}
      </Typography>
        {(this.props.stats.loading) ? (<Skeleton animation="wave" variant="circle" height={300} width={300} />) :
          (<RadialChart
            onValueMouseOver={(e) => {
              this.setState({ value: e, showHint: true });
            }}
            onValueMouseOut={(e) => { this.setState({ showHint: false }) }}
            onValueClick={(e) => { this.setState({ selected: e.label, showInTable: true }) }}
            showLabels={false}
            data={subnets}
            padAngle={0.04}
            radius={150}
            innerRadius={100}
            width={300} height={300}>
          </RadialChart>
          )}
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>{t(("stats_subnet_table_subnet"))}</TableCell>
                <TableCell align="right">{t(("stats_subnet_table_hosts"))}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(this.props.stats.loading) ? (([1, 2, 3, 4, 5]).map(n => (
                <TableRow key={n}>
                  <TableCell component="th" scope="row">
                    <Skeleton animation="wave"></Skeleton>
                  </TableCell>
                  <TableCell align="right"><Skeleton animation="wave"></Skeleton></TableCell>
                </TableRow>)))
                : (
                  this.props.stats.data.bySubnet.sort((a, b) => b.hosts - a.hosts).map((row) => (
                    <TableRow hover selected={this.state.showInTable && row.network === this.state.selected} key={row.network}>
                      <TableCell component="th" scope="row" onClick={() => this.props.history.push(`/stats/intervals/${row.network}`)}>
                        {row.network}
                      </TableCell>
                      <TableCell align="right" onClick={() => this.props.history.push(`/stats/intervals/${row.network}`)}>{row.hosts}</TableCell>
                    </TableRow>
                  ))
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>);
  }
}

const mapStateToPorps = (state: AppState) => ({
  stats: state.stat
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchStats: bindActionCreators(statBySubnet, dispatch)
})

export default withTranslation()(connect(mapStateToPorps, mapDispatchToProps)(withRouter(StatisticPage)));