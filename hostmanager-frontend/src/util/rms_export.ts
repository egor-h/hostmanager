import { v4 as uuidv4 } from 'uuid';
import { writeFile, open } from 'fs/promises';
import { writeFileSync } from 'fs';
import { Host } from '../models/host';
import { ipcRenderer } from 'electron';
import { LocalState } from '../state/reducers/localState';
import { flattenTree } from './tree';

export const rootGroupUUID = uuidv4();

export const generatePhonebookThunk = (hosts: Host[]) => {
    return (dispatch: any) => {
        console.log(`Generating phonebook of ${hosts.length} host(s)`);
        ipcRenderer.send('generate-rms', hosts);
    }
}

export const generatePhonebook = (file: string, hosts: Host[]) => {
    let phonebookStr = asSignleXml(hosts);
    console.log(`Writing ${hosts.length} hosts to ${file} (${phonebookStr.length})`);
    console.log("Whole xml");
    console.log(phonebookStr);
    try {
        writeFileSync(file, phonebookStr, 'utf-8');
    } catch (err) {
        console.error(err);
    }
}

const asSignleXml = (hosts: Host[]) => {
    const connections = hosts.map(h => singleHost(rootGroupUUID, uuidv4(), h.address, h.address, 5650)).join('\n');
    return `<?xml version="1.0" encoding="utf-8"?><address_book version="68001"><groups>${rootGroup()}</groups><connections>${connections}</connections><domain_controllers/></address_book>`;
}

const elementWithText = (elName: string, elText: string) => {
    return `<${elName}>${elText}</${elName}>`
}

const emptyElement = (elName: string) => {
    return `<${elName}/>`
}

const singleHost = (parentUuid: string, uuid: string, name: string, address: string, port: number) => {
    let e: any = [];
    e.push(elementWithText("InternalID", uuid))
    e.push(elementWithText("Caption", name))
    e.push(emptyElement("PeerIP"))
    e.push(elementWithText("PeerHost", address))
    e.push(elementWithText("Port", `${port}`))
    e.push(elementWithText("RenderMode", "1"))
    e.push(elementWithText("CPUUsage", "1"))
    e.push(elementWithText("ColorDepth", "5"))
    e.push(elementWithText("AdvMouseSroll", "true"))
    e.push(elementWithText("ConstProportions", "true"))
    e.push(elementWithText("SavePass", "false"))
    e.push(emptyElement("AutoLogin"))
    e.push(elementWithText("auto_status_check", "false"))
    e.push(elementWithText("Flags", "0"))
    e.push(elementWithText("ChacheMode", "0"))
    e.push(elementWithText("LocalCursorMode", "0"))
    e.push(elementWithText("RemoteCursorMode", "0"))
    e.push(elementWithText("UseCascadeConnect", "false"))
    e.push(emptyElement("CascadeHost"))
    e.push(elementWithText("LoginList", "admin"))
    e.push(emptyElement("DomainList"))
    e.push(emptyElement("blank_screen_text"))
    e.push(elementWithText("fps", "15"))
    e.push(elementWithText("allow_callback", "false"))
    e.push(emptyElement("mac"))
    e.push(elementWithText("lock_on_disconnect", "false"))
    e.push(elementWithText("display_index", "-1"))
    e.push(elementWithText("disable_dnd", "false"))
    e.push(elementWithText("use_ping", "false"))
    e.push(elementWithText("ping_interval", "15"))
    e.push(emptyElement("comp_hash"))
    e.push(emptyElement("ftp_last_work_dir"))
    e.push(emptyElement("black_screen_id"))
    e.push(elementWithText("use_ip_v_6", "false"))

    return [`<connection parent_group_id="{${parentUuid}}">`, ...e, "</connection>"].join('  \n')
}

const rootGroup = () => {
    return `<group id="{${rootGroupUUID}}" parent_group_id=""><caption>all</caption><description/></group>`
}