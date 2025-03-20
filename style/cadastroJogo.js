let jogos = []; 

function atualizarTabela() {
    const tabela = document.getElementById("tabela-jogos");
    tabela.innerHTML = ""; 

    jogos.forEach((jogo, index) => {
        const linha = document.createElement("tr");

        
        linha.innerHTML = `
            <td>${jogo.titulo}</td>
            <td>${jogo.genero}</td>
            <td>R$ ${jogo.preco.toFixed(2)}</td>
            <td>
                <button onclick="prepararEdicao(${index})">Editar</button>
                <button onclick="deletarJogo(${index})">Deletar</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function cadastrarJogo() {
    const titulo = document.getElementById("titulo").value.trim();
    const genero = document.getElementById("genero").value;
    const preco = document.getElementById("preco").value.trim();

    if (!titulo || !genero || !preco) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const jogo = {
        titulo: titulo,
        genero: genero,
        preco: parseFloat(preco),
    };

    
    jogos.push(jogo);

    
    atualizarTabela();

    
    fetch("http://localhost:8080/jogos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jogo),
    })
    .then(response => {
        if (response.ok) {
            alert("Jogo cadastrado com sucesso!");
            limparCampos();
        } else {
            alert("Erro ao cadastrar o jogo no servidor.");
        }
    })
    .catch(error => {
        console.error("Erro ao cadastrar jogo:", error);
        alert("Erro ao se conectar ao servidor.");
    });
}

function buscarJogo() {
    const titulo = document.getElementById("search").value.trim();
    if (!titulo) {
        alert("Por favor, insira um título para buscar.");
        return;
    }

    const jogo = jogos.find(jogo => jogo.titulo.toLowerCase() === titulo.toLowerCase());
    if (jogo) {
        alert(`Jogo encontrado: Título: ${jogo.titulo}, Gênero: ${jogo.genero}, Preço: R$ ${jogo.preco.toFixed(2)}`);
    } else {
        alert("Nenhum jogo encontrado com este título.");
    }
}

function prepararEdicao(index) {
    const jogo = jogos[index];

    
    document.getElementById("titulo").value = jogo.titulo;
    document.getElementById("genero").value = jogo.genero;
    document.getElementById("preco").value = jogo.preco;

    
    jogos.splice(index, 1);
    atualizarTabela();
}

function editarJogo() {
    const titulo = document.getElementById("titulo").value.trim();
    const genero = document.getElementById("genero").value;
    const preco = document.getElementById("preco").value.trim();

    if (!titulo || !genero || !preco) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const jogo = {
        titulo: titulo,
        genero: genero,
        preco: parseFloat(preco),
    };

    
    jogos.push(jogo);
    atualizarTabela();

    
    fetch(`http://localhost:8080/jogos?titulo=${titulo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jogo),
    })
    .then(response => {
        if (response.ok) {
            alert("Jogo editado com sucesso!");
            limparCampos();
        } else {
            alert("Erro ao editar o jogo no servidor.");
        }
    })
    .catch(error => {
        console.error("Erro ao editar jogo:", error);
        alert("Erro ao se conectar ao servidor.");
    });
}

function deletarJogo(index) {
    const jogo = jogos[index];

    if (!confirm(`Deseja realmente deletar o jogo "${jogo.titulo}"?`)) {
        return;
    }

    
    jogos.splice(index, 1);
    atualizarTabela();

    
    fetch(`http://localhost:8080/jogos?titulo=${jogo.titulo}`, {
        method: "DELETE",
    })
    .then(response => {
        if (response.ok) {
            alert("Jogo deletado com sucesso!");
        } else {
            alert("Erro ao deletar o jogo no servidor.");
        }
    })
    .catch(error => {
        console.error("Erro ao deletar jogo:", error);
        alert("Erro ao se conectar ao servidor.");
    });
}

function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("search").value = "";
}
