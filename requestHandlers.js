const url = require('url');
const queryString = require('querystring');
const modXadrez = require('./modXadrez');

function index(request, response) {
  response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
  response.write("<h1>Início</h1>");
  response.write("<a  href=\"../sobre.html\">Sobre</a><br />");
  response.write("<a  href=\"../aleatorios.html\">Aleatórios</a><br />");
  response.write("<a  href=\"../primos.html?N1=1&N2=10\">Primos</a><br />");
  response.write("<a  href=\"../equacao.html\">Equação</a><br />");
  response.write("<a  href=\"../xadrez.html\">Xadrez</a><br />");
  response.end();
};

function notFound(request, response) {
  response.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
  response.write("<h1>Página não encontrada!</h1>");
  response.end();
};

function sobre(request, response) {
  response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
  response.write("<h1>Hygor Xavier Araújo</h1>\
                  <p>201465379AC</p>\
                  <p>hygor.araujo@ice.ufjf.br</p>\
                  <p>Ciência da Computação</p>");
  response.end();
};

function aleatorios(request, response) {
  var pares = [];
  var impares = [];
  while (pares.length < 100 || impares.length < 100) {
    var num = Math.floor(Math.random() * 100)
    if (num % 2 == 0 && pares.length < 100) {
      pares.push(num);
    } else if (num % 2 != 0 && impares.length < 100) {
      impares.push(num);
    }
  }

  //escrevendo resposta
  response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
  response.write("<table border=1>");
  response.write("<tr><th></th><th>Pares</th><th>Ímpares</th></tr>");
  for (var i = 0; i < 100; i++) {
    response.write("<tr><td>" + (i+1) + "</td><td>"
      + pares[i] + "</td><td>"
      + impares[i] + "</td></tr>");
  }
  response.write("</table>");
  response.end();
};

function primos(request, response) {
  var query = url.parse(request.url, true).query;
  if (query.N1 == undefined || query.N2 == undefined) {
    response.writeHead(422, {'Content-Type':'text/html; charset=utf-8'});
    response.write("<h1>N1 e/ou N2 faltando!</h1>");
    response.end();
  } else if (parseInt(query.N1) > parseInt(query.N2)) {
    response.writeHead(422, {'Content-Type':'text/html; charset=utf-8'});
    response.write("<h1>N1 deve ser menor que N2.</h1>");
    response.end();
  } else if (query.N1 > 100 || query.N2 > 100) {
    response.writeHead(422, {'Content-Type':'text/html; charset=utf-8'});
    response.write("<h1>N1 e N2 devem ser menores que 100.</h1>");
    response.end();
  } else {
    var num1 = parseInt(query.N1);
    var num2 = parseInt(query.N2);
    var primos = [];
    for (var i = num1; i < num2; i++) {
      if (isPrime(i)) {
        primos.push(i);
      }
    }

    response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    response.write("<h1><ol>");
    for (var k = 0; k < primos.length; k++) {
      response.write("<li>" + primos[k] + "</li>");
    }
    response.write("</ol></h1>");
    response.end();
  }
};

function isPrime(num) {
    if(num < 2) return false;
    for (var i = 2; i < num; i++) {
        if(num % i == 0)
            return false;
    }
    return true;
};

function equacao(request, response) {
  if (request.method == 'GET') {
    response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    response.write("<h1>Equação ax²+bx+c=0</h1>");
    response.write("<p>Informe os valores dos termos da equação:</p>");
    response.write("<form method='POST'>");
    response.write("<label style='display:block;margin-bottom: 10px;'>a: <input type='number' name='a' required='required' /></label>");
    response.write("<label style='display:block;margin-bottom: 10px;'>b: <input type='number' name='b' required='required' /></label>");
    response.write("<label style='display:block;margin-bottom: 10px;'>c: <input type='number' name='c' required='required' /></label>");
    response.write("<input style='display:block;margin-bottom: 10px;' type='submit' value='Resolver'/>");
    response.write("<input style='display:block;margin-bottom: 10px;' type='reset' value='Limpar'/>");
    response.write("</form>");
    response.end();
  } else if (request.method == 'POST') {
    var body = "";
    request.on('data', function(data) {
      body = body + data;
    });

    request.on('end', function() {
      var dados = queryString.parse(body);
      console.log("a: " + dados.a);
      console.log("b: " + dados.b);
      console.log("c: " + dados.c);
      var inputa = parseInt(dados.a);
      var inputb = parseInt(dados.b);
      var inputc = parseInt(dados.c);
      console.log("inputa: " + inputa);
      console.log("inputb: " + inputb);
      console.log("inputc: " + inputc);
      if (isNaN(inputa) || isNaN(inputb) || isNaN(inputc)) {
        response.writeHead(422, {'Content-Type':'text/html; charset=utf-8'});
        response.write("Um ou mais valores não são válidos.");
        response.end();
      } else {
        root = Math.pow(inputb,2) - 4 * inputa * inputc;
        root1 = (-inputb + Math.sqrt(root))/(2*inputa);
        root2 = (-inputb - Math.sqrt(root))/(2*inputa);
        if (root > 0) {
          response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
          //response.write("r: " + root);
          response.write("x1 = " + root1);
          response.write("x2 = " + root2);
          response.end();
        } else {
          response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
          response.write("Não foi possível encontrar as raízes.");
          response.end();
        }
      }
    });
  }
};

function xadrez(request, response) {
  var query = url.parse(request.url, true).query;
  console.log(query);
  var linha = parseInt(query.linha);
  var coluna = parseInt(query.coluna);
  var tab = modXadrez.tabuleiro(linha, coluna);
  response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
  response.write("<h1>Xadrez</h1>");
  var xadrezHtml = "<table frame='box' style='table-layout:fixed;'>";
  for (var i = 0; i < tab.length; i++) {
    xadrezHtml = xadrezHtml + "<tr>";
    for (var j = 0; j < tab[i].length; j++) {
      switch (tab[i][j]) {
        case 0:
          xadrezHtml = xadrezHtml + "<td style='width:60px;height:60px;background-color:white;text-align:center;'></td>";
          break;
        case 1:
          xadrezHtml = xadrezHtml + "<td style='width:60px;height:60px;background-color:black;text-align:center;'></td>";
          break;
        case 2:
          xadrezHtml = xadrezHtml + "<td style='width:60px;height:60px;background-color:blue;text-align:center;'></td>";
          break;
        case 3:
          if (i % 2 == j % 2) {
            xadrezHtml = xadrezHtml + "<td style='width:60px;height:60px;background-color:white;text-align:center;'><p style='font-size:50px;'>&#9822;</p></td>";
          } else {
            xadrezHtml = xadrezHtml + "<td style='width:60px;height:60px;background-color:black;text-align:center;'><p style='font-size:50px;color:white;'>&#9816;</p></td>";
          }
          break;
      }
    }
    xadrezHtml = xadrezHtml + "</tr>";
  }
  xadrezHtml = xadrezHtml + "</table>";
  response.write(xadrezHtml);
  response.end();
};

function xadrezJson(request, response) {
  var query = url.parse(request.url, true).query;
  console.log(query);
  var linha = parseInt(query.linha);
  var coluna = parseInt(query.coluna);
  var tab = modXadrez.tabuleiro(linha, coluna);
  response.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
  response.write(JSON.stringify(tab));
  response.end();
};

exports.index = index;
exports.notFound = notFound;
exports.sobre = sobre;
exports.aleatorios = aleatorios;
exports.primos = primos;
exports.equacao = equacao;
exports.xadrez = xadrez;
exports.xadrezJson = xadrezJson;
