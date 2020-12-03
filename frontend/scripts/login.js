const telefone = document.querySelector('input#tel-login');
VMasker(telefone).maskPattern("(99) 9 9999-9999");

const button = document.querySelector('#btn-logar');



button.addEventListener('click', login)

function limpaCampos(parametro) {
    parametro.value = ''
}


function login() {
    const senha = document.querySelector('input#senha-login')
    const telefoneBD = (telefone.value.replaceAll(' ', '')).replace(/[^0-9]/g, '')

    if (telefoneBD == '' || senha.value == '') {
        alert('Preencha todos os campos!')
    }
    else if (telefoneBD < 12) {
        console.log(telefoneBD.length)
        alert('Por favor insira a quantidade correta de caracteres')

    }
    else if ((senha.value).length < 5) {
        alert('Senha muito curta!')
        limpaCampos(senha)
    } else {
        const senhaBD = senha.value
        const usuario = {
            "senha": senhaBD,
            "telefone": telefoneBD
        }
        console.log(usuario);
    }


}