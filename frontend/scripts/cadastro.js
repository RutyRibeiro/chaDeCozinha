const telefone = document.querySelector('input#tel-cadastro');
VMasker(telefone).maskPattern("(99) 9 9999-9999");

const button = document.querySelector('#btn-cadastrar')
button.addEventListener('click', cadastrar)

function limpaCampos(parametro) {
    parametro.value = ''
}

function cadastrar() {
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
        console.log(nomeBD)
        console.log(senha.value);
        console.log(telefoneBD);
    }
}