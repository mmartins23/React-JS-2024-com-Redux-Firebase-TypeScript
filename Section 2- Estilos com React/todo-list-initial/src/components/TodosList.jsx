// Components
import Todo from './Todo.jsx';

// Hooks
import { useState } from 'react';


const initialTodos = [
  { id: 0, title: 'Do Groceries', description: 'Buy apples, rice, juice and toilet paper.', isDone: true },
  { id: 1, title: 'Study React', description: 'Understand context & reducers.', isDone: false },
  { id: 2, title: 'Learn Redux', description: 'Learn state management with Redux', isDone: false }
];

function TodosList() {

  const [todos, setTodos] = useState(initialTodos);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  }

  const handleToggle = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
        return todo;
      } else {
        return todo;
      }
    }))
  }

  return (
    <>
      <div className="todos">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={(id) => handleDelete(id)}
            toggleTodo={(id) => handleToggle(id)} />
        ))}
      </div>
    </>
  );
}

export default TodosList;
