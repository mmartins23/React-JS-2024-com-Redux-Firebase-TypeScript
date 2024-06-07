Para unificar a função reducer ao contexto, seguindo o padrão do uso de hooks em React, podemos fazer o seguinte:

1. **Movendo a função reducer para dentro do arquivo `TodosContext.jsx`**: Em vez de definir a função `todosReducer` fora do arquivo, podemos movê-la para dentro do arquivo `TodosContext.jsx` para mantê-la próxima do contexto onde será utilizada. Isso ajudará a manter o código organizado e coeso.

2. **Atualizar o componente `TodosProvider` para usar a função reducer local**: Dentro do componente `TodosProvider`, podemos agora usar a função reducer que definimos dentro do mesmo arquivo para inicializar o estado dos todos e fornecer o dispatch para os componentes filhos.

3. **Modificar o uso do hook `useTodos` para retornar tanto o estado quanto a função dispatch**: Vamos modificar o retorno do hook `useTodos` para que ele retorne tanto o estado dos todos quanto a função dispatch. Isso permitirá que os componentes que usam esse hook tenham acesso ao estado atual dos todos e possam despachar ações para atualizá-lo.

Aqui está como ficaria o código após essas modificações:

```jsx
import React, { createContext, useContext, useReducer } from "react";

export const TodosContext = createContext("");

const initialTodos = [
    { id: 0, title: 'Do Groceries', description: 'Buy apples, rice, juice and toilet paper.', isDone: true },
    { id: 1, title: 'Study React', description: 'Understand context & reducers.', isDone: false },
    { id: 2, title: 'Learn Redux', description: 'Learn state management with Redux', isDone: false }
];

export function TodosProvider({ children }) {
    const [todos, dispatch] = useReducer(todosReducer, initialTodos);

    return (
        <TodosContext.Provider value={{ todos, dispatch }}>
            {children}
        </TodosContext.Provider>
    );
}

export function useTodos() {
    return useContext(TodosContext);
}

function todosReducer(todos, action) {
    switch (action.type) {
        case 'deleted': {
            if (window.confirm("Are you sure you want to delete?")) {
                return todos.filter(todo => todo.id !== action.id);
            }
            return todos;
        }

        case 'toggledIsDone': {
            return todos.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, isDone: !todo.isDone };
                }
                return todo;
            });
        }

        default:
            return todos;
    }
}
```

Agora, o componente `TodosProvider` fornece tanto o estado dos todos quanto a função `dispatch` para os componentes filhos, facilitando a atualização do estado dos todos em toda a aplicação. E os componentes que precisam acessar esse estado podem usar o hook `useTodos` para isso.