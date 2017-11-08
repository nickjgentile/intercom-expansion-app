// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron')

window.createTick = function(idval) {
    ipcRenderer.send('CREATE_TICKET', idval)
}

ipcRenderer.on('TICKET_CREATED', (event, res) => {
    console.log(res)
    var resmessage = `<h3 class="green">SUCCESS!</h3> 
    <p>You created a new ticket for a user. See details below</p>
    <p>
    <strong class="successjson">Type:</strong> ${res.type}, <br/>
    <strong class="successjson">MessageId:</strong> ${res.id}, <br/>
    <strong class="successjson">Created At:</strong> ${new Date}, <br/>
    <strong class="successjson">Body:</strong> ${res.body}
    </p>`
    document.getElementById('ticketCreateSpin').style.display = "none";
    document.getElementById('response').innerHTML = resmessage;
})

ipcRenderer.on('TICKET_CREATE_FAILED', (event, err) => {
    console.log(err)
    var resmessage = `<h3 class="red">FAILURE!</h3> 
    <p>You submitted an invalid userID, or do not have access to post users. See details below.</p>
    <p>${err}</p>`
    document.getElementById('ticketCreateSpin').style.display = "none";
    document.getElementById('response').innerHTML = resmessage;
})