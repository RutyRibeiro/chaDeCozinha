const button = document.querySelector('#btn-login')
button.addEventListener('click', login)


function limpaCampos(parametro) {
    parametro.value = ''
}


function login() {
    const telefone = document.querySelector('input#tel-login')
    const senha = document.querySelector('input#senha-login')

    if (telefone.value == '' || senha.value == '') {
        alert('Preencha todos os campos!')
    }
    else if ((telefone.value).length !== 12) {
        alert('Por favor insira a quantidade correta de caracteres')

    }
    else if ((senha.value).length < 5) {
        alert('Senha muito curta!')
        limpaCampos(senha)
        limpaCampos(confsenha)
    }


}