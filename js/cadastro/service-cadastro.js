let dom = "75a4";
let url = 'https://' + dom + '-189-8-4-21.ngrok.io/login';
let url2 = 'https://' + dom + '-189-8-4-21.ngrok.io/pessoa';

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
                swal('Não foi possível conectar-se ao servidor')
            }
        }).then(data => {
            localStorage.setItem('token',
                JSON.stringify(data));
            callback;
        })
};

var botaoupload = document.querySelector('[data-foto]');

botaoupload.addEventListener("change", function () {
    const reader = new FileReader(); //converte o file em dado
    reader.addEventListener("load", () => {
        sessionStorage.setItem("recent-image", reader.result);
    })

    reader.readAsDataURL(this.files[0]);

    var imagem = sessionStorage.setItem("recent-image");

})

export const inserirPessoasnaAPI = (nome, cpf, email, nascimento, base64) => {
    let token = JSON.parse(localStorage.getItem('token'));
    fetch(url2, {
            method: 'POST',
            body: JSON.stringify({
                nome: nome,
                cpf: cpf,
                email: email,
                nascimento: nascimento,
                base64: base64
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            swal(`Você se cadastrou com sucesso, ${data.nome}`)
                .then((value) => {
                    window.location.href = "./busca.html";
                })

            return data;
        })
}