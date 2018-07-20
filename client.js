const net = require('net');

var HOST = '0.0.0.0';
var PORT = 3000;

var client  = new net.Socket();
client.connect(PORT, HOST, function(){
  console.log('connected to: ' + HOST + ':' + PORT);
  client.write('I am LIIIIT');
})

client.on('data',function(data) {
  console.log(data.toString().trim());
});

client.on('end', function(){
  console.log('client disconnected');
});
  
process.stdin.on('data', function(chunk){
  client.write(chunk);
});
  
