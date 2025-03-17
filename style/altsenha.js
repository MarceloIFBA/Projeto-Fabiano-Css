document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const senhaAtual = document.getElementById("senha-atual").value;
        const novaSenha = document.getElementById("nova-senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem. Tente novamente.");
            return;
        }

        const dados = {
            senhaAtual,
            novaSenha
        };

        try {
            const response = await fetch("http://localhost/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error("Erro ao alterar a senha.");
            }

            const resultado = await response.json();
            alert(resultado.mensagem || "Senha alterada com sucesso!");
            form.reset();

        } catch (erro) {
            console.error("Erro:", erro);
            alert("Ocorreu um erro ao alterar a senha.");
        }
    });
});