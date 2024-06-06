import Header from './components/Header.jsx';
import Home from './views/Home.jsx';
import './App.scss';
// Hooks
import { useReducer } from 'react';
// Context
import { TodosContext } from './context/TodosContext.js';
// Reducer
import todosReducer from './reducers/TodosReducer.js';

const initialTodos = [
  { id: 0, title: 'Do Groceries', description: 'Buy apples, rice, juice and toilet paper.', isDone: true },
  { id: 1, title: 'Study React', description: 'Understand context & reducers.', isDone: false },
  { id: 2, title: 'Learn Redux', description: 'Learn state management with Redux', isDone: false }
];


function App() {

  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  return (
    <>
      <main>
        <TodosContext.Provider value={{ todos, dispatch }}>
          <Header appName="To-Do List with React" />

          <Home />
        </TodosContext.Provider>
      </main>
    </>
  )
}

export default App
