import {
    RecebeToken,
    buscarCadastroporCPF,
    deletaUsuario,
    editarUsuario
} from './service-edita.js';

export const BuscandoUsuarioPeloCPF = async () => {
    try {
        let mostraUsuarioBuscadoCPF = await buscarCadastroporCPF();
        let conteudoVazio = document.querySelector("#mostra-infos");
        conteudoVazio.innerHTML =
            `<div class="card">
        <div class="description">   
        <p>${mostraUsuarioBuscadoCPF.nome} </p><br>
        <p>${mostraUsuarioBuscadoCPF.email} </p><br>
        <p>${mostraUsuarioBuscadoCPF.nascimento}</p>
        <img class="img" src='${mostraUsuarioBuscadoCPF.base64}' title=""/>
        </div>
        `
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('cpf');
        let id = sessionStorage.setItem('id', `${mostraUsuarioBuscadoCPF.id}`);
    } catch (erro) {
        console.log(erro);
    }
};

var form = document.querySelector("#form");
form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    let nome = document.querySelector("#nome").value;
    let nascimento = document.querySelector("#datebirth").value;
    let email = document.querySelector("#email").value;
    let base64 = sessionStorage.getItem("recent-image");
    let cpf = document.querySelector("#cpf").value;
    await editarUsuario(nome, email, cpf, nascimento, base64);
}, true);

export const deletandoUsuario = () => {
    try {
        let cpfprompt = prompt("Insira os 3 primeiros números de seu CPF:")
        let inclusaoCPF = sessionStorage.setItem('cpf', cpfprompt);
        deletaUsuario();
    } catch (erro) {
    }
};

export const editandoUsuario = () => {
    try {
        let cpfpromptALTERA = prompt("Insira os 3 primeiros números de seu CPF:")
        let alteraCPF = sessionStorage.setItem('cpfALTERACAO', cpfpromptALTERA);
        editarUsuario();
    } catch (erro) {
        console.log(erro);
    }
};

window.addEventListener("DOMContentLoaded", RecebeToken, true);
const atualizaToken = setInterval(RecebeToken, 900000);
var clicaemostrainfo = document.querySelector("#busca");
clicaemostrainfo.addEventListener("click", BuscandoUsuarioPeloCPF, true);
var clicaemostrainfo = document.querySelector("#exclusao");
clicaemostrainfo.addEventListener("click", deletandoUsuario, true);
var clicaemostrainfo = document.querySelector("#enviar");
clicaemostrainfo.addEventListener("click", editandoUsuario, true);