const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

function botaoDentro(event){
    if(event.type === "touchstart"){
        event.preventDefault();
    }
    event.stopPropagation();
    nav.classList.tooggle("active");
    botaoFora(menu, () => {
        nav.classList.remove("active");
        mudarAria();
    });
    mudarAria();
}

function botaoFora(targetElement, callback){
    const html = document.documentElement;
    function clickHTML(event){
        if(!targetElement.contains(event.target)){
            targetElement.removeAttribute("data-target");
            html.removeEventListener("click", clickHTML);
            html.removeEventListener("touchstart", clickHTML);
            callback();
        }
    }

    if(!targetElement.hasAttribute("data-target")){
        html.addEventListener("click", clickHTML);
        html.addEventListener("touchstart", clickHTML);
        targetElement.setAttribute("data-target", "");
    }
}

function mudarAria(){
    const ativo = nav.classList.contains("active");
    btnMenu.setAttribute("aria-expanded", ativo);
    if(ativo){
        btnMenu.setAttribute("aria-label", "Fechar Menu");
    }else{
        btnMenu.setAttribute("aria-label", "Abrir Menu");
    }
}

btnMenu.addEventListener("click", botaoDentro);
btnMenu.addEventListener("touchstart", botaoDentro);