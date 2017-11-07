// in node process
const Intercom = require('intercom-client');
const electron = require('electron');
const ipc = electron.ipcMain;

var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });

ipc.on('CREATE_TICKET', function (event, idval) {

    var message = {
        from: {
          type: "user",
          user_id: idval
        },
        body: "This is a manually initiated message. Please add a note to the convesration to describe what was discussed."
      }

      console.log('message.idval = ' + idval + ' idval type = ' + typeof(idval))
      
    client.messages.create(message)
        .then(function(m) {
            console.log(m.body)
            event.sender.send('TICKET_CREATED', m.body)
        })
        .catch(function(err) {
            console.log(err)
        })    
})


// module.exports = {
//     createTicket
// };
