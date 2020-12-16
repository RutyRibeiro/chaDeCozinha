const telefone = document.querySelector("input#tel-cadastro");
VMasker(telefone).maskPattern("(99) 9 9999-9999");

const button = document.querySelector("#btn-cadastrar");
button.addEventListener("click", cadastrar);

const popupLoading = document.querySelector(".popup-loading");
const popupLoadingContainer = document.querySelector(
    ".popup-loading-container"
);
const textLoading = popupLoading.querySelector("h3");

const loading = document.createElement("div");
loading.style.width = "90px";
loading.id = "loading";

const loadingIcon = document.createElement("img");
loadingIcon.src = "./img/loading-icon-white.svg";
loadingIcon.style.width = "100%";
loadingIcon.style.height = "100%";

loading.appendChild(loadingIcon);

function limpaCampos(parametro) {
    parametro.value = "";
}

async function cadastrar() {
    const nome = document.querySelector("input#nome-cadastro");
    const senha = document.querySelector("input#senha-cadastro");
    const confsenha = document.querySelector("input#confsenha-cadastro");

    if (
        nome.value == "" ||
        telefone.value == "" ||
        senha.value == "" ||
        confsenha.value == ""
    ) {
        alert("Preencha todos os campos!");
    } else if (senha.value.length < 5) {
        alert("Senha muito curta!");
        limpaCampos(senha);
        limpaCampos(confsenha);
    } else if (senha.value != confsenha.value) {
        alert("As senhas não coincidem!");
        limpaCampos(senha);
        limpaCampos(confsenha);
    } else {
        const nomeBD = nome.value.trim();
        const telefoneBD = telefone.value
            .replaceAll(" ", "")
            .replace(/[^0-9]/g, "");
        const senhaBD = senha.value;
        console.log(nomeBD, telefoneBD, senhaBD);

        popupLoadingContainer.style.display = "flex";
        popupLoading.appendChild(loading);
        popupLoading.style.display = "flex";
        popupLoading.style.alignItems = "center";
        popupLoading.style.flexDirection = "column";

        const response = await axios.post(
            "https://us-central1-casamento-thalita.cloudfunctions.net/app/cadastro", {
                nome: nomeBD,
                telefone: telefoneBD,
                senha: senhaBD
            }
        );
        // const response = await axios.post('http://localhost:5001/casamento-thalita/us-central1/app/cadastro', { "nome": nomeBD, "telefone": telefoneBD, "senha": senhaBD })

        popupLoadingContainer.style.display = "none";

        const data = response.data;

        if (data.erro) {
            const popup = document.querySelector(".popup-error-container");
            const msg = document.querySelector(".message");
            popup.style.display = "flex";
            msg.innerText = data.erro;
        } else {
            const popup = document.querySelector(".popup-cadastrado-container");
            popup.style.display = "flex";
            setTimeout(() => {
                return (window.location.href = "./index.html");
            }, 3000);
        }
    }
}