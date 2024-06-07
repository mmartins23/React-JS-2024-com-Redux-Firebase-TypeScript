Para mover a lógica do contexto para um componente Provider, podemos seguir estes passos:

1. **Criar um novo arquivo para o contexto**: Crie um novo arquivo, por exemplo, `TodosContext.jsx`, onde você definirá o contexto e o componente Provider.

2. **Definir o contexto com createContext()**: No arquivo `TodosContext.jsx`, importe `createContext` do React e defina o contexto usando `createContext()`. Por exemplo:
   ```jsx
   import { createContext } from "react";
   export const TodosContext = createContext("");
   ```

3. **Criar o componente Provider**: No mesmo arquivo, crie o componente Provider que será responsável por fornecer o contexto aos componentes filhos. Por exemplo:
   ```jsx
   import { createContext, useReducer } from "react";
   import todosReducer from "../reducers/TodosReducer";

   export const TodosContext = createContext("");

   const initialTodos = [
       { id: 0, title: 'Do Groceries', description: 'Buy apples, rice, juice and toilet paper.', isDone: true },
       { id: 1, title: 'Study React', description: 'Understand context & reducers.', isDone: false },
       { id: 2, title: 'Learn Redux', description: 'Learn state management with Redux', isDone: false }
   ];

   export function TodosProvider({ children }) {
       const [todos, dispatch] = useReducer(todosReducer, initialTodos);

       return (
           <>
               <TodosContext.Provider value={{ todos, dispatch }}>
                   {children}
               </TodosContext.Provider>
           </>
       );
   }
   ```

4. **Importar e utilizar o componente Provider no componente principal (App)**: No arquivo onde seu aplicativo principal é definido (por exemplo, `App.jsx`), importe o componente Provider recém-criado e envolva os componentes que precisam acessar o contexto com ele. Por exemplo:
   ```jsx
   import React from "react";
   import Header from "./components/Header.jsx";
   import Home from "./views/Home.jsx";
   import { TodosProvider } from "./context/TodosContext.jsx";
   import "./App.scss";

   function App() {
       return (
           <>
               <main>
                   <TodosProvider>
                       <Header appName="To-Do List with React" />
                       <Home />
                   </TodosProvider>
               </main>
           </>
       );
   }

   export default App;
   ```

Agora, a lógica relacionada aos todos está encapsulada no contexto e pode ser acessada por qualquer componente filho dentro da árvore de componentes envolvida pelo Provider. Isso torna mais fácil e limpo o gerenciamento do estado dos todos em sua aplicação React.