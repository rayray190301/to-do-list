// 1. Selecionar os elementos do HTML
const form = document.getElementById('form-add-todo');
const inputTask = form.querySelector('input[name="task"]');
const todoList = document.getElementById('todo-list');

// 2. Carregar tarefas salvas ao iniciar (Personalização)
// Se não tiver nada salvo, começa com um array vazio []
let tasks = JSON.parse(localStorage.getItem('my_todos')) || [];

// Função para salvar no navegador
function saveToLocalStorage() {
    localStorage.setItem('my_todos', JSON.stringify(tasks));
}

// 3. Função que desenha a lista na tela
function renderTasks() {
    todoList.innerHTML = ''; // Limpa a lista atual para não duplicar

    tasks.forEach((task, index) => {
        // Cria o elemento LI
        const li = document.createElement('li');
        
        // Se a tarefa estiver completa, adiciona a classe CSS
        if (task.completed) {
            li.classList.add('completed');
        }

        // Cria o Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        // Evento: ao clicar no checkbox
        checkbox.addEventListener('change', () => toggleTask(index));

        // Cria o Texto
        const span = document.createElement('span');
        span.textContent = task.text;

        // Cria o Botão de Deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('btn-delete');
        // Evento: ao clicar em excluir
        deleteBtn.addEventListener('click', () => deleteTask(index));

        // Junta tudo dentro do LI
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Coloca o LI na lista UL
        todoList.appendChild(li);
    });
}

// 4. Função para Adicionar Tarefa
function addTask(event) {
    event.preventDefault(); // Evita que a página recarregue

    const text = inputTask.value.trim(); // Pega o texto e remove espaços extras

    if (text !== '') {
        // Adiciona ao nosso array de dados
        tasks.push({
            text: text,
            completed: false
        });

        inputTask.value = ''; // Limpa o campo de input
        saveToLocalStorage(); // Salva
        renderTasks(); // Atualiza a tela
    }
}

// 5. Função para Marcar/Desmarcar (Toggle)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // Inverte true/false
    saveToLocalStorage();
    renderTasks();
}

// 6. Função para Deletar
function deleteTask(index) {
    tasks.splice(index, 1); // Remove 1 item naquela posição
    saveToLocalStorage();
    renderTasks();
}

// 7. Ouvinte de Evento do Formulário
form.addEventListener('submit', addTask);

// 8. Renderiza a lista pela primeira vez ao abrir a página
renderTasks();