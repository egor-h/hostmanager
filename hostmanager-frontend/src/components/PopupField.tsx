import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

type DialogProps = {
    open: boolean;
    title: string;
    body: string;
    onYes: (query: string) => void;
    onNo: () => void;
}

export default function PopupDialog(props: DialogProps) {
    let { open, title, body, onYes, onNo } = props;

    const [fieldValue, setFieldValue] = React.useState<string>('');

    const handleYes = () => {
        onYes(fieldValue);
        setFieldValue('');
    }

    const handleNo = () => {
        onNo();
        setFieldValue('');
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
                    <form onSubmit={(e) => {e.preventDefault(); handleYes(); }} noValidate autoComplete="off">
                        <TextField value={fieldValue} onChange={(e: any) => {setFieldValue(e.target.value)}}/>
                    </form>
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
