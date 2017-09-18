var restify = require('restify');


var server = restify.createServer({
	name:'police',
	versions:['1.0.0']
});
server.use(restify.plugins.queryParser());  
server.use(restify.plugins.bodyParser());
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

global.server = server;

require('./router/demo');
require('./router/user');

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});