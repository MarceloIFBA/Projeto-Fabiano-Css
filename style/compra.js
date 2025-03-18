document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const jogoId = params.get("id");
    const jogoNome = document.getElementById("jogoNome");
    const jogoPreco = document.getElementById("jogoPreco");
    const metodoPagamento = document.getElementById("metodoPagamento");
    const btnComprar = document.getElementById("btnComprar");
    let formaDePagamentoSelecionada = "";

    // Carrega os detalhes do jogo
    fetch(`http://localhost:8080/jogos/${jogoId}`)
        .then(response => response.json())
        .then(jogo => {
            jogoNome.textContent = jogo.nome;
            jogoPreco.textContent = `R$ ${jogo.valor.toFixed(2)}`;
        })
        .catch(error => console.error("Erro ao carregar jogo:", error));

    // Adiciona evento de seleção nas opções de pagamento
    metodoPagamento.addEventListener("change", function (event) {
        formaDePagamentoSelecionada = event.target.value;
    });

    // Finaliza a compra ao clicar no botão
    btnComprar.addEventListener("click", function () {
        if (!formaDePagamentoSelecionada) {
            alert("Escolha uma forma de pagamento!");
            return;
        }

        const compra = {
            data: new Date().toISOString().split('T')[0],
            status: "Pendente",
            cliente: { id: 1 },  // Cliente fixo por enquanto
            jogo: { id: jogoId }
        };

        fetch("http://localhost:8080/compras", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(compra)
        })
        .then(response => response.json())
        .then(compraCriada => {
            const pagamento = {
                formaDePagmento: formaDePagamentoSelecionada,
                valorTotal: parseFloat(jogoPreco.textContent.replace("R$ ", "")),
                compra: { id: compraCriada.id }
            };

            return fetch("http://localhost:8080/pagamentos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pagamento)
            });
        })
        .then(response => {
            if (response.ok) {
                alert("Compra realizada com sucesso!");
                window.location.href = "home.html";
            } else {
                throw new Error("Erro no pagamento");
            }
        })
        .catch(error => {
            console.error("Erro ao finalizar compra:", error);
            alert("Erro ao processar compra!");
        });
    });
});
