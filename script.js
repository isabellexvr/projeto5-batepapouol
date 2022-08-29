let mensagensArr = []

function pegarMensagens() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promessa.then(processarMensagens)
    //promessa.cath(mostrarErro)
}

function mostrarErro(erro) {
    console.log(erro)
}

function entrarNaSala() {
    const nome = document.querySelector(".entryscreen input").value;

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
        {
            name: nome
        }
    )
    promessa.then(nomeSalvo)
    promessa.catch(nomeJaExistente)

    document.getElementById('escrever_nome').value = ''

}

const inputEntry = document.getElementById('escrever_nome')
inputEntry.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("botao_entrar").click();
    }
});

function nomeSalvo() {
    const telaInicial = document.querySelector(".entryscreen")


    telaInicial.classList.add("hide")

    setTimeout(loadScreen, 2500)

    scroll()

}

function loadScreen () {
    const conteudo = document.querySelector(".content.hide")
    const loadScreen = document.querySelector(".segundaentryscreen")

    loadScreen.classList.add("hide")
    conteudo.classList.remove("hide")
}

function nomeJaExistente(resposta) {
    alert("Erro! Nome de usuário já existente. Por favor, escolha outro.")
}

function processarMensagens(resposta) {

    const nomeUsuario = document.querySelector(".entryscreen input").value;

    const divMensagens = document.querySelector(".mensagens");


    mensagens = resposta.data
    mensagensArr.push(mensagens)

    divMensagens.innerHTML = ``;

    for (i = 0; i < 100; i++) {
        renderizarMensagens()
    }
    function renderizarMensagens() {
        if (mensagens[i].type === "status") {
            let mensagem = `
            <div class="mensagem transito">
                <div class="fix">
                    <em>&nbsp${mensagens[i].time}</em>
                    <strong>&nbsp${mensagens[i].from}</strong>
                    <span>&nbsp${mensagens[i].text}</span>
                </div>
            </div>`;
            divMensagens.innerHTML += mensagem
        }
        if (mensagens[i].type === "message") {
            let mensagem = `
            <div class="mensagem conteudo">
                <div class="fix">
                    <em>&nbsp${mensagens[i].time}</em>
                    <strong>&nbsp${mensagens[i].from}</strong>
                    <span>para</span>
                    <strong>${mensagens[i].to}</strong>
                    <span>: ${mensagens[i].text}</span>
                </div>
            </div>`;
            divMensagens.innerHTML += mensagem
        }
        if (nomeUsuario === mensagens[i].to) {
            if (mensagens[i].type === "private_message") {
                let mensagem = `
            <div class="mensagem reservada">
                <div class="fix">
                    <em>&nbsp${mensagens[i].time}</em>
                    <strong>${mensagens[i].from}</strong>
                    <span>&nbspreservadamente para</span>
                    <strong>${mensagens[i].to}</strong>
                    <span>: ${mensagens[i].text}</span>
                </div>
            </div>`;
                divMensagens.innerHTML += mensagem
            }
        }
    }

    setInterval(pegarMensagens, 6000)
    scroll()
}

function scroll() {
    const arrMensagem = document.querySelectorAll(".mensagem")
    const ultima = arrMensagem[arrMensagem.length - 1]
    ultima.scrollIntoView()

   // setInterval(, 3000)
}

function enviarMensagens() {
    const nomeUsuario = document.querySelector(".entryscreen input").value;
    const mensagemDigitada = document.querySelector(".espacamento input").value

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",
        {
            from: nomeUsuario,
            to: "Todos",
            text: mensagemDigitada,
            type: "message"
        }
    )

    promessa.then(mensagemEnviada)
    promessa.catch(mensagemNaoEnviada)

    document.getElementById('escrever_mensagem').value = ''

    pegarMensagens()
}

const input = document.getElementById('escrever_mensagem')
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("botao_enviarmsg").click();
    }
});


function mensagemEnviada() {
    pegarMensagens()
}

function mensagemNaoEnviada() {
    alert("Você não está mais na sala.")
    setTimeout(window.location.reload(), 1000)
}

function verificarOnline() {
    const nome = document.querySelector(".entryscreen input").value;

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",
        {
            name: nome
        }
    )

    promessa.then()
    setInterval(verificarOnline, 5000)
}

function consoleOnline(resposta) {
    console.log(resposta)
}

verificarOnline()
pegarMensagens()