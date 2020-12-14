const telefone = document.querySelector('input#tel-login');
VMasker(telefone).maskPattern("(99) 9 9999-9999");

const button = document.querySelector('#btn-logar');



button.addEventListener('click', login)

const limpaCampos = (parametro) => parametro.value = '';


async function login() {
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

        const response = await enviarLogin(usuario);

        if (response.erro){
            const popup = document.querySelector('.popup-error-container')
            const msg = document.querySelector('.message')
            popup.style.display = 'flex'   
            msg.innerText = response.erro
        }
        else{
            const nome=response.nome
            const id = response.id
            console.log(nome,id)
            sessionStorage.setItem('id',id)
            sessionStorage.setItem('nome',nome)
    
            console.log(sessionStorage.getItem('nome'),sessionStorage.getItem('id'))
            
            window.location.href='./produtos.html' 
        }
    }
}


const enviarLogin = async (body) => {
     const senha = body.senha
     const telefone = body.telefone


    const response = await axios.post('https://us-central1-casamento-thalita.cloudfunctions.net/app/login',{telefone,senha})

    // const response = await axios.post('http://localhost:5001/casamento-thalita/us-central1/app/login',{telefone,senha})
    const data = response.data
    return data
}