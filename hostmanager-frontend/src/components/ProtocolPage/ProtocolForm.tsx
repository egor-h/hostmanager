import { Box, Button, TextField, Tooltip, Typography, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { Protocol } from '../../models/host';

const styles = (theme: any) => ({
    // root: {
    //   display: 'flex',
    //   flexWrap: 'wrap'
    // },
    margin: {
        margin: theme.spacing(1),
    },

    textField: {
        width: '25ch'
    }
});

type FormProps = {
    protocol: Protocol;
    onSubmit: (protocol: Protocol) => void;
    onDelete?: (protocolId: number) => void;
    classes: any;
    showDeleteButton: boolean;
    title: string;
}

type FormState = {
    id: number;
    name: string;
    executionLine: string;
    launchType: string;
    validationRegex: string;
    expectedExitCode: number;
}

const LAUNCH_TYPES = ["JUST_RUN", "VALIDATE_EXITCODE", "VALIDATE_OUTPUT", "PRINT_OUTPUT", "INTERNAL"]

class ProtocolForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        let id = -1;
        let name = '';
        let executionLine = '';
        let launchType = '';
        let validationRegex = '';
        let expectedExitCode = 0;

        if (this.props.protocol) {
            id = this.props.protocol.id;
            name = this.props.protocol.name;
            executionLine = this.props.protocol.executionLine;
            launchType = this.props.protocol.launchType;
            validationRegex = this.props.protocol.validationRegex;
            expectedExitCode = this.props.protocol.expectedExitCode;

        }

        this.state = {
            id: id,
            name: name,
            executionLine: executionLine,
            launchType: launchType,
            validationRegex: validationRegex,
            expectedExitCode: expectedExitCode
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleExecutionLineChange = this.handleExecutionLineChange.bind(this);
        this.handleLaunchTypeChange = this.handleLaunchTypeChange.bind(this);
        this.handleValidationRegexChange = this.handleValidationRegexChange.bind(this);
        this.handleExpectedExitCode = this.handleExpectedExitCode.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
    }

    handleNameChange(e: any) {
        let name = e.target.value;
        this.setState(() => ({ name }));
    }

    handleExecutionLineChange(e: any) {
        let line = e.target.value;
        this.setState(() => ({ executionLine: line }));
    }

    handleLaunchTypeChange(e: any, value: string | null) {
        let launchType = value ? value : 'JUST_RUN';
        this.setState(() => ({ launchType }));
    }

    handleValidationRegexChange(e: any) {
        let validationRegex = e.target.value;
        this.setState(() => ({ validationRegex }));
    }

    handleExpectedExitCode(e: any) {
        let expectedExitCode = +e.target.value;
        this.setState(() => ({ expectedExitCode }));
    }

    handleDeleteButton(e: any) {
        e.preventDefault();
        this.props.onDelete && this.props.onDelete(this.state.id);
    }

    handleSubmitButton(e: any) {
        e.preventDefault();
        this.props.onSubmit(this.state as Protocol)
    }

    render() {
        let { classes } = this.props;

        return (<Box display="flex" alignItems="stretch" flexShrink={0} flexWrap="wrap" style={{ padding: '20px' }}>
            <Typography variant="h4" component="h4" style={{ flexBasis: '100%' }}>{this.props.title}</Typography>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmitButton} >
                <TextField
                    style={{ display: 'flex', flexBasis: '100%' }}
                    className={classes.margin}
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    required
                    size="small"
                    id="standard-required"
                    label="Name" />
                <Tooltip title="Use template keywords to access host metadata" enterDelay={300} leaveDelay={500}>
                    <TextField
                        style={{ display: 'flex', flexBasis: '100%' }}
                        className={classes.margin}
                        value={this.state.executionLine}
                        onChange={this.handleExecutionLineChange}
                        required
                        size="small"
                        id="standard-required"
                        label="Execution line" />
                </Tooltip>
                {this.state.launchType === "VALIDATE_OUTPUT" ? <TextField
                    style={{ display: 'flex', flexBasis: '100%' }}
                    className={classes.margin}
                    value={this.state.validationRegex}
                    onChange={this.handleValidationRegexChange}
                    required
                    size="small"
                    id="standard-required"
                    label="Validation regex" /> : ''
                }
                {this.state.launchType === "VALIDATE_EXITCODE" ? <TextField
                    style={{ display: 'flex', flexBasis: '100%' }}
                    type="number"
                    className={classes.margin}
                    value={this.state.expectedExitCode}
                    onChange={this.handleExpectedExitCode}
                    required
                    size="small"
                    id="standard-required"
                    label="Expected exit code" /> : ''
                }
                <Autocomplete
                    id="combo-box-demo"
                    options={LAUNCH_TYPES}
                    // onChange={this.handleLaunchTypeChange}
                    style={{ width: 300 }}
                    value={this.state.launchType}
                    onInputChange={this.handleLaunchTypeChange}
                    renderInput={(params) => <TextField {...params} label="Protocol launch type" variant="outlined" />}
                />
                <Button style={{ margin: '10px' }} type="submit" variant="contained">Save</Button>
                {this.props.showDeleteButton ? <Button style={{ margin: '10px' }} color="secondary" variant="contained" onClick={this.handleDeleteButton}>Delete</Button> : ''}
            </form>
        </Box>)
    }
}

export default withStyles(styles, { withTheme: true })(ProtocolForm);