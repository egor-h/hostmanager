import { exec, ExecException } from 'child_process';
import format from 'string-format';
import { Host, Protocol } from "../models/host";
import { setAllProtocolResults, setOneProtocolResult, setProtocolResult } from "../state/actions/local";
import { LocalState, ProtocolResult, ProtocolResultMapByHostId } from "../state/reducers/localState";
import { ipcRenderer } from 'electron';
import { useDispatch } from 'react-redux';

export const PROTO_INFO_TTL = 60; // seconds


export const executeProtocolsThunk = (hosts: Host[], protocol: Protocol) => {
    return (dispatch: any, getState: (() => {local: LocalState})) => {
        ipcRenderer.send('async-execute-all', {hosts: hosts, protocol: protocol})
    }
}

export const executeProtocolThunk = (host: Host, protocol: Protocol) => {
    return (dispatch: any, getState: (() => {local: LocalState})) => {
        // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

        ipcRenderer.send('async-execute', {host: host, protocol: protocol});
        // let formatted = format(protocol.executionLine, host);
        // _execute(formatted, (err, stderr, stdout) => {
            
        //     let exitCode: number = err?.code === undefined ? 0 : err.code;
        //     // let filteredResults = getState().local.protocolResults.filter(pr => pr.hostId !== host.id);
        //     let newlyCreatedResult = {
        //         hostId: host.id,
        //         protocol: protocol,
        //         createdAt: unixTimestamp(new Date()),
        //         stdout: stdout,
        //         stderr: stderr,
        //         exitCode: exitCode
        //     }
        //     dispatch(setOneProtocolResult(newlyCreatedResult));
        // })
    }
}

export const unixTimestamp = (date: Date): number => {
    return (Date.parse(date.toString()) / 1000) | 0;
}

export const cleanOldResultsThunk = () => {
    return (dispatch: any, getState: (() => {local: LocalState})) => {
        const now = unixTimestamp(new Date());
        let resultObject: ProtocolResultMapByHostId = {};
        let results = getState().local.protocolResults;
        Object.entries(results).forEach(([hostId, launchTypeToProto]) => {
            Object.entries(launchTypeToProto).forEach(([launchType, protocolResult]) => {
                if ((now - (protocolResult as ProtocolResult).createdAt) < PROTO_INFO_TTL) {
                    resultObject = {...resultObject, [hostId]: {[launchType]: protocolResult}};
                }
            })
        });
        dispatch(setAllProtocolResults(resultObject));
    }
}

export const _execute = (executeLine: string, callback: (err: null | ExecException , stderr: string, stdout: string) => void) => {
    console.log(executeLine);
    exec(executeLine, (err, stderr, stdout) => {
        // console.log(err);
        // console.log(stderr);
        // console.log(stdout);
        callback(err, stderr, stdout);
    })
}