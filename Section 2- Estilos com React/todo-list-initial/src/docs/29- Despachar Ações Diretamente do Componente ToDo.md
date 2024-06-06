### Passo a Passo para Despachar Ações Diretamente do Componente To-Do

A seguir, será detalhado o processo de como configurar e utilizar o Context API e o `useReducer` para despachar ações diretamente do componente `Todo` em uma aplicação React.

#### 1. Configuração do Contexto e Reducer

Primeiramente, configure o contexto e o reducer que serão utilizados para gerenciar o estado global das tarefas (todos).

##### `TodosContext.js`

```javascript
import { createContext } from 'react';

export const TodosContext = createContext("");
```

##### `todosReducer.js`

```javascript
export default function todosReducer(todos, action) {
    switch (action.type) {
        case 'deleted': {
            if (confirm("Are you sure you want to delete?")) {
                return todos.filter(todo => todo.id !== action.id);
            }
            return todos; // Retorna o estado atual se o usuário cancelar a exclusão
        }
        case 'toggledIsDone': {
            return todos.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, isDone: !todo.isDone }; // Cria um novo objeto com o valor alternado
                }
                return todo;
            });
        }
        default:
            return todos; // Retorna o estado atual por padrão
    }
}
```

#### 2. Configuração do Provedor de Contexto

O componente `App` irá prover o contexto para a árvore de componentes.

##### `App.jsx`

```javascript
import React, { useReducer } from 'react';
import Header from './components/Header.jsx';
import Home from './views/Home.jsx';
import './App.scss';
import { TodosContext } from './context/TodosContext.js';
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

#### 3. Utilização do Contexto no Componente de Lista de Tarefas

O componente `TodosList` usa o contexto para obter a lista de tarefas e renderizar cada uma usando o componente `Todo`.

##### `TodosList.jsx`

```javascript
import React, { useContext } from 'react';
import Todo from './Todo.jsx';
import { TodosContext } from '../context/TodosContext'; 

function TodosList() {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todos">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodosList;
```

#### 4. Despacho de Ações Diretamente do Componente To-Do

No componente `Todo`, ações são despachadas diretamente ao clicar nos botões de apagar ou alternar o estado da tarefa.

##### `Todo.jsx`

```javascript
import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext'; 
import './Todo.scss';

function Todo({ todo }) {
  const { dispatch } = useContext(TodosContext);

  return (
    <div className={`todo ${todo.isDone ? 'done' : ''}`}>
      <button
        onClick={() => dispatch({ type: 'deleted', id: todo.id })}
        className="erase">
        x erase
      </button>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <div className="task-check">
        <input
          onClick={() => dispatch({ type: 'toggledIsDone', id: todo.id })}
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

### Conclusão

Neste guia, configuramos um contexto usando `createContext` e `useReducer` para gerenciar o estado global das tarefas em uma aplicação React. O componente `App` provê o contexto, enquanto `TodosList` e `Todo` consomem e despacham ações diretamente para o reducer, atualizando o estado global de forma eficiente e reativa.