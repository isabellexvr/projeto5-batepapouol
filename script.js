let mensagensArr = []

function pegarMensagens() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promessa.then(processarMensagens)
    //promessa.cath(mostrarErro)
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

}

function nomeSalvo() {
    const telaInicial = document.querySelector(".entryscreen")
    const conteudo = document.querySelector(".content.hide")

    telaInicial.classList.add("hide")
    conteudo.classList.remove("hide")

}

function nomeJaExistente(resposta) {
    alert("Erro! Nome de usuário já existente. Por favor, escolha outro.")
    console.log(resposta)
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
                    <span>&nbsppara</span>
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

    let ultima = divMensagens.children[divMensagens.children.length - 1]

    setInterval(pegarMensagens, 3000)

    //setInterval(ultima.scrollIntoView(), 2000)

    scroll()
}

function scroll() {
    const arrMensagem = document.querySelectorAll(".mensagem")
    const ultima = arrMensagem[arrMensagem.length - 1]
    
    ultima.scrollIntoView()

    setInterval(ultima.scrollIntoView(), 3000)
}

function enviarMensagens() {
    const nomeUsuario = document.querySelector(".entryscreen input").value;
    const mensagemDigitada = document.querySelector(".espacamento input").value

    console.log(mensagemDigitada)

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


}



/* const mensagemDigitada = document.querySelector(".espacamento input")
mensagemDigitada.addEventListener */

function mensagemEnviada(resposta) {
    pegarMensagens()
}

function mensagemNaoEnviada(resposta) {
    alert("Você não está mais na sala.")
    setTimeout(window.location.reload(), 1000)
}

/* function limpar() {
    const mensagemDigitada = document.querySelector("footer input").value
    mensagemDigitada = ""
} */

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
