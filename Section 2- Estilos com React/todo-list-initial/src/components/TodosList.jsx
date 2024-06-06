// Hooks
import { useContext } from 'react';
// Components
import Todo from './Todo.jsx';
// Context
import { TodosContext } from '../context/TodosContext.js';


function TodosList() {

  const store = useContext(TodosContext);

  const handleDelete = (id) => {
    store.dispatch({
      type: 'deleted',
      id: id
    })
  }

  const handleToggle = (id) => {
    store.dispatch({
      type: 'toggledIsDone',
      id: id
    })
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
