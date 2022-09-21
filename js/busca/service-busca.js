import {
    BuscandoUsuarioPeloNomeouData,
    carregaCards
} from './carrega-card-busca.js'

let dom = "75a4";
let url = 'https://' + dom + '-189-8-4-21.ngrok.io/login';
let url2 = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa';
let urlBase64 = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa/base64/';

export function alteraUrl() {
    var select = document.querySelector('#select');
    var value = select.options[select.selectedIndex].value;

    if (value == "nome") {
        let url3 = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa/nome/';
        return url3
    }
    if (value == "data") {
        let url5 = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa/data/';
        return url5
    }
}

//funcao que pega token em /login
export const RecebeToken = (callback) => {
    fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: `{
                "chave":"dGVzdGVAZ3J1cG9tdWx0aXBsaWNhLmNvbS5icjoxMjM0"
            }`,
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                let containerload = document.querySelector("#loading");
                containerload.style.display = 'none';
                containerload.style.display = "inline-block";
                containerload.style.width = "90%"
                containerload.style.margin = "10% 5%"
                containerload.innerHTML = `
                <div class="div-para-erro">
                    <h1 style="background-color: #C0DBDE;border:solid 10px #ffffff">Não foi possível conectar-se ao servidor</h1>
                    <img src="img/error500.gif" alt="erro 500">
                </div>            
                `;
            }
        }).then(data => {
            localStorage.setItem('token',
                JSON.stringify(data));
            callback;
        })
};

//funcao que pega todas as pessoas
export const carregarTodos = () => {
    let token = JSON.parse(localStorage.getItem('token'));
    try {
        return fetch(url2, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(resp => {
                if (resp.status === 401) {
                    RecebeToken(carregaCards());
                }

                if (resp.ok) {
                    return resp.json();
                }
            })
            .then(data => {
                return data;
            })
            .catch(err => {
                throw new Error('Nao foi possível conectar');
            })
    } catch {
        console.err(Response)
    }
};

//funcao que busca pessoa por nome
export const buscaUsuarioPeloNomeNascimento = () => {
    let token = JSON.parse(localStorage.getItem('token'));
    const inputValue = document.querySelector("#input-busca").value;
    try {
        return fetch(`${alteraUrl()}${inputValue}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(resp => {
                if (resp.status === 401) {
                    RecebeToken(BuscandoUsuarioPeloNomeouData());
                }
                if (resp.ok) {
                    return resp.json();
                }
            })
            .then(data => {
                if (data == 0) {
                    swal('Aniversariante não cadastrado!')
                }
                return data;
            })
            .catch(err => {
                throw new Error('Nao foi possível conectar');
            })
    } catch {
        console.err(Response)
    }
};

//funcao que pega todas as pessoas
export const carregarImagem = () => {
    let token = JSON.parse(localStorage.getItem('token'));
    try {
        return fetch(urlBase64, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(resp => {
                    return resp.json();
            })
            .then(data => {
                return data;
            })
            .catch(err => {
                throw new Error('Nao foi possível conectar');
            })
    } catch {
        console.err(Response)
    }

};
