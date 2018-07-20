const net = require('net');

const clients = [];

const server = net.createServer(function (connection){

  connection.name = connection.remoteAddress + ':' + connection.remotePort;
  clients.push(connection);
  console.log(connection.name + ' connected');


  connection.on('data', function(data){
    broadcast(connection.name + '> ' + data, connection);
  }) 
   
  server.on('error', function(){
    throw err;
  }) 
  
  function broadcast(message, sender) {
    clients.map(client => {
      if(client === sender) return;
      client.write(message);
      process.stdout.write(message);
    })
    
  }

});


  
server.listen(3000, function () {
  console.log('server listening to port 3000');
})
