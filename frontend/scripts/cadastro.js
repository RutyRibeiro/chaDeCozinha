const button = document.querySelector('#btn-cadastrar')
button.addEventListener('click', cadastrar)

function limpaCampos(parametro) {
    parametro.value = ''
}
function cadastrar() {
    const nome = document.querySelector('input#nome-cadastro')
    const telefone = document.querySelector('input#tel-cadastro')
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
        console.log(nomeBD)
    }
}