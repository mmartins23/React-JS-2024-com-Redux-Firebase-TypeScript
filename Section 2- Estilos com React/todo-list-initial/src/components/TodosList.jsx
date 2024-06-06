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

  return (
    <>
      <div className="todos">
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default TodosList;
