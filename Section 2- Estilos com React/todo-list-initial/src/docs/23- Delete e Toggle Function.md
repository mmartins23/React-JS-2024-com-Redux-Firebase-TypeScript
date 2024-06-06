Para adicionar a funcionalidade de excluir tarefas e marcar como feitas/não feitas, as seguintes modificações foram realizadas no código:

1. **Atualização do componente `Todo`:**
   - Adição de botões para excluir tarefas e marcar como feitas/não feitas.
   - Uso das funções `deleteTodo` e `toggleTodo` passadas como props para manipular o estado das tarefas.

2. **Atualização do componente `TodosList`:**
   - Uso de `useState` para gerenciar a lista de tarefas (`todos`).
   - Implementação das funções `handleDelete` e `handleToggle` para atualizar o estado das tarefas.

Aqui está o código completo com essas alterações:

### Componente `Todo`

```javascript
import './Todo.scss';

function Todo({ todo, deleteTodo, toggleTodo }) {
    return (
        <>
            <div className={`todo ${todo.isDone ? 'done' : ''}`}>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="erase">
                    x erase
                </button>
                <h3>
                    {todo.title}
                </h3>
                <p>
                    {todo.description}
                </p>
                <div className="task-check">
                    <input
                        onClick={() => toggleTodo(todo.id)}
                        type="checkbox"
                        defaultChecked={todo.isDone} />
                    <label>
                        {!todo.isDone ? 'To-Do' : 'Done'}
                    </label>
                </div>
            </div>
        </>
    )
}

export default Todo;
```

### Componente `TodosList`

```javascript
// Components
import Todo from './Todo.jsx';

// Hooks
import { useState } from 'react';

function TodosList() {
  const initialTodos = [
    { id: 0, title: 'Do Groceries', description: 'Buy apples, rice, juice and toilet paper.', isDone: true },
    { id: 1, title: 'Study React', description: 'Understand context & reducers.', isDone: false },
    { id: 2, title: 'Learn Redux', description: 'Learn state management with Redux', isDone: false }
  ];

  const [todos, setTodos] = useState(initialTodos);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  }

  const handleToggle = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    }));
  }

  return (
    <>
      <div className="todos">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={handleDelete}
            toggleTodo={handleToggle} />
        ))}
      </div>
    </>
  );
}

export default TodosList;
```

### Explicação das Alterações

1. **Componente `Todo`:**
   - **Botão de Excluir:** Quando clicado, chama a função `deleteTodo` com o `id` da tarefa como argumento.
   - **Checkbox de Marcar como Feita/Não Feita:** Quando clicado, chama a função `toggleTodo` com o `id` da tarefa como argumento.

2. **Componente `TodosList`:**
   - **Estado `todos`:** Armazena a lista de tarefas.
   - **Função `handleDelete`:** Filtra a lista de tarefas para remover a tarefa com o `id` correspondente.
   - **Função `handleToggle`:** Alterna o estado `isDone` da tarefa com o `id` correspondente.

Essas modificações permitem que os usuários excluam tarefas e marquem-nas como feitas/não feitas de forma interativa.