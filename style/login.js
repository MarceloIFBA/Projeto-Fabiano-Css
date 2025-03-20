document.addEventListener("DOMContentLoaded", function () {
    const botaoEntrar = document.querySelector(".botao_entrar");

    botaoEntrar.addEventListener("click", async function (event) {
        event.preventDefault(); 
    
        
        const identificador = document.querySelector("input[name='identificador']").value;
        const senha = document.querySelector("input[name='senha']").value;

        
        if (!identificador || !senha) {
            alert("Por favor, preencha todos os campos antes de continuar!");
            return;
        }

        try {
            
            const response = await fetch("http://localhost:8080/clientes");
            
            if (!response.ok) {
                throw new Error("Erro ao conectar ao servidor!");
            }

            const usuarios = await response.json();

            const usuarioValido = usuarios.find(usuario => 
                (usuario.email === identificador || usuario.usuario === identificador) &&
                usuario.senha === senha
            );

            if (usuarioValido) {
                alert("Login realizado com sucesso!");
                window.location.href = "home.html"; 
            } else {
                alert("Usuário ou senha incorretos!");
            }
        } catch (error) {
            console.error("Erro ao validar login:", error);
            alert("Ocorreu um erro ao verificar suas credenciais. Tente novamente mais tarde.");
        }
    });
});