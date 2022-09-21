import {
    RecebeToken,
    alteraUrl,
    buscaUsuarioPeloNomeNascimento,
    carregarTodos,
} from './service-busca.js';

window.addEventListener("DOMContentLoaded", RecebeToken, true);
const atualizaToken = setInterval(RecebeToken, 900000);
let conteudopreload = document.getElementById("loading");
var mostratodososcards = document.querySelector("#select");
mostratodososcards.addEventListener("change", alteraUrl, true);

//função que busca aniversariante por nome ou data
export const BuscandoUsuarioPeloNomeouData = async () => {
    try {
        let mostraUsuarioBuscado = await buscaUsuarioPeloNomeNascimento();
        let conteudoVazio = document.getElementById("section-busca");
        let main = document.querySelector('main');
        conteudoVazio.innerHTML = ' ';
        mostraUsuarioBuscado.map(function (item) {
            let card = '<div class="card">'
            card += `<div class="description-photo">${item.nome} </div>`;
            card += `<img class="img" src='${item.base64}' title=""/>`
            conteudoVazio.innerHTML += card;
            conteudoVazio.style.width = "100%"
            conteudoVazio.style.marginLeft = "-1%"
            main.style.backgroundImage = "url('img/backgroundBusca-cards.png')";
            main.style.backgroundRepeat = "repeat-y";
            main.style.backgroundSize = "100%";
            main.style.backgroundPosition = "100% 0%"
            conteudopreload.style.display = "none"
        })
    } catch (erro) {
        console.log(erro);
    }
};

var clicaemostracard = document.querySelector("#busca");
clicaemostracard.addEventListener("click", BuscandoUsuarioPeloNomeouData, true);

//função que carrega todos os aniversariante cadastrados
export const carregaCards = async () => {
    try {
        let mostrarUsuario = await carregarTodos();
        let conteudoVazio = document.getElementById("section-busca");
        let main = document.querySelector('main');
        conteudoVazio.innerHTML = ' ';
        mostrarUsuario.map(function (item) {
            let card = '<div class="card">'
            card += `<div class="description-photo">${item.nome} </div>`
            card += `<img class="img" src='${item.base64}' title=""/>`
            conteudoVazio.innerHTML += card;
            conteudoVazio.style.width = "100%"
            conteudoVazio.style.marginLeft = "-1%"
            main.style.backgroundImage = "url('img/8.png')";
            main.style.backgroundRepeat = "repeat-y";
            main.style.backgroundSize = "100%";
            main.style.backgroundPosition = "100% 0%"
            conteudopreload.style.display = "none";
        })
    } catch (erro) {
        console.log(erro)
    }
}

window.addEventListener("DOMContentLoaded", carregaCards, true);