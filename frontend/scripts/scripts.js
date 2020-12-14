function getUsername(){
    const user = document.querySelector('#username')
    user.innerText = sessionStorage.getItem('nome')
}
window.addEventListener('load', getUsername)


const close = document.querySelector('.close-popup')
close.addEventListener('click', ()=>{
    const popup = document.querySelector('.popup-error-container')
    popup.style.display = 'none'
})