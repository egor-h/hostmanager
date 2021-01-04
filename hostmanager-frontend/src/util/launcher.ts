import { Host, Protocol } from "../models/host";
import { spawn } from 'child_process';
import { protocols } from "../state/actions/protocols";
import format from 'string-format';

export const executeProtocol = (host: Host, protocol: Protocol) => {
    console.log('executeProtocol');
    executeValidateOutput(host, protocol)
    // switch(protocol.launchType) {
    //     case "VALIDATE_OUTPUT":
    //         executeValidateOutput(host, protocol)
    // }
}

const execute = () => {

}

const executeValidateExitcode = () => {

}

const executeValidateOutput = (host: Host, protocol: Protocol) => {
    console.log("executeValidateOutput");
    console.log(host);
    console.log(protocol);
    let formatted = format(protocol.executionLine, host);
    console.log(formatted);
    let [exe, ...args] = formatted.split(' ');
    console.log(exe)
    console.log(args)
    let spawned = spawn(exe, args);
    let validationRegex = new RegExp(protocol.validationRegex);

    spawned.stdout.on('data', (data) => {
        if (validationRegex.test(data)) {
            console.log('PING SUCCESS')
        }
    })
}

const executePrintOutput = () => {

}

const executeInternal = () => {
    
}