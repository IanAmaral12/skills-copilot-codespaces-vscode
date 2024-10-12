//Create web server
//Create a web server that listens on port 3000 and serves the comments.html file.
//Use the fs module to read the comments.html file and send it back to the client.

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('comments.html', function(err, data) {
    if (err) {
      res.writeHead(404);
      res.write('File not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
}).listen(3000);
console.log('Server is listening on port 3000');