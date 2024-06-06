import Todo from './Todo.jsx';
import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext'; 

function TodosList() {

  const store = useContext(TodosContext);

  return (
    <>
      <div className="todos">
        {store.todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    </>
  );
}

export default TodosList;
