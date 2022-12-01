class FormEnviar{
    constructor(config){
        this.config = config;
        this.form = document.querySelector(config.form);
        this.botao = document.querySelector(config.button);
        if(this.form){
            this.url = this.form.getAttribute("action");
        }
        this.enviarForm = this.enviarForm.bind(this);
    }
    sucessoFuncao(){
        this.form.innerHTML = this.config.success;
    }
    falhaFuncao(){
        this.form.innerHTML = this.config.error;
    }

    pegarObjetosForm(){
        const objetoForm = {};
        const camposDados = this.form.querySelectorAll("[name]");
        camposDados.forEach((campo) => {
            objetoForm[campo.getAttribute("name")] = campo.value;
        });
        return objetoForm;
    }
    aoEnvio(evento){
        evento.preventDefault();
        evento.target.disabled = true;
        evento.target.innerText = "Enviando...";
    }

    async enviarForm(evento){
        try{
            this.aoEnvio(evento);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.pegarObjetosForm()),
            });
            this.sucessoFuncao();
        }catch(error){
            this.falhaFuncao();
            throw new Error(error);
        }
    }

    init(){
        if(this.form){
            this.botao.addEventListener("click", () => this.enviarForm);
            return this;
        }
    }
}

const formEnviar = new FormEnviar({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='sucesso'>Mensagem enviada com sucesso!</h1>",
    error: "<h1 class='erro'>Não foi possível enviar sua mensagem.</h1>",
});
formEnviar.init();