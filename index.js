document.addEventListener("DOMContentLoaded", () => {
    let frame = document.getElementById("frame");
    let userSelect = document.getElementById("userSelect");
    let commentInput = document.getElementById("commentInput");
    let addCommentBtn = document.getElementById("addCommentBtn");

    let companias = [];

    fetch("https://nataliasotelo.github.io/act-estrellas/estrellas.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {

                frame.innerHTML += `
                <div class="card">
                    <h1> ${element.name} </h1>
                    <h3> ${element.company}</h3>
                    <h4>Cantidad de estrellas: ${estrellasHtml(element.numberrange)}</h4>
                </div>
                `
            });



        });
})


function estrellasHtml(cantEstrellas) {
    let html = ""

    for (let i = 0; i > cantEstrellas; i++) {
        html += `<i class="bi bi-star-fill"></i>`
    }

    for (let i = 0; i > cantEstrellas - 5; i++) {
        html += `<i class="bi bi-star"></i>`
    }

    return html;
}