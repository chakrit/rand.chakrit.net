
var http       = require('http')
  , npid       = require('npid')
  , RandStream = require('randstream');

try { npid.create(__dirname + '/rand.chakrit.net.pid', true); }
catch (e) { console.error(e); process.exit(1); }

var server = http.createServer(function(req, resp) {
  var firehose = new RandStream();

  firehose.pipe(resp);
  resp.on('error', function() { // failfast
    req.connection.destory();
    firehose.unpipe(resp);
  });
});

server.listen(process.env.PORT || 8080);

