const telefone = document.querySelector('input#tel-cadastro');
VMasker(telefone).maskPattern("(99) 9 9999-9999");

const button = document.querySelector('#btn-cadastrar')
button.addEventListener('click', cadastrar)

function limpaCampos(parametro) {
    parametro.value = ''
}

async function cadastrar() {
    const nome = document.querySelector('input#nome-cadastro')
    const senha = document.querySelector('input#senha-cadastro')
    const confsenha = document.querySelector('input#confsenha-cadastro')



    if (nome.value == '' || telefone.value == '' || senha.value == '' || confsenha.value == '') {
        alert('Preencha todos os campos!')
    }
    else if ((senha.value).length < 5) {
        alert('Senha muito curta!')
        limpaCampos(senha)
        limpaCampos(confsenha)
    }
    else if (senha.value != confsenha.value) {
        alert('As senhas não coincidem!')
        limpaCampos(senha)
        limpaCampos(confsenha)
    }
    else {
        const nomeBD = nome.value.trim()
        const telefoneBD = (telefone.value.replaceAll(' ', '')).replace(/[^0-9]/g, '')
        const senhaBD = senha.value
        console.log(nomeBD, telefoneBD, senhaBD)
        // const response = await axios.post('https://us-central1-casamento-thalita.cloudfunctions.net/app/cadastro', { "nome": nomeBD, "telefone": telefoneBD, "senha": senhaBD })
        const response = await axios.post('http://localhost:5001/casamento-thalita/us-central1/app/cadastro', { "nome": nomeBD, "telefone": telefoneBD, "senha": senhaBD })
        const data = response.data
        console.log(response)
        if (data.erro){
            const popup = document.querySelector('.popup-error-container')
            const msg = document.querySelector('.message')       
            popup.style.display = 'flex'   ;
            msg.innerText = data.erro
        }
        else{
            const popup = document.querySelector('.popup-cadastrado-container')       
            popup.style.display = 'flex'   ;
        }
    }
}