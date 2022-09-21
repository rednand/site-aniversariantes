import {
    BuscandoUsuarioPeloCPF,
    deletandoUsuario,
    editandoUsuario
} from './editar-deletar.js'

let dom = "debe";
let endpointlogin = 'https://' + dom + '-189-8-4-21.ngrok.io/login';
let endpointcpf = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa/cpf/';
let urlDeleta = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa/';

//funcao que pega token em /login
export const RecebeToken = (callback) => {
    fetch(endpointlogin, {
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
                let form = document.querySelector(".form-section");
                form.style.display = 'none';
                let botao = document.querySelector("#exclusao");
                botao.style.display = 'none';
                let containerload = document.querySelector("#mostra-infos");
                containerload.style.display = 'none';
                containerload.style.display = "inline-block";
                containerload.style.width = "90%"
                containerload.style.margin = "5% 5%"
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

//funcao que busca cadastro por CPF
export const buscarCadastroporCPF = () => {
    let token = JSON.parse(localStorage.getItem('token'));
    const inputcpf = document.querySelector("#cpf").value;
    try {
        return fetch(`${endpointcpf}${inputcpf}`, {
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
                    RecebeToken(BuscandoUsuarioPeloCPF());
                }
                if (resp.status === 204) {
                    swal("Usuário não cadastrado!")
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


var botaoupload = document.querySelector('[data-foto]');

botaoupload.addEventListener("change", function () {
    const reader = new FileReader(); //converte o file em dado
    reader.addEventListener("load", () => {
        sessionStorage.setItem("image", reader.result);
    })

    reader.readAsDataURL(this.files[0]);

    var imagem = sessionStorage.setItem("image");

})

//funcao que edita usuário
export const editarUsuario = (nome, email, cpf, nascimento, base64) => {
    let token = JSON.parse(localStorage.getItem('token'));
    let idLS = sessionStorage.getItem('id');
    let cpfpromptalterando = sessionStorage.getItem('cpfALTERACAO');
    try {
        return fetch(`${urlDeleta}${idLS}/${cpfpromptalterando}`, {
                method: 'PUT',
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    cpf: cpf,
                    nascimento: nascimento,
                    base64: base64
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(resp => {
                if (resp.status === 401) {
                    RecebeToken(editandoUsuario());
                }
                if (resp.ok) {
                    swal('Cadastro alterado!')
                        .then(() => {
                            BuscandoUsuarioPeloCPF();
                        })
                }
                if (!resp.ok) {
                    swal('CPF incorreto!')
                }
            })
            .catch(err => {
                throw new Error('Nao foi possível conectar');
            })
    } catch {
        console.err(Response)
    }
};


//funcao que deleta pessoa
export const deletaUsuario = (id) => {
    let token = JSON.parse(localStorage.getItem('token'));
    let idLS = sessionStorage.getItem('id');
    let cpfpromptlsget = sessionStorage.getItem('cpf');
    try {
        return fetch(`${urlDeleta}${idLS}/${cpfpromptlsget}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(resp => {
                if (resp.status === 401) {
                    RecebeToken(deletandoUsuario());
                }
                if (resp.ok) {
                    swal("Usuário deletado com sucesso!")
                        .then(() => {
                            window.location.href = "./index.html";
                        })
                } else {
                    swal("CPF incorreto");
                }
            })
            .catch(err => {
                throw new Error('Nao foi possível conectar');
            })
    } catch {
        console.err(Response)
    }
};