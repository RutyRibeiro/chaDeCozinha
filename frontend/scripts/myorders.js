const main = document.querySelector('main')
const wrapperItems = document.querySelector('.wrapper-items');
const idUsuario = sessionStorage.getItem('id')
const popupLoading = document.querySelector('.popup-loading');
const popupLoadingContainer = document.querySelector('.popup-loading-container');
const textLoading = popupLoading.querySelector('h3');
const loading = document.createElement('div')
loading.style.width = '90px'
loading.id = 'loading'
const loadingIcon = document.createElement('img')
loadingIcon.src = './img/loading-icon-white.svg'
loadingIcon.style.width = '100%'
loadingIcon.style.height = '100%'


loading.appendChild(loadingIcon)


const criaContainerOrders = (json) => {
    const loading = document.querySelector('#loading');
    loading.style.display = 'none';
    if (json == ''){
        const aviso = document.createElement('h4')
        aviso.innerText = 'Nenhum produto selecionado ';
        wrapperItems.appendChild(aviso)
    }else {
        json.map(obj => {
            console.log('a')
            const order = document.createElement('div');
            order.classList.add('order');
    
            const imageDescription = document.createElement('div');
            imageDescription.classList.add('image-description');
    
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper');
    
            const img = document.createElement('img');
            img.src = obj.img_produto;
    
            imageWrapper.appendChild(img);
    
            imageDescription.appendChild(imageWrapper)
    
            const descriptionWrapper = document.createElement('div');
            descriptionWrapper.innerText = obj.nome_produto;
            descriptionWrapper.classList.add('description-wrapper')
    
            imageDescription.appendChild(descriptionWrapper)
            order.appendChild(imageDescription)
    
            const buttonContainers = document.createElement('div')
                buttonContainers.style.display = 'flex'
                buttonContainers.style.width='100%' 
                buttonContainers.style.alignItems = 'center'
                buttonContainers.style.justifyContent = 'space-between'
                buttonContainers.style.marginTop = '10px'
    
                
    
            const sales = document.createElement("a");
            sales.classList.add("sales");
            sales.innerText = "Ver Ofertas";
            const newName = obj.nome_produto.replaceAll(" ", "+");
            const link = `https://escorregaopreco.com.br/search/${newName}__sortBy-pricemin+descending-false+period-30day+page-1`;
            sales.target = "_blank";
            sales.href = link;
    
    
            const cancel = document.createElement('button')
                cancel.innerText = "Cancelar Escolha"
                cancel.classList.add('cancel')
                cancel.id = `product${obj.id_produto}`
                cancel.addEventListener('click',() => {cancelarPedidio(cancel.id)})
    
            buttonContainers.appendChild(cancel)
            buttonContainers.appendChild(sales)
    
            order.appendChild(buttonContainers)
            wrapperItems.appendChild(order)})
        
    }
}

const cancelarPedidio = async (produtoID) => {
    loading.style.display = 'flex';
    const idProduto = produtoID.replace('product','')
    popupLoadingContainer.style.display = 'flex';
    document.body.style.overflow = "hidden";
    popupLoadingContainer.style.height = document.body.offsetHeight + 'px';
    popupLoading.appendChild(loading)
    popupLoading.style.display = 'flex'
    popupLoading.style.alignItems = 'center'
    popupLoading.style.flexDirection = 'column'

    const response = await axios.post(
        "https://us-central1-casamento-thalita.cloudfunctions.net/app/cancelar",
        { idProduto }
    );
    
    popupLoadingContainer.style.display = 'none'

  if (response.data.erro) {
    const popup = document.querySelector(".popup-error-container");
    const msg = document.querySelector(".message");
    popup.style.display = "flex";
    popup.style.height = document.body.offsetHeight + 'px';
    msg.innerHTML = response.data.erro ;
  } else {;
    const popup = document.querySelector(".popup-error-container")
    popup.style.height = document.body.offsetHeight + 'px';
    const msg = popup.querySelector("h3");
    msg.innerHTML= response.data 
    msg.innerHTML += '<br/>' + 'A página será recarregada &#128540'
    popup.style.display = "flex";

    setTimeout(() => {
        window.location.reload()
    },3000)
  }
}




const carregaProdutosSelecionados = async () => {
   
    wrapperItems.appendChild(loading)


    const response = await axios.post('https://us-central1-casamento-thalita.cloudfunctions.net/app/meusPedidos', { idUsuario })
    const data = response.data

    criaContainerOrders(data)


}


const verifyUser = () => {
    const popup = document.querySelector('.popup-error-container');
    const message = popup.querySelector('.message');


    if (sessionStorage.getItem('nome') == '' || sessionStorage.getItem('nome') == 'undefined' || sessionStorage.getItem('nome') == null) {
        popup.style.display = 'flex';
        message.innerHTML = 'Para ter acesso aos produtos é preciso estar logado <br/> Redirecionando para a página de Login &#128540'
        setTimeout(() => {
            return window.location.href = './'
        }, 5000)
    } else {
        carregaProdutosSelecionados()

    }
}

window.addEventListener('load', verifyUser)
