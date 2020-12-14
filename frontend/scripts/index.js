const main = document.querySelector('main')

const carregaProdutos = async () => {
    const loading = document.createElement('div')
    loading.style.width = '90px'
    loading.id = 'loading'
    const loadingIcon = document.createElement('img')
    loadingIcon.src = './img/loading-icon.svg'
    loadingIcon.style.width = '100%'
    loadingIcon.style.height = '100%'

    loading.appendChild(loadingIcon)
    main.appendChild(loading)
    const response = await axios.get('https://us-central1-casamento-thalita.cloudfunctions.net/app')
    const data = response.data
    criaContainerItems(data);
}

const criaContainerItems = async (json) => {
    const loading = document.querySelector('#loading')
    await json.map(obj => {
        const containerItems = document.createElement('div')
        containerItems.classList.add('container-items')

        const imageDescription = document.createElement('div')
        imageDescription.classList.add('image-description')

        containerItems.appendChild(imageDescription)

        const imgWrapper = document.createElement('div')
        imgWrapper.classList.add('img-wrapper')


        const productImage = document.createElement('img')
        productImage.classList.add('product-image')
        productImage.src = obj.img_produto;

        imgWrapper.appendChild(productImage)

        imageDescription.appendChild(imgWrapper)

        const descriptionElements = document.createElement('div')
        descriptionElements.classList.add('description-elements')

        imageDescription.appendChild(descriptionElements)

        const productName = document.createElement('div')
        productName.classList.add('product-name')

        const name = document.createElement('h4');
        name.innerText = obj.nome_produto;
        productName.appendChild(name)

        descriptionElements.appendChild(productName)

        const productDescription = document.createElement('div')
        productDescription.classList.add('product-description')

        const textDescription = document.createElement('p')
        textDescription.innerHTML = obj.descricao_produto;
        

        productDescription.appendChild(textDescription)

        descriptionElements.appendChild(productDescription)


        const buttons = document.createElement('div')
        buttons.classList.add('buttons')


        const choose = document.createElement('a')
        choose.classList.add('choose')
        choose.id = `product${obj.id_produto}`
        choose.innerText='Escolher'
        choose.addEventListener('click',() => {
            sendConfirmBack(choose.id,userID)
        })


        const sales = document.createElement('a')
        sales.classList.add('sales')
        sales.innerText = 'Ver Ofertas'
        const newName = obj.nome_produto.replaceAll(' ','+')
        const link =`https://escorregaopreco.com.br/search/${newName}__sortBy-relevance+descending-true+page-1`
        sales.target = '_blank'
        sales.href = link

        buttons.appendChild(choose)
        buttons.appendChild(sales)

        containerItems.appendChild(imageDescription)
        containerItems.appendChild(buttons)
        main.appendChild(containerItems)
    })

    const backToTop = document.querySelector('.backToTop')
    backToTop.classList.add('appear')

  
    loading.remove();
}

window.addEventListener('load', carregaProdutos)


const sendConfirmBack = (productID, userID) => {
    const id = productID.replace('product','')
    console.log(userID,productID, id)
}

const verifyUser = () => {
    
}