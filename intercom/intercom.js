// in node process
const Intercom = require('intercom-client');
const electron = require('electron');
const ipc = electron.ipcMain;
const fs = require('fs');
const path = require('path');

var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });


function createTicket(event, data) {
    const ipcRenderer = event.sender;
    
    console.log('Hi');
}

ipc.on('CREATE_TICKET', function (event, data) {
    console.log(event)
    console.log(data)
    console.log('CREATING_TICKET')
    console.log('CREATED_TICKET')
    event.sender.send('TICKET_CREATED', 'Good Job')
})


module.exports = {
    createTicket
};
