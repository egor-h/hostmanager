import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type DialogProps = {
    open: boolean;
    title: string;
    body: string;
    onYes: () => void;
    onNo: () => void;
}

export default function PopupDialog(props: DialogProps) {
    let { open, title, body, onYes, onNo } = props;

    const handleYes = () => {
        onYes();
    }

    const handleNo = () => {
        onNo();
    }

    return (
        <Dialog
            open={open}
            onClose={handleNo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleYes} color="primary">
                    Yes
                </Button>
                <Button onClick={handleNo} color="primary" autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}
