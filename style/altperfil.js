document.addEventListener("DOMContentLoaded", function () {
    const fotoInput = document.getElementById("foto");
    const nomeInput = document.getElementById("usuario");
    const botaoSalvar = document.querySelector(".botao");

    // Adicionar preview da imagem
    fotoInput.addEventListener("change", function () {
        const file = fotoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                let preview = document.querySelector(".foto-preview");
                if (!preview) {
                    preview = document.createElement("img");
                    preview.classList.add("foto-preview");
                    preview.style.maxWidth = "100px";
                    preview.style.display = "block";
                    preview.style.margin = "10px auto";
                    document.querySelector(".foto-perfil").appendChild(preview);
                }
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Evento de clique no botão salvar
    botaoSalvar.addEventListener("click", async function () {
        const novoNome = nomeInput.value.trim();
        const fotoArquivo = fotoInput.files[0];

        if (novoNome === "") {
            alert("Por favor, insira um novo nome de usuário.");
            return;
        }

        // Criando um FormData para enviar a imagem e o nome de usuário
        const formData = new FormData();
        formData.append("usuario", novoNome);
        if (fotoArquivo) {
            formData.append("foto", fotoArquivo);
        }

        try {
            const response = await fetch("http://localhost/clientes", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar as alterações.");
            }

            alert("Alterações salvas com sucesso!");
        } catch (error) {
            console.error("Erro:", error);
            alert("Falha ao salvar as alterações. Tente novamente.");
        }
    });
});