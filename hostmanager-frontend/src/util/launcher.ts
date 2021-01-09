import { exec, ExecException } from 'child_process';
import format from 'string-format';
import { Host, Protocol } from "../models/host";
import { setProtocolResult } from "../state/actions/local";
import { LocalState } from "../state/reducers/localState";

export const PROTO_INFO_TTL = 60; // seconds

export const executeProtocolThunk = (host: Host, protocol: Protocol) => {
    return (dispatch: any, getState: (() => {local: LocalState})) => {
        let formatted = format(protocol.executionLine, host);
        _execute(formatted, (err, stderr, stdout) => {
            
            let exitCode: number = err?.code === undefined ? 0 : err.code;
            let filteredResults = getState().local.protocolResults.filter(pr => pr.hostId !== host.id);
            let newlyCreatedResult = {
                hostId: host.id,
                protocol: protocol,
                createdAt: unixTimestamp(new Date()),
                stdout: stdout,
                stderr: stderr,
                exitCode: exitCode
            }
            dispatch(setProtocolResult([...filteredResults, newlyCreatedResult]));
        })
    }
}

export const unixTimestamp = (date: Date): number => {
    return (Date.parse(date.toString()) / 1000) | 0;
}

export const cleanOldResultsThunk = () => {
    return (dispatch: any, getState: (() => {local: LocalState})) => {
        const now = unixTimestamp(new Date());
        let results = getState().local.protocolResults;
        dispatch(setProtocolResult(results.filter(res => (now - res.createdAt) < PROTO_INFO_TTL)));
    }
}

const _execute = (executeLine: string, callback: (err: null | ExecException , stderr: string, stdout: string) => void) => {
    console.log(executeLine);
    exec(executeLine, (err, stderr, stdout) => {
        console.log(err);
        console.log(stderr);
        console.log(stdout);
        callback(err, stderr, stdout);
    })
}