function tabuleiro(linha, coluna) {
  var tab = [[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0]];
  if (!isNaN(linha) && !isNaN(coluna)) {
    if (between(linha, 0, 9) && between(coluna, 0, 9)) {
        linha = linha - 1;
        coluna = coluna - 1;
        tab[linha][coluna] = 3;
        markKnightMove(linha-1, coluna-2, tab);
        markKnightMove(linha-2, coluna-1, tab);
        markKnightMove(linha-1, coluna+2, tab);
        markKnightMove(linha-2, coluna+1, tab);
        markKnightMove(linha+1, coluna-2, tab);
        markKnightMove(linha+2, coluna-1, tab);
        markKnightMove(linha+1, coluna+2, tab);
        markKnightMove(linha+2, coluna+1, tab);
    }
  }
  console.log(tab);
  console.log(JSON.stringify(tab));
}

function between(num, min, max) {
  if (num > min && num < max) {
    return true;
  }
  return false;
};

function markKnightMove(lin, col, tab) {
  if (between(lin, -1, 8) && between(col, -1, 8)) {
    console.log("tab[lin][col]:" + tab[lin][col]);
    tab[lin][col] = 2;
  }
  return tab;
};

exports.tabuleiro = tabuleiro;
