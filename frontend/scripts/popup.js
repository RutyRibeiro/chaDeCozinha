const close = document.querySelectorAll('.close-popup')

Array.from(close).map( elemento => {
    elemento.addEventListener('click', (event)=>{
        event.path[3].style.display = 'none'
        document.body.style.overflow = 'auto'
    })
})