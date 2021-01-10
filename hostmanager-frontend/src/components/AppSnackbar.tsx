import React from 'react';
import { LocalState, SnackbarData } from '../state/reducers/localState';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { hideSnackbar, setIntervalId, setSnackbar } from '../state/actions/local'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../state/reducers';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default () => {
    const dispatch = useDispatch();
    const snackbar = useSelector((state: AppState) => state.local.snackbar);
    const hideSnack = (e: React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(hideSnackbar());
    }

    return (<Snackbar open={snackbar.show} autoHideDuration={3000} onClose={hideSnack}>
        <Alert onClose={() => dispatch(hideSnackbar())} severity={snackbar.data.severity}>
            {snackbar.data.message}
        </Alert>
    </Snackbar>);
}