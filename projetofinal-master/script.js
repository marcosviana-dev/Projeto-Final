var tela = document.getElementById("tela");
var pincel = tela.getContext("2d");
var raio = 10;
var xAleatorio = 350;
var yAleatorio = 250;
var count = 0;
var hh = 0;
var mm = 0;
var ss = 0;
var cron = null;
var intervaloAlvo = null;
var jogando = false;
var dificuldade = 2;

escolher_dificuldade();

function iniciar() {
    jogando = true;
    cron = setInterval(function () { timer(); }, 1000);
    intervaloAlvo = setInterval(atualizaTela, dificuldade);
}

function reiniciar() {
    clearInterval(cron);
    clearInterval(intervaloAlvo);
    count = 0;
    hh = 0;
    mm = 0;
    ss = 0;
    document.getElementById("counter").innerHTML = "00:00:00";
    document.getElementById("msg").innerHTML = "Acerte o alvo 5 vezes no menor tempo possível!";
    iniciar();
}

function timer() {
    ss++;
    if (ss === 60) {
        ss = 0;
        mm++;
        if (mm === 60) {
            mm = 0;
            hh++;
        }
    }
    var format = (hh < 10 ? "0" + hh : hh) + ":" +
                 (mm < 10 ? "0" + mm : mm) + ":" +
                 (ss < 10 ? "0" + ss : ss);
    document.getElementById("counter").innerHTML = format;
}

function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function limpaTela() {
    pincel.clearRect(0, 0, 700, 500);
    pincel.fillStyle = "lightgray";
    pincel.fillRect(0, 0, 700, 500);
}

function desenhaAlvo(x, y) {
    desenhaCirculo(x, y, raio + 20, "red");
    desenhaCirculo(x, y, raio + 10, "white");
    desenhaCirculo(x, y, raio, "red");
}

function sorteiaPosicao(maximo, margem) {
    return margem + Math.floor(Math.random() * (maximo - margem * 2));
}

function atualizaTela() {
    limpaTela();
    xAleatorio = sorteiaPosicao(700, raio + 20);
    yAleatorio = sorteiaPosicao(500, raio + 20);
    desenhaAlvo(xAleatorio, yAleatorio);
}

function escolher_dificuldade() {
    switch (dificuldade) {
        case 1:
            dificuldade = 1000;
            break;
        case 2:
            dificuldade = 800;
            break;
        case 3:
            dificuldade = 600;
            break;
    }
}

function dispara(evento) {
    if (!jogando) return;
    var rect = tela.getBoundingClientRect();
    var x = evento.clientX - rect.left;
    var y = evento.clientY - rect.top;
    var distancia = Math.sqrt(Math.pow(x - xAleatorio, 2) + Math.pow(y - yAleatorio, 2));
    if (distancia <= raio + 20) {
        count++;
        document.getElementById("msg").innerHTML = "Acertou! (" + count + "/5)";
        if (count === 5) {
            clearInterval(cron);
            clearInterval(intervaloAlvo);
            jogando = false;
            limpaTela();
            pincel.fillStyle = "#000";
            pincel.fillRect(0, 0, 700, 500);
            pincel.fillStyle = "#00ff00";
            pincel.font = "bold 36px Arial";
            pincel.textAlign = "center";
            pincel.fillText("Você venceu!", 350, 250);
            document.getElementById("msg").innerHTML = "Parabéns! Clique em Reiniciar para jogar novamente.";
        }
    }
}

tela.onclick = dispara;
iniciar();
