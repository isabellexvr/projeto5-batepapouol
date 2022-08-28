let mensagensArr = []

function pegarMensagens() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promessa.then(processarMensagens)
    //promessa.cath(mostrarErro)
}

function entrarNaSala() {
   const nome =  document.querySelector(".entryscreen input").value;

   const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
   {
    name: nome
   }
   )
   promessa.then(nomeSalvo)
   promessa.catch(nomeJaExistente)
}

function nomeSalvo () {
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

    const divMensagens = document.querySelector(".mensagens");

    
    mensagens = resposta.data
    mensagensArr.push(mensagens)

    divMensagens.innerHTML = ``;

for (i=0; i<mensagens.length; i++) {
    renderizarMensagens()
}
    function renderizarMensagens() {
        if (mensagens[i].type === "status") {
            let mensagem = `
            <div class="mensagem transito">
                <div class="fix">
                    <em>&nbsp${mensagens[i].time}</em>
                    <strong>&nbsp${mensagens[i].from}</strong>
                    <span>&nbspentra na sala...</span>
                </div>
            </div>`;
            divMensagens.innerHTML += mensagem
        }
        if (mensagens[i].type === "message") {
            let mensagem = `
            <div class="mensagem transito">
                <div class="fix">
                    <em>&nbsp${mensagens[i].time}</em>
                    <strong>&nbsp${mensagens[i].from}</strong>
                    <span>&nbspentra na sala...</span>
                </div>
            </div>`;
            divMensagens.innerHTML += mensagem
        }
        if (mensagens[i].type === "private_message") {
            let mensagem = `
            <div class="mensagem reservado">
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

/* function verificarOnline () {
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", 
    {
        name: 
    }
    )
} */

//todas.sort()

let ultima = divMensagens.children[divMensagens.children.length-1]

setInterval(pegarMensagens,3000)

setInterval(ultima.scrollIntoView(),10000)


}

const divMensagens = document.querySelector(".mensagens");

pegarMensagens()