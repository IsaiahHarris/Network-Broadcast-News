const net = require('net');

const clients = [];
const server = new net.createServer((connection) => {
  console.log('client connected');
  clients.push(connection);

  connection.on('data', (chunk) => {
    broadcast(chunk, connection);
  })

  connection.on('end', () => {
    clients.splice(clients.indexOf(connection), 1);
    console.log('client disconnected');
  })

  server.on('error', (err) => {
    throw err;
  })

  function broadcast(data, sender) {
    clients.forEach(client => {
      if (client !== sender) {
        client.write(data);
        process.stdout.write(data);
      }
    })
  }


});

server.listen(3000, () => {
  console.log('port 3000');
})

