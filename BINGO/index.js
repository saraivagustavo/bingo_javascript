var boardNumbers = [];
var pickedNumbers = [];
var sorteioEmAndamento = false;

function gerarCartela() {
    if (sorteioEmAndamento) {
        alert("Não é possível gerar uma nova cartela enquanto o sorteio estiver em andamento.");
        return;
    }

    nomeJogador = prompt("Insira o nome do jogador:");
    if (!nomeJogador) {
        alert("Por favor, insira um nome válido.");
        return;
    }

    boardNumbers = [];

    while (boardNumbers.length < 25) {
        var numero = Math.floor(Math.random() * 75) + 1;
        if (boardNumbers.indexOf(numero) === -1) {
            boardNumbers.push(numero);
        }
    }

    exibirCartela(nomeJogador);
}

function exibirCartela(nomeJogador) {
    var cartela = document.getElementById("cartela-bingo");
    cartela.innerHTML = "";

    for (var i = 0; i < boardNumbers.length; i++) {
        var quadrado = document.createElement("div");
        quadrado.className = "square";
        
        var circulo = document.createElement("div");
        circulo.className = "circle";
        circulo.textContent = boardNumbers[i];

        quadrado.setAttribute("data-number", boardNumbers[i]);
        quadrado.appendChild(circulo);

        cartela.appendChild(quadrado);
    }

    document.getElementById("nome-jogador").textContent = nomeJogador;
}

function iniciarJogo() {
    if (sorteioEmAndamento) {
        alert("O sorteio já está em andamento. Aguarde o término.");
        return;
    }

    if (boardNumbers.length === 0) {
        alert("Por favor, gere uma cartela antes de iniciar o jogo!");
        return;
    }

    var numerosSorteadosContainer = document.getElementById("numeros-sorteados");
    pickedNumbers = [];
    sorteioEmAndamento = true;

    intervalo = setInterval(function() {
        var numero = Math.floor(Math.random() * 75) + 1;

        if (pickedNumbers.indexOf(numero) === -1) {
            pickedNumbers.push(numero);
            numerosSorteadosContainer.textContent = pickedNumbers.join(", ");

            var quadrado = document.querySelector(".square[data-number='" + numero + "']");
            if (quadrado) {
                quadrado.classList.add("picked");

                if (boardNumbers.includes(numero)) {
                    quadrado.classList.add("matched");
                }
            }

            if (pickedNumbers.length === 75) {
                clearInterval(intervalo);
                sorteioEmAndamento = false;
                alert("Todos os números foram sorteados!");
            }
        }
    }, 200);
}

function reiniciarJogo() {
    if (sorteioEmAndamento) {
        clearInterval(intervalo);
        sorteioEmAndamento = false;
    }

    pickedNumbers = [];
    var numerosSorteadosContainer = document.getElementById("numeros-sorteados");
    numerosSorteadosContainer.textContent = "";

    var quadrados = document.querySelectorAll(".square");
    quadrados.forEach(function(quadrado) {
        quadrado.classList.remove("picked");
        quadrado.classList.remove("matched");
    });

    exibirCartela(nomeJogador);
}