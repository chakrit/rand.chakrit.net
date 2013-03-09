
var http       = require('http')
  , RandStream = require('randstream');

var server = http.createServer(function(req, resp) {
  var firehose = new RandStream();

  firehose.pipe(resp);
  resp.on('error', function() { // failfast
    req.connection.destory();
    firehose.unpipe(resp);
  });
});

server.listen(process.env.port || 8080);

