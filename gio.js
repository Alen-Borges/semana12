document.addEventListener("DOMContentLoaded", () => {
    let frame = document.getElementById("frame");
    let userSelect = document.getElementById("userSelect");
    let commentInput = document.getElementById("commentInput");
    let addCommentBtn = document.getElementById("addCommentBtn");

    let companias = [];

    fetch("https://nataliasotelo.github.io/act-estrellas/estrellas.json")
        .then(response => response.json())
        .then(data => {
            companias = data;
            mostrarUsuarios();
            llenarSelectUsuarios();
        });

    function generarEstrellas(cantidad) {
        let estrellasHTML = "";
        for (let i = 1; i <= 5; i++) {
            estrellasHTML += i <= cantidad
                ? `<i class="bi bi-star-fill text-warning"></i>`
                : `<i class="bi bi-star text-secondary"></i>`;
        }
        return estrellasHTML;
    }

    function mostrarUsuarios() {
        frame.innerHTML = "";
        companias.forEach((persona, index) => {
            frame.innerHTML += `
            <div class="col-md-4">
                <div class="card p-3 shadow-sm h-100">
                    <h4>${persona.name}</h4>
                    <h6 class="text-muted">${persona.company}</h6>
                    <p>${generarEstrellas(persona.numberrange)}</p>
                    <ul class="comments list-group" id="comments-${index}">
                        ${persona.comentarios?.map(c => `<li class="list-group-item">${c}</li>`).join("") || ""}
                    </ul>
                </div>
            </div>
            `;
        });
    }

    function llenarSelectUsuarios() {
        userSelect.innerHTML = companias
            .map((persona, index) => `<option value="${index}">${persona.name}</option>`)
            .join("");
    }

    addCommentBtn.addEventListener("click", () => {
        let selectedIndex = userSelect.value;
        let comment = commentInput.value.trim();

        if (comment === "") return;

        if (!companias[selectedIndex].comentarios) {
            companias[selectedIndex].comentarios = [];
        }
        companias[selectedIndex].comentarios.push(comment);

        commentInput.value = "";
        mostrarUsuarios();
        llenarSelectUsuarios();
    });
});