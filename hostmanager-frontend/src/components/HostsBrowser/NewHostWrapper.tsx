import { Box, FormControl, FormControlLabel, FormGroup, Switch, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from 'react-router-dom';
import HostDirForm from "./HostDirForm";
import HostForm from './HostForm';

type ParamTypes = {
    parentId: string;
}


export default (): any => {
    let { parentId } = useParams<ParamTypes>();
    return (<Box display="flex" flexWrap="wrap" style={{ padding: '20px' }}>
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="top"
                    control={<Switch color="primary" />}
                    label="Directory"
                    labelPlacement="start"
                />
            </FormGroup>
        </FormControl>
        {
            true ? (<HostForm hostState={{
                name: {
                    value: '',
                    onChange: ((e: any) => {})
                },
                address: {
                    value: '',
                    onChange: ((e: any) => {})
                }
            }} title={"NewHost"} id={parentId} />) 
            : (<HostDirForm title={"NewDir"} id={parentId}></HostDirForm>)
        }
    </Box>);
}