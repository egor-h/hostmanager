import React from "react";
import { PureComponent } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { subnetIntervals } from "../../api/stat";
import { AppState } from "../../state/reducers";
import { SubnetStats } from "../../state/reducers/subnetStats";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";

type IntervalsProps = {
    subnets: SubnetStats
    fetchSubnets: () => void;
} & RouteComponentProps<{ address: string }>;

type IntervalsState = {

}

const mapStateToProps = (state: AppState) => ({
    subnets: state.subnetStats
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchSubnets: bindActionCreators(subnetIntervals, dispatch)
})

export class Intervals extends PureComponent<IntervalsProps, IntervalsState> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        if (Object.keys(this.props.subnets.data).length === 0) {
            this.props.fetchSubnets();
        }
    }

    render() {
        if (this.props.subnets.loading) {
            return <div>Loading..</div>
        }
        if (this.props.subnets.error) {
            return <div>Error</div>
        }

        let addr = this.props.match.params.address;
        if (!this.props.subnets.data[addr]) {
            return <div>No {addr} network in results</div>
        }

        let networks = this.props.subnets.data[addr];

        return (<TableContainer>
            <Table size="small">
                <TableBody>
                    {
                        networks.map(net => {
                            return (<TableRow style={{backgroundColor: net.empty ? '#c6ffb3' : '#ffc2b3'}}>
                                <TableCell>
                                    {`${net.intervalStart} .. ${net.intervalEnd}`}
                                </TableCell>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Intervals));