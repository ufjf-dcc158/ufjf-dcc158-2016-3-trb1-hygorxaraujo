var http = require('http');
var url = require('url');

function start(router) {
  console.log("Ouvindo conexões na porta 8888");

  function onRequest(request, response) {
    console.log("Nova requisição!");
    router.route(url.parse(request.url).pathname, request, response);
  };
  http.createServer(onRequest).listen(process.env.PORT);
}
module.exports.start = start;
