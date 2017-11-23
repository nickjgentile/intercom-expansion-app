// in node process
const Intercom = require('intercom-client');
const electron = require('electron');
const ipc = electron.ipcMain;


ipc.on('CREATE_TICKET', function (event, idval, apiKey) {
    var client = new Intercom.Client({ token: apiKey });

    var message = {
        from: {
          type: "user",
          user_id: idval
        },
        body: "This is a manually initiated message. Please add a note to the convesration to describe what was discussed."
      }
      
    client.messages.create(message)
        .then(function(m) {
            event.sender.send('TICKET_CREATED', m.body)
        })
        .catch(function(err) {
            console.log('ERROR LOG ' + err)
            event.sender.send('TICKET_CREATE_FAILED', err)
        })    
})