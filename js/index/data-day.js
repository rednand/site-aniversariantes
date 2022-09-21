const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let data = new Date();
document.querySelector("#date").innerHTML = `${data.getDate()} de ${meses[(data.getMonth())]} de ${data.getFullYear()}`;

function alteraPeriodo() {

    var select = document.querySelector('#select-birthday');
    var value = select.options[select.selectedIndex].value;

    if (value == "today") {
        document.querySelector("#month-section").style.display = "none";
        document.querySelector('#second-section').style.display = "";

    } else if (value == "month") {
        document.querySelector("#second-section").style.display = "none";
        document.querySelector("#month-section").style.display = "inline";
       }
}