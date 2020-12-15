const telefone = document.querySelector('input#tel-login');
VMasker(telefone).maskPattern("(99) 9 9999-9999");

const button = document.querySelector('#btn-logar');
const popupLoading = document.querySelector('.popup-loading');
const popupLoadingContainer = document.querySelector('.popup-loading-container');
const textLoading = popupLoading.querySelector('h3');


const loading = document.createElement('div');
    loading.style.width = '90px';   
    loading.id = 'loading'; 

const loadingIcon = document.createElement('img');
    loadingIcon.src = './img/loading-icon-white.svg';
    loadingIcon.style.width = '100%';
    loadingIcon.style.height = '100%';

loading.appendChild(loadingIcon)


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

        popupLoadingContainer.style.display = 'flex';
        
    
       
    

        const response = await enviarLogin(usuario);

        if (response.erro){
            const popup = document.querySelector('.popup-error-container')
            const msg = document.querySelector('.message')        
            popupLoadingContainer.style.display = 'none';
            popup.style.display = 'flex'   ;
            msg.innerText = response.erro

            
        }
        else{
            textLoading.innerText = 'Carregando Produtos...'
            textLoading.style.color = 'black'
            const nome = response.nome
            const id = response.id
            sessionStorage.setItem('id',id)
            sessionStorage.setItem('nome',nome)
            popupLoadingContainer.remove();
    
            
            window.location.href='./produtos.html' 
        }
    }
}


const enviarLogin = async (body) => {
    const senha = body.senha
    const telefone = body.telefone
    popupLoading.appendChild(loading)
    popupLoading.style.display = 'flex'
    popupLoading.style.alignItems = 'center'
    popupLoading.style.flexDirection = 'column'
    

   

    const response = await axios.post('https://us-central1-casamento-thalita.cloudfunctions.net/app/login',{telefone,senha})

    // const response = await axios.post('http://localhost:5001/casamento-thalita/us-central1/app/login',{telefone,senha})
    const data = response.data
    return data
}