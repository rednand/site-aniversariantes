import {
    carregandoCardsNoIndex
} from './carrega-card-index.js'

let dom = "75a4";
let endpointLogin = 'https://' + dom + '-189-8-4-21.ngrok.io/login';
let endpointDia = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa/dia';
let endpointMes = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa/mes/'

//funcao que pega token em /login
const RecebeToken = (callback) => {
    fetch(endpointLogin, {
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
                swal('Não foi possível conectar no servidor')
            }
        }).then(data => {
            localStorage.setItem('token',
                JSON.stringify(data));
            callback();
        })    
};

//funcao que pega dados de api tvmaze
const carregaCardsNoIndex = () => {
    let token = JSON.parse(localStorage.getItem('token'));
    return fetch(endpointDia, {
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
                RecebeToken(carregandoCardsNoIndex);
            }
            if (resp.ok) {
                return resp.json();
            }
            return resp.json();
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new Error('Nao foi possível conectar');
        })
};
const carregaCardsNoIndexMes = () => {
    let token = JSON.parse(localStorage.getItem('token'));
    return fetch(endpointMes, {
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
                RecebeToken(carregandoCardsNoIndex);
            }
            if (resp.ok) {
                return resp.json();
            }
            return resp.json();
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            throw new Error('Nao foi possível conectar');
        })
};

// exportando para outro arquivo
export {
    RecebeToken,
    carregaCardsNoIndex,
    carregaCardsNoIndexMes
};


