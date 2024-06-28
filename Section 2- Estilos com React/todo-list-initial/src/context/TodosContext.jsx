import { createContext, useContext, useReducer, useState } from "react";
export const TodosContext = createContext("");

const initialTodos = [
    { id: 0, title: 'Do Groceries', description: 'Buy apples, rice, juice and toilet paper.', isDone: true },
    { id: 1, title: 'Study React', description: 'Understand context & reducers.', isDone: false },
    { id: 2, title: 'Learn Redux', description: 'Learn state management with Redux', isDone: false }
];


export function TodosProvider({ children }) {

    const [todos, dispatch] = useReducer(todosReducer, initialTodos);

    const [modalIsActive, setModalIsActive] = useState(true);

    return (
        <>
            <main>
                <TodosContext.Provider
                    value={
                        {
                            todos,
                            dispatch,
                            modalIsActive,
                            setModalIsActive
                        }
                    }>
                    {children}
                </TodosContext.Provider>
            </main>
        </>
    )
}

export function useTodos() {
    return useContext(TodosContext);
}

function todosReducer(todos, action) {
    switch (action.type) {
        case 'deleted': {
            if (confirm("Are you sure you want to delete?")) {
                return todos.filter(todo => todo.id !== action.id);
            }
            return todos; // Retornar o estado atual se o usuário cancelar a exclusão
        }

        case 'toggledIsDone': {
            return todos.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, isDone: !todo.isDone }; // Criar um novo objeto com o valor alternado
                }
                return todo;
            });
        }

        default:
            return todos; // Retornar o estado atual por padrão
    }
}
