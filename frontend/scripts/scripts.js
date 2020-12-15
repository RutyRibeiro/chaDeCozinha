function getUsername(){
    const user = document.querySelector('#username')
    user.innerText = (sessionStorage.getItem('nome')).split(' ')[0]
}
window.addEventListener('load', getUsername)
