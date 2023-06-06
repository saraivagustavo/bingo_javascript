var jogadores = [];
var intervalo;
var sorteioEmAndamento = false;

function gerarNumerosAleatorios(quantidade, min, max) {
  if (quantidade > max - min) {
    console.log("Intervalo insuficiente ...");
    return;
  }

  var numeros = [];

  while (numeros.length < quantidade) {
    var aleatorio = Math.floor(Math.random() * (max - min) + min);

    if (!numeros.includes(aleatorio)) {
      numeros.push(aleatorio);
    }
  }

  return numeros;
}

function gerarCartela() {
  if (sorteioEmAndamento) {
    alert("A criação das cartelas não é permitida durante o sorteio de números.");
    return;
  }

  var nomeJogador = prompt("Digite o nome do jogador");

  var cartela = [
    gerarNumerosAleatorios(5, 1, 15),
    gerarNumerosAleatorios(5, 16, 30),
    gerarNumerosAleatorios(5, 31, 45),
    gerarNumerosAleatorios(5, 46, 60),
    gerarNumerosAleatorios(5, 61, 75)
  ];

  jogadores.push({
    nomeJogador: nomeJogador,
    cartela: cartela
  });

  desenharJogador(nomeJogador, cartela);

  console.log(jogadores);
}

function desenharJogador(nome, cartela) {
  var div = document.getElementById("espaco_cartelas");

  var jogadorDiv = document.createElement("div");
  jogadorDiv.classList.add("jogador");

  var nomeJogadorDiv = document.createElement("div");
  nomeJogadorDiv.innerText = nome;
  jogadorDiv.appendChild(nomeJogadorDiv);

  var tabela = document.createElement("table");
  tabela.classList.add("cartela");

  var thead = document.createElement("thead");

  var thB = document.createElement("th");
  thB.innerText = "B";
  var thI = document.createElement("th");
  thI.innerText = "I";
  var thN = document.createElement("th");
  thN.innerText = "N";
  var thG = document.createElement("th");
  thG.innerText = "G";
  var thO = document.createElement("th");
  thO.innerText = "O";

  thead.appendChild(thB);
  thead.appendChild(thI);
  thead.appendChild(thN);
  thead.appendChild(thG);
  thead.appendChild(thO);

  for (var i = 0; i < 5; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 5; j++) {
      var td = document.createElement("td");
      if (i === 2 && j === 2) {
        td.innerText = "X";
        tr.appendChild(td);
      } else {
        td.innerText = cartela[j][i];
        tr.appendChild(td);
      }
    }
    tabela.appendChild(tr);
  }

  tabela.appendChild(thead);
  jogadorDiv.appendChild(tabela);
  div.appendChild(jogadorDiv);
}

function iniciarJogo() {
  if (intervalo) {
    alert("O sorteio dos números já está em andamento.");
    return;
  }

  if (jogadores.length === 0) {
    alert("É preciso criar as cartelas antes de iniciar o jogo.");
    return;
  }

  sorteioEmAndamento = true;

  var numerosSorteadosDiv = document.getElementById("numeros-sorteados");
  numerosSorteadosDiv.innerHTML = "";

  var numerosSorteados = [];
  var numeroSorteado = 0;
  intervalo = setInterval(function() {
    do {
      numeroSorteado = Math.floor(Math.random() * 75) + 1;
    } while (numerosSorteados.includes(numeroSorteado));

    numerosSorteados.push(numeroSorteado);
    numerosSorteadosDiv.innerHTML += numeroSorteado + ", ";

    marcarNumeroSorteado(numeroSorteado);

    if (numerosSorteados.length === 75) {
      clearInterval(intervalo);
      intervalo = null;
      console.log("Todos os números foram sorteados.");
      sorteioEmAndamento = false;
    }
  }, 100);
}

function reiniciarJogo() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
    console.log("Sorteio dos números interrompido.");
  }

  jogadores = [];

  var numerosSorteadosDiv = document.getElementById("numeros-sorteados");
  numerosSorteadosDiv.innerHTML = "";

  var espacoCartelasDiv = document.getElementById("espaco_cartelas");
  espacoCartelasDiv.innerHTML = "";

  console.log("Jogo reiniciado.");

  sorteioEmAndamento = false;
}

function marcarNumeroSorteado(numero) {
    var cartelas = document.getElementsByClassName("cartela");
  
    for (var i = 0; i < cartelas.length; i++) {
      var celulas = cartelas[i].getElementsByTagName("td");
  
      for (var j = 0; j < celulas.length; j++) {
        if (celulas[j].innerText === numero.toString()) {
          celulas[j].classList.add("sorteado");
        }
      }
    }
}
  

   