import {
    RecebeToken,
    carregaCardsNoIndex,
    carregaCardsNoIndexMes
} from './service.js';

let containerload = document.querySelector("#preload");
containerload.innerHTML = 'Carregando aniversariantes...';

//função que carrega cards no index
export const carregandoCardsNoIndex = async () => {
    try {
        let container = document.querySelector("#second-section");
        container.innerHTML = '';
        let listaUsuarios = await carregaCardsNoIndex();
        let listaUsuariosMes = await carregaCardsNoIndexMes();
        //para o caso de não ter aniversariantes no dia
        if (listaUsuarios.length === 0) {
            containerload.innerHTML = " ";
            container.innerHTML = `
            <div id="second-section">
                <div class="div-sem-aniver">
                    <h1>Parece que não temos aniversariantes hoje. <br> Selecione os aniversariantes do mês.
                    </h1>
                    <img src="img/sad-cat.gif" alt="imagem de gato triste em uma comemoraçao">
                </div>
        </section>`
        }
        //para o caso de não ter aniversariantes no mês
        if (listaUsuariosMes.length === 0) {
            containerload.innerHTML = " ";
            container.innerHTML = ` <section id="month-section">
            <div class="div-sem-aniver-month">
                <h1>Não temos aniversariantes esse mês. </h1>
                <img src="img/sad-cat.gif" alt="imagem de gato triste em uma comemoraçao">
            </div>
        </section>`
        }
        listaUsuarios.map(item => {
            containerload.style.display = 'none';
            let datadehoje = '<div class="card">'
            datadehoje += `<img class="img" src="${item.base64}" alt=" " />`
            datadehoje += `<div class="description-photo">${item.nome} </div>`;
            datadehoje += `<div class="data-nascimento">${item.nascimento}</>`
            container.innerHTML += datadehoje;
            container.style.margin = "0 15%"
        })
        let container2 = document.querySelector("#month-section");
        container2.innerHTML = '';
        listaUsuariosMes.map(item => {
            let mes = '<div class="month-card">'
            mes += `<img class="img" src="${item.base64}" title=""/>`
            mes += `<div class="description-photo">${item.nome} </div>`;
            mes += `<div class="data-nascimento">${item.nascimento}</>`
            container2.innerHTML += mes;
        })
    } catch (erro) {
        let containerload = document.querySelector("#preload");
        containerload.style.display = 'none';
        let divParaErro = document.querySelector("#second-section");
        divParaErro.innerHTML = `
        <div class="div-para-erro">
            <h1>Não foi possível conectar-se ao servidor</h1>
            <img src="img/error500.gif" alt="erro 500">
        </div>            
        `;
    }
};

window.addEventListener("DOMContentLoaded", carregandoCardsNoIndex(), true)
const atualizaToken = setInterval(RecebeToken, 900000, true);