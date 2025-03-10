document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); 

        const identificador = document.getElementById("identificador").value.trim();
        const senha = document.getElementById("senha").value.trim();

        if (identificador === "" || senha === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

    
        fetch("http://localhost:8080/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ identificador, senha })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao fazer login");
            }
            return response.json();
        })
        .then(data => {
            alert("Login bem-sucedido!");
            window.location.href = "home.html"; 
        })
        .catch(error => {
            alert("Falha no login. Verifique suas credenciais.");
        });
    });

    alert("Login bem-sucedido!");
    window.location.href = "home.html"; 

});