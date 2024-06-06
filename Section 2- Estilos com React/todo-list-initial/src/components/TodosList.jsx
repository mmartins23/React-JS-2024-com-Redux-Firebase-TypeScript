import { useContext } from 'react';
// Components
import Todo from './Todo.jsx';
// Hooks
import { useState } from 'react';
// Context
import { TodosContext } from '../context/TodosContext.js';


function TodosList() {

  const store = useContext(TodosContext);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      store.setTodos(store.todos.filter(todo => todo.id !== id));
    }
  }

  const handleToggle = (id) => {
    store.setTodos(store.todos.map(todo => {
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
        {store.todos.map(todo => (
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
