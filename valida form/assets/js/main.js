class ValidaFormulario {
    constructor(){
        this.formumario = document.querySelector('.formulario');

        this.eventos();
    }

    eventos(){
        this.formumario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.isValid();
        const senhasValidas= this.passwordValid();

        if(camposValidos && senhasValidas){
            alert('Formulário enviado');
            this.formumario.submit();
        }
    }
    passwordValid(){
        let valid = true;

        const senha = this.formumario.querySelector('.senha');
        const repetirSenha = this.formumario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value){
            valid = false;

            this.createError(senha, 'Campos senha e repetir senha precisam ser iguais.');
            this.createError(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.');
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false;
            this.createError(senha, 'A senha precisa ter entre 6 e 12 caracteres.');
        }

        return valid;
    }
    isValid(){
        let valid = true;

        for(let errorText of this.formumario.querySelectorAll('.error-text')){
            errorText.remove();
        }
        for(let campo of this.formumario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText;
            if (!campo.value) {
                this.createError(campo, `Campo ${label} não pode estar em branco`)
                valid = false;
            }
            if (campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false;
            }
            if (campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
        }

        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Usuário deverá ter entre 3 e 12 caracteres.');
            valid = false
        }
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(campo, 'Usuário só poderá conter letras e/ou números');
            valid = false
        }
        return valid
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);
    
        if(!cpf.valida()) {
          this.createError(campo, 'CPF inválido.');
          return false;
        }
    
        return true;
      }
    createError(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);

    }

}

const valida = new ValidaFormulario();