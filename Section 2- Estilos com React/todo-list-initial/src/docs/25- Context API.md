A aplicação do Context API no seu exemplo envolve vários passos importantes. Abaixo, vou explicar cada um deles em detalhes:

### 1. Criação do Contexto

Primeiro, criamos o contexto usando `createContext` e exportamos para ser usado em outros componentes:

```javascript
import { createContext } from "react";

export const TodosContext = createContext("");
```

### 2. Configuração do Provedor de Contexto no Componente Principal (`App`)

No componente `App`, usamos o contexto para fornecer o estado `todos` e a função `setTodos` para todos os componentes filhos que necessitem acessar ou modificar o estado.

```javascript
import Header from './components/Header.jsx';
import Home from './views/Home.jsx';
import './App.scss';

// Hooks
import { useState } from 'react';

// Context
import { TodosContext } from './context/TodosContext.js';

const initialTodos = [
  { id: 0, title: 'Do Groceries', description: 'Buy apples, rice, juice and toilet paper.', isDone: true },
  { id: 1, title: 'Study React', description: 'Understand context & reducers.', isDone: false },
  { id: 2, title: 'Learn Redux', description: 'Learn state management with Redux', isDone: false }
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <main>
      <TodosContext.Provider value={{todos, setTodos}}>
        <Header appName="To-Do List with React" />
        <Home />
      </TodosContext.Provider>
    </main>
  );
}

export default App;
```

Aqui está o que acontece:
- `TodosContext.Provider` envolve os componentes `Header` e `Home`, disponibilizando `todos` e `setTodos` a eles e seus componentes filhos.
- `value={{ todos, setTodos }}` passa o estado `todos` e a função `setTodos` para o contexto, tornando-os acessíveis para os componentes dentro do provedor.

### 3. Consumindo o Contexto no Componente `TodosList`

No componente `TodosList`, usamos o hook `useContext` para acessar o contexto e manipular o estado das tarefas:

```javascript
import { useContext } from 'react';
import Todo from './Todo.jsx';
import { TodosContext } from '../context/TodosContext.js';

function TodosList() {
  const { todos, setTodos } = useContext(TodosContext);

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
    <div className="todos">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={handleDelete}
          toggleTodo={handleToggle} />
      ))}
    </div>
  );
}

export default TodosList;
```

### 4. Acesso ao Contexto no Componente `Todo`

O componente `Todo` utiliza as funções `deleteTodo` e `toggleTodo` passadas como props pelo `TodosList` para interagir com o estado:

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
   - Usamos `createContext` para criar o contexto `TodosContext` e exportá-lo para ser usado nos componentes.

2. **Configuração do Provedor no Componente Principal (`App`)**:
   - Definimos o estado inicial das tarefas (`initialTodos`).
   - Usamos `useState` para criar o estado `todos` e a função `setTodos`.
   - `TodosContext.Provider` envolve os componentes que precisam acessar o contexto (`Header` e `Home`).

3. **Consumo do Contexto no Componente `TodosList`**:
   - Usamos `useContext(TodosContext)` para acessar `todos` e `setTodos` fornecidos pelo contexto.
   - Implementamos as funções `handleDelete` e `handleToggle` para manipular o estado.

4. **Interação com o Estado no Componente `Todo`**:
   - As funções `deleteTodo` e `toggleTodo` são passadas como props para `Todo`.
   - `Todo` chama essas funções quando o usuário clica no botão de apagar ou na checkbox.

Essa implementação do Context API permite compartilhar o estado globalmente entre os componentes sem precisar passar props manualmente por várias camadas de componentes.