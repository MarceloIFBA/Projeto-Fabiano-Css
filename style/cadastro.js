document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault(); 

        const nome = document.querySelector("input[name='nome']").value;
        const email = document.querySelector("input[name='email']").value;
        const nomeUsuario = document.querySelector("input[name='nome_usuario']").value;
        const senha = document.querySelector("input[name='senha']").value;
        const confirmarSenha = document.querySelector("input[name='confirmar_senha']").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const dadosUsuario = {
            nome: nome,
            email: email,
            nomeUsuario: nomeUsuario,
            senha: senha
        };

        try {
            const resposta = await fetch("http://localhost:8080/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosUsuario)
            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            alert("Cadastro realizado com sucesso!");
            window.location.href = "home.html";
        } catch (erro) {
            alert("Falha no cadastro: " + erro.message);
        }
    });
});
