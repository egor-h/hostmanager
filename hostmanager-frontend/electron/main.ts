import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import { _execute, unixTimestamp } from '../src/util/launcher';
import format from 'string-format';
import { Host, Protocol } from '../src/models/host';
import { ProtocolResult, ProtocolResultMapByHostId } from '../src/state/reducers/localState';

let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    // backgroundColor: '#191622',
    // titleBarStyle: "hidden",
    // frame: false
    webPreferences: {
      // preload: path.join(__dirname, "renderer/preload.ts"),
      nodeIntegration: true,
      devTools: true,
      webSecurity: false
    }
  })
  // mainWindow.removeMenu();
  mainWindow.setMenuBarVisibility(false);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('async-execute-all', (event, arg) => {
    // console.log('async-execute-all');
    // console.log(arg)
    let results: ProtocolResultMapByHostId = {}
    let {protocol, hosts}: {protocol: Protocol, hosts: Host[]} = arg;
    hosts.forEach(host => {
      let formatted = format(protocol.executionLine, host);
      _execute(formatted, (err, stderr, stdout) => {
            
      let exitCode: number = err?.code === undefined ? 0 : err.code;
      let newlyCreatedResult = {
        hostId: host.id,
        protocol: protocol,
        createdAt: unixTimestamp(new Date()),
        stdout: stdout,
        stderr: stderr,
        exitCode: exitCode
      }
      // console.log(newlyCreatedResult)
      results[host.id] = {[protocol.launchType]: newlyCreatedResult};
    });
    
  });

  let intervalId = setInterval((hostsTotal: number) => {
    console.log(`Hosts total: ${hostsTotal}`);
    console.log(`Hosts with results: ${Object.keys(results).length}`);
    if (hostsTotal === Object.keys(results).length) {
      event.reply('async-execute-all-reply', results);
      clearInterval(intervalId);
      return;
    }
    console.log('Results not ready. Sleeping...');
  }, 1500, hosts.length);
    
})

ipcMain.on('async-execute', (event, arg) => {
  console.log(arg)
  let {protocol, host} = arg;
  let formatted = format(protocol.executionLine, host);
  _execute(formatted, (err, stderr, stdout) => {
            
    let exitCode: number = err?.code === undefined ? 0 : err.code;
    // let filteredResults = getState().local.protocolResults.filter(pr => pr.hostId !== host.id);
    let newlyCreatedResult = {
        hostId: host.id,
        protocol: protocol,
        createdAt: unixTimestamp(new Date()),
        stdout: stdout,
        stderr: stderr,
        exitCode: exitCode
    }
    //event.reply('async-execute-reply', newlyCreatedResult);
  });
});

app.on('ready', createWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    }
  })
app.allowRendererProcessReuse = true
