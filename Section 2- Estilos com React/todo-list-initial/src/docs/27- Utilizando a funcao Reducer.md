Vamos detalhar passo a passo como a Context API e o hook `useReducer` foram aplicados para gerenciar o estado da aplicação de forma centralizada e eficiente:

### 1. Criação do Contexto

Primeiro, criamos um contexto para os todos (tarefas) utilizando `createContext`:

```javascript
import { createContext } from "react";
export const TodosContext = createContext("");
```

### 2. Criação da Função `todosReducer`

A função `todosReducer` define como o estado das tarefas deve ser atualizado com base nas ações recebidas:

```javascript
export default function todosReducer(todos, action) {
    switch (action.type) {
        case 'deleted': {
            if (confirm("Are you sure you want to delete?")) {
                return todos.filter(todo => todo.id !== action.id);
            }
            return todos; // Retornar o estado atual se o usuário cancelar a exclusão
        }
        case 'toggledIsDone': {
            return todos.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, isDone: !todo.isDone }; // Criar um novo objeto com o valor alternado
                }
                return todo;
            });
        }
        default:
            return todos; // Retornar o estado atual por padrão
    }
}
```

### 3. Configuração do Provedor de Contexto no Componente Principal (`App`)

No componente `App`, usamos `useReducer` para gerenciar o estado das tarefas (`todos`) e a função de despacho (`dispatch`). O `TodosContext.Provider` é usado para fornecer `todos` e `dispatch` para os componentes filhos:

```javascript
import Header from './components/Header.jsx';
import Home from './views/Home.jsx';
import './App.scss';
// Hooks
import { useReducer } from 'react';
// Context
import { TodosContext } from './context/TodosContext.js';
// Reducer
import todosReducer from './reducers/todosReducer.js';

const initialTodos = [
  { id: 0, title: 'Do Groceries', description: 'Buy apples, rice, juice and toilet paper.', isDone: true },
  { id: 1, title: 'Study React', description: 'Understand context & reducers.', isDone: false },
  { id: 2, title: 'Learn Redux', description: 'Learn state management with Redux', isDone: false }
];

function App() {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  return (
    <main>
      <TodosContext.Provider value={{ todos, dispatch }}>
        <Header appName="To-Do List with React" />
        <Home />
      </TodosContext.Provider>
    </main>
  );
}

export default App;
```

### 4. Consumo do Contexto no Componente `TodosList`

No componente `TodosList`, usamos `useContext` para acessar o contexto fornecido pelo `TodosContext.Provider`. A partir daí, podemos despachar ações para o `reducer`:

```javascript
import { useContext } from 'react';
// Components
import Todo from './Todo.jsx';
// Context
import { TodosContext } from '../context/TodosContext.js';

function TodosList() {
  const { todos, dispatch } = useContext(TodosContext);

  const handleDelete = (id) => {
    dispatch({ type: 'deleted', id });
  }

  const handleToggle = (id) => {
    dispatch({ type: 'toggledIsDone', id });
  }

  return (
    <div className="todos">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={handleDelete}
          toggleTodo={handleToggle}
        />
      ))}
    </div>
  );
}

export default TodosList;
```

### 5. Configuração do Componente `Todo`

O componente `Todo` recebe as funções `deleteTodo` e `toggleTodo` como props do `TodosList`. Estas funções são chamadas quando os eventos correspondentes ocorrem (clicar no botão de apagar ou na checkbox):

```javascript
import React from 'react';
import './Todo.scss';

function Todo({ todo, deleteTodo, toggleTodo }) {
  return (
    <div className={`todo ${todo.isDone ? 'done' : ''}`}>
      <button onClick={() => deleteTodo(todo.id)} className="erase">
        x erase
      </button>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <div className="task-check">
        <input
          onClick={() => toggleTodo(todo.id)}
          type="checkbox"
          defaultChecked={todo.isDone}
        />
        <label>{!todo.isDone ? 'To-Do' : 'Done'}</label>
      </div>
    </div>
  );
}

export default Todo;
```

### Passo a Passo Detalhado

1. **Criação do Contexto**:
   - Usamos `createContext` para criar `TodosContext` e exportá-lo.

2. **Criação da Função `todosReducer`**:
   - Definimos como o estado das tarefas deve ser atualizado para as ações `deleted` e `toggledIsDone`.

3. **Configuração do Provedor de Contexto no Componente `App`**:
   - Definimos o estado inicial das tarefas (`initialTodos`).
   - Usamos `useReducer` para criar o estado `todos` e a função `dispatch`.
   - `TodosContext.Provider` envolve os componentes `Header` e `Home`, fornecendo `todos` e `dispatch`.

4. **Consumo do Contexto no Componente `TodosList`**:
   - Usamos `useContext` para acessar `todos` e `dispatch` do contexto.
   - Implementamos `handleDelete` e `handleToggle` para despachar ações para o `reducer`.

5. **Interação com o Estado no Componente `Todo`**:
   - As funções `deleteTodo` e `toggleTodo` são passadas como props para `Todo`.
   - `Todo` chama essas funções quando o usuário clica no botão de apagar ou na checkbox.

Essa abordagem garante que o estado das tarefas seja gerenciado de forma centralizada e eficiente, permitindo que vários componentes acessem e atualizem o estado sem necessidade de passar props manualmente por várias camadas de componentes.