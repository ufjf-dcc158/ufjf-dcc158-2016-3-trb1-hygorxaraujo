var http = require('http');
var url = require('url');

function start(router) {
  var port = process.env.PORT || 3000;
  console.log("Ouvindo conexões na porta " + port);

  function onRequest(request, response) {
    console.log("Nova requisição!");
    router.route(url.parse(request.url).pathname, request, response);
  };
  http.createServer(onRequest).listen(port);
}
module.exports.start = start;
