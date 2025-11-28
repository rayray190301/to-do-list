 <script>
        // Pega os elementos da tela
        const form = document.getElementById('form-add-todo');
        const inputTask = form.querySelector('input[name="task"]');
        const todoList = document.getElementById('todo-list');

        // Carrega tarefas salvas ou inicia vazio
        let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];

        // Função para salvar na memória do navegador
        function saveToLocalStorage() {
            localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
        }

        // Função que desenha a lista na tela
        function renderTasks() {
            todoList.innerHTML = ''; // Limpa a lista visual antes de recriar

            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                
                // Se a tarefa estiver marcada como feita, adiciona a classe visual
                if (task.completed) {
                    li.classList.add('completed');
                }

                // Checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', () => toggleTask(index));

                // Texto da tarefa
                const span = document.createElement('span');
                span.textContent = task.text;

                // Botão de excluir
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'X';
                deleteBtn.classList.add('btn-delete');
                deleteBtn.addEventListener('click', () => deleteTask(index));

                // Monta o item
                li.appendChild(checkbox);
                li.appendChild(span);
                li.appendChild(deleteBtn);

                // Coloca na lista
                todoList.appendChild(li);
            });
        }

        // Adiciona Tarefa
        function addTask(event) {
            event.preventDefault(); // IMPORTANTE: Impede a página de recarregar sozinha
            
            const text = inputTask.value.trim();
            
            if (text !== '') {
                tasks.push({ text: text, completed: false });
                inputTask.value = '';
                saveToLocalStorage();
                renderTasks();
            }
        }

        // Marcar como feito
        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            saveToLocalStorage();
            renderTasks();
        }

        // Deletar Tarefa
        function deleteTask(index) {
            tasks.splice(index, 1);
            saveToLocalStorage();
            renderTasks();
        }

        // Liga o formulário à função
        form.addEventListener('submit', addTask);

        // Inicia a lista ao abrir a página
        renderTasks();
    </script>
</body>
</html>