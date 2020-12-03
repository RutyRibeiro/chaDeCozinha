
const carregaProdutos = async () => {
    const response = await axios.get('http://201.74.113.36:3001/')
    const data = response.data
    criaContainerItems(data.resultado);
}

const criaContainerItems = (json) => {
    const main = document.querySelector('main')
    json.map(obj => {
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
        textDescription.innerText = obj.descricao_produto;

        productDescription.appendChild(textDescription)

        descriptionElements.appendChild(productDescription)

        const sales = document.createElement('div')
        sales.classList.add('sales')
        sales.innerText = 'Ver Ofertas'


        containerItems.appendChild(imageDescription)
        containerItems.appendChild(sales)
        main.appendChild(containerItems)
    })




}

document.addEventListener('DOMContentLoaded', carregaProdutos)
