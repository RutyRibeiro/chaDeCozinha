const main = document.querySelector('main')
const wrapperItems = document.querySelector('.wrapper-items');



const criaContainerOrders = ( json ) => {
    const loading = document.querySelector('#loading');
    loading.style.display = 'none';

    json.map (obj => {
        
        const order = document.createElement('div');
            order.classList.add('order');

        const imageDescription = document.createElement('div');
            imageDescription.classList.add('image-description');

        const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper');

        const img = document.createElement('img');
            img.src=obj.img_produto;

        imageWrapper.appendChild(img);

        imageDescription.appendChild(imageWrapper)

        const descriptionWrapper = document.createElement('div');
            descriptionWrapper.innerText = obj.nome_produto;
            descriptionWrapper.classList.add('description-wrapper')

        imageDescription.appendChild(descriptionWrapper)
        order.appendChild(imageDescription)
        
        const cancel = document.createElement('button')
            cancel.innerText = "Cancelar Escolha"
            cancel.classList.add('cancel')

        order.appendChild(cancel)
        wrapperItems.appendChild(order)
    })
}


const carregaProdutosSelecionados = async () => {
    const loading = document.createElement('div')
    loading.style.width = '90px'
    loading.id = 'loading'
    const loadingIcon = document.createElement('img')
    loadingIcon.src = './img/loading-icon-white.svg'
    loadingIcon.style.width = '100%'
    loadingIcon.style.height = '100%'


    loading.appendChild(loadingIcon)
    wrapperItems.appendChild(loading)

    const idUsuario = sessionStorage.getItem('id')

    const response = await axios.post('http://localhost:5001/casamento-thalita/us-central1/app/meusPedidos',{idUsuario})
    const data = response.data

    criaContainerOrders(data)


}


const verifyUser = () => {
    const popup = document.querySelector('.popup-error-container');
    const message = popup.querySelector('.message');


    if (sessionStorage.getItem('nome') == '' ||  sessionStorage.getItem('nome') == 'undefined' || sessionStorage.getItem('nome') == null) {
        popup.style.display = 'flex'   ;
        message.innerHTML = 'Para ter acesso aos produtos é preciso estar logado <br/> Redirecionando para a página de Login &#128540'
        setTimeout(() => {
            return window.location.href = './'
        },5000)
    }else {
        carregaProdutosSelecionados()
        
    }
}

window.addEventListener('load',verifyUser)
