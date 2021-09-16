import { Box, FormControl, FormControlLabel, FormGroup, Switch, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from 'react-router-dom';
import HostDirForm from "./HostDirForm";
import HostForm from './HostForm';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { ProtocolState } from '../../state/reducers/protocols';
import { TagState } from '../../state/reducers/tags';
import { useDispatch, useSelector } from 'react-redux';
import { findHostById } from "../../util/tree";
import { Host } from "../../models/host";
import { createObject, fetchTree } from "../../api/tree";
import { AppState } from "../../state/reducers";

type ParamTypes = {
    parentId: string;
}


export default (): any => {
    let { parentId } = useParams<ParamTypes>();
    let dispatch = useDispatch();
    let tree = useSelector((state: {hostsBrowser: {tree: TreeState}}) => state.hostsBrowser.tree)
    let tags = useSelector((state: {tags: TagState}) => state.tags);
    let protocols = useSelector((state: {protocols: ProtocolState}) => state.protocols);
    let settings = useSelector((state: AppState) => state.local.settings);  

    let [isDir, setDir] = React.useState<boolean>(false);

    let parentObject = findHostById(tree.tree, +parentId)

    const saveEntity = (parentId:number, host: Host) => {
        dispatch(createObject(parentId, {
            name: host.name, 
            address: host.address,
            port: host.port,
            enabled: host.enabled,
            dir: host.dir,
            tags: host.tags.map(t => t.name),
            protocols: host.protocols
        }, () => {dispatch(fetchTree(settings.rootNode));}));
    }

    return (<Box display="flex" alignItems="stretch" maxWidth="" flexWrap="wrap">
        <div style={{display: 'flex'}}>
            <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="top"
                        control={<Switch checked={isDir} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setDir(e.target.checked)}} color="primary" />}
                        label="Directory"
                        labelPlacement="start"
                    />
                </FormGroup>
            </FormControl>
        </div>
        <div style={{display: 'flex'}}>
        {
            isDir ? 
            (<HostDirForm 
                title={`Create new dir in ${parentObject?.name}`}
                host={{id: -1, parentId: -2, address: '  ', chld: [], dir: true, enabled: true, name: '', protocols: [], tags: []}}
                tags={tags.data}
                onSubmit={(host: Host) => {saveEntity(+parentId, host)}} />)
            : (<HostForm 
                title={`Create new host in ${parentObject?.name}`} 
                tags={tags.data} 
                protocols={protocols.data} 
                host={{id: -1, parentId: -2, address: '', chld: [], dir: false, enabled: true, name: '', protocols: [], tags: []}} 
                onSubmit={(host: Host) => {saveEntity(+parentId, host)}} />) 
        }
        </div>
    </Box>);
}