var valor1 = Math.floor((Math.random() * 10) + 1);
var valor2 = Math.floor((Math.random() * 10) + 1);
document.getElementById("valor1").innerHTML = valor1;
document.getElementById("valor2").innerHTML = valor2;
document.getElementById('totalvalores').onchange = function () {
    validar()
}
function validar() {
    var totalvalores = document.getElementById("totalvalores").value;
    if (totalvalores == valor1 + valor2) {
        document.querySelector('#aviso').innerHTML = "CAPTCHA válido";
        document.querySelector("#aviso").style.color = "green"
        document.querySelector("#captcha").style.display = "none";
    } else {
        document.querySelector('#aviso').innerHTML = "CAPTCHA inválido. Tente novamente.";
    }
}