const net = require('net');
const port = 3000;
const client = new net.Socket();

client.connect(port, () => {
  client.write('client is writing');

})

client.on('data',(chunk)=> {
  console.log(chunk.toString().trim());
})

client.on('end', () => {
  console.log('client disconnected');
})

process.stdin.pipe(client);