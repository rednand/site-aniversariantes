import {
    RecebeToken,
    inserirPessoasnaAPI,
} from './service-cadastro.js';

var form = document.querySelector("#form");

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    var nome = evento.target.querySelector('[data-nome]').value;
    var email = evento.target.querySelector('[data-email]').value;
    var cpf = evento.target.querySelector('[data-cpf]').value;
    var nascimento = evento.target.querySelector('[data-data]').value;
    var base64 = sessionStorage.getItem("recent-image");
    await inserirPessoasnaAPI(nome, cpf, email, nascimento, base64);
}, true);

window.addEventListener("DOMContentLoaded", RecebeToken, true);
const atualizaToken = setInterval(RecebeToken, 900000);
