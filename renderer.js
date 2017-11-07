// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron')

window.createTick = function(idval) {
    ipcRenderer.send('CREATE_TICKET', idval)
}

ipcRenderer.on('TICKET_CREATED', (res) => {
    console.log(res)
    console.log('ticket created')
})