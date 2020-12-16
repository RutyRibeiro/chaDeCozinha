const main = document.querySelector("main");
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

const carregaProdutos = async () => {
  const loading = document.createElement("div");
  loading.style.width = "90px";
  loading.id = "loading";
  const loadingIcon = document.createElement("img");
  loadingIcon.src = "./img/loading-icon.svg";
  loadingIcon.style.width = "100%";
  loadingIcon.style.height = "100%";

  loading.appendChild(loadingIcon);
  main.appendChild(loading);
  const response = await axios.get(
    "https://us-central1-casamento-thalita.cloudfunctions.net/app"
  );
  // const response = await axios.get(
  //   "http://localhost:5001/casamento-thalita/us-central1/app"
  // );
  const data = response.data;
  criaContainerItems(data);
};

const criaContainerItems = async (json) => {
  const loading = document.querySelector("#loading");
  await json.map((obj) => {


    const containerItems = document.createElement("div");
    containerItems.classList.add("container-items");

    const imageDescription = document.createElement("div");
    imageDescription.classList.add("image-description");

    containerItems.appendChild(imageDescription);

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img-wrapper");

    const productImage = document.createElement("img");
    productImage.classList.add("product-image");
    productImage.src = obj.img_produto;

    imgWrapper.appendChild(productImage);

    imageDescription.appendChild(imgWrapper);

    const descriptionElements = document.createElement("div");
    descriptionElements.classList.add("description-elements");

    imageDescription.appendChild(descriptionElements);

    const productName = document.createElement("div");
    productName.classList.add("product-name");

    const name = document.createElement("h4");
    name.innerText = obj.nome_produto;
    productName.appendChild(name);

    descriptionElements.appendChild(productName);

    const productDescription = document.createElement("div");
    productDescription.classList.add("product-description");

    const textDescription = document.createElement("p");
    textDescription.innerHTML = obj.descricao_produto;

    productDescription.appendChild(textDescription);

    descriptionElements.appendChild(productDescription);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const choose = document.createElement("a");
    if (obj.comprado == 1) {
      choose.classList.add('alreadySelected')
      choose.innerText = "Indisponível";
    } else {
      choose.id = `product${obj.id_produto}`;
      choose.innerText = "Escolher";
      choose.addEventListener("click", () => {
        sendConfirmBack(choose.id);
      });

    }
    choose.classList.add("choose");

    const sales = document.createElement("a");
    sales.classList.add("sales");
    sales.innerText = "Ver Ofertas";
    const newName = obj.nome_produto.replaceAll(" ", "+");
    const link = `https://escorregaopreco.com.br/search/${newName}__sortBy-pricemin+descending-false+period-30day+page-1`;
    sales.target = "_blank";
    sales.href = link;

    buttons.appendChild(choose);
    buttons.appendChild(sales);

    containerItems.appendChild(imageDescription);
    containerItems.appendChild(buttons);
    main.appendChild(containerItems);

  });

  const backToTop = document.querySelector(".backToTop");
  backToTop.classList.add("appear");

  loading.remove();
};

const sendConfirmBack = async (productID) => {
  const idProduto = productID.replace("product", "");
  const idUsuario = sessionStorage.getItem("id");

  popupLoadingContainer.style.display = 'flex';
  document.body.style.overflow = "hidden";
  popupLoadingContainer.style.height = document.body.offsetHeight + 'px';
  popupLoading.appendChild(loading)
  popupLoading.style.display = 'flex'
  popupLoading.style.alignItems = 'center'
  popupLoading.style.flexDirection = 'column'

  const response = await axios.post(
    "https://us-central1-casamento-thalita.cloudfunctions.net/app/escolher",
    { idUsuario, idProduto }
  );
  popupLoadingContainer.style.display = 'none'

  if (response.data.erro) {
    const popup = document.querySelector(".popup-error-container");
    const msg = document.querySelector(".message");
    popup.style.display = "flex";
    popup.style.height = document.body.offsetHeight + 'px';
    msg.innerHTML = response.data.erro;

    if (response.data.erro == 'Não foi possível escolher este produto pois já foi escolhido por outro usuário') {
      msg.innerHTML += '<br/>' + 'A página será recarregada &#128540'
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
    else {
      setTimeout(() => {
        popup.style.display = 'none'
        document.body.style.overflow = 'auto'

      }, 3000)
    }

  } else {
    const popup = document.querySelector(".popup-error-container");
    popup.style.height = document.body.offsetHeight + 'px';
    const msg = popup.querySelector("h3");
    popup.style.display = "flex";
    msg.style.colo = '#000';
    msg.innerHTML = "Produto escolhido" + '<br/>' + 'A página será recarregada &#128540';

    setTimeout(() => {
      window.location.reload();
    }, 2000);


  }
};

const verifyUser = () => {
  const popup = document.querySelector(".popup-error-container");
  const message = popup.querySelector(".message");

  if (
    sessionStorage.getItem("nome") == "" ||
    sessionStorage.getItem("nome") == "undefined" ||
    sessionStorage.getItem("nome") == null
  ) {
    popup.style.display = "flex";
    message.innerHTML =
      "Para ter acesso aos produtos é preciso estar logado <br/> Redirecionando para a página de Login &#128540";
    setTimeout(() => {
      return (window.location.href = "./");
    }, 5000);
  } else {
    carregaProdutos();
  }
};
window.addEventListener("load", verifyUser);
