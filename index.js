
var http       = require('http')
  , npid       = require('npid')
  , RandStream = require('randstream');

try { npid.create(__dirname + '/rand.chakrit.net.pid', true); }
catch (e) { console.error(e); process.exit(1); }

var server = http.createServer(function(req, resp) {
  var mode, firehose;

  switch (req.url) {
    case '/alpha': case '/az': mode = 'alpha'; break;
    case '/num': mode = 'num'; break;
    case '/0': mode = '0'; break;
    case '/01': mode = '01'; break;
    case '/fast': mode = 'pseudo'; break;
    default: mode = 'random'; break;
  }

  firehose = new RandStream({ mode: mode });

  resp.once('error', function() { // failfast
    req.connection.destory();
    firehose.unpipe(resp);
  });

  resp.writeHead(200, 'OK', { 'Content-Type': 'application/octet-stream' });
  firehose.pipe(resp);
});

server.listen(process.env.PORT || 8080);

