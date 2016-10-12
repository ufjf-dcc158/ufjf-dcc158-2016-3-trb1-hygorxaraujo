const handlers = require('./requestHandlers');
var reqMap = {
  "": handlers.index,
  "/": handlers.index,
  "/index": handlers.index,
  "/index.html": handlers.index,
  "/sobre": handlers.sobre,
  "/sobre.html": handlers.sobre,
  "/aleatorios": handlers.aleatorios,
  "/aleatorios.html": handlers.aleatorios,
  "/primos": handlers.primos,
  "/primos.html": handlers.primos,
  "/equacao": handlers.equacao,
  "/equacao.html": handlers.equacao,
  "/xadrez": handlers.xadrez,
  "/xadrez.html": handlers.xadrez,
};

function route(pathname, request, response) {
  console.log("Routing: ", pathname);
  if (reqMap[pathname]) {
    reqMap[pathname](request, response);
  } else {
    handlers.notFound(request, response);
  }
};

module.exports.route = route;
