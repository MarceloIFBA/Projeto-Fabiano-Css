let users = [];

// Carregar usuários ao iniciar
loadUsers();

// Carregar usuários ao iniciar a página
async function loadUsers() {
    try {
        const response = await fetch('http://localhost:8080/cliente');
        if (response.ok) {
            users = await response.json();
            console.log(users);
            renderUsers();
        } else {
            alert('Erro ao carregar usuários');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
}

// Renderizar tabela de usuários
function renderUsers() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.usuario.username}</td>
            <td>${user.usuario.senha}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editUser(${user.id})">Editar</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Funções do Modal
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        openModal(id);
    } else {
        alert('Usuário não encontrado');
    }
}

function openModal(id = null) {
    const modal = document.getElementById('userModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('userForm');
    
    if (id) {
        const user = users.find(u => u.id === id);
        modalTitle.textContent = 'Editar Usuário';
        document.getElementById('id').value = user.id;
        document.getElementById('nome').value = user.nome;
        document.getElementById('email').value = user.email;
        document.getElementById('username').value = user.usuario.username;
        document.getElementById('senha').value = user.usuario.senha;
    } else {
        modalTitle.textContent = 'Adicionar Usuário';
        form.reset();
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

// Salvar usuário
async function saveUser(event) {
    event.preventDefault();
    
    const id = document.getElementById('id').value;
    const userData = {
        id: parseInt(id),
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        usuario: {
            username: document.getElementById('username').value,
            senha: document.getElementById('senha').value
        }
    };

    console.log(userData);

    const url = id ? `http://localhost:8080/cliente/${id}` : 'http://localhost:8080/cliente';
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            closeModal();
            loadUsers();
        } else {
            alert('Erro ao salvar usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor: ', url);
    }
}

// Excluir usuário
async function deleteUser(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            const response = await fetch(`http://localhost:8080/cliente/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                loadUsers();
            } else {
                alert('Erro ao excluir usuário');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        }
    }
}

// Filtrar usuários
function filterUsers() {
    const searchText = document.querySelector('.search-box').value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.nome.toLowerCase().includes(searchText)
    );
    
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    filteredUsers.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.usuario.username}</td>
            <td>${user.usuario.senha}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editUser(${user.id})">Editar</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função de logout
function logout() {
    window.location.href = 'index.html';
}