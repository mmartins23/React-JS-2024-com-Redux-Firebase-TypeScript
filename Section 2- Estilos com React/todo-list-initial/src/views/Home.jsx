import Filter from '../components/Filter.jsx';
import TodosList from '../components/TodosList.jsx';
import AddTodoModal from '../modals/AddTodoModal.jsx';
import ModalWindow from '../modals/ModalWindow.jsx';

function Home() {

    return (
        <>
            <ModalWindow>
                <AddTodoModal/>
            </ModalWindow>
            <div className="container">
                <Filter />
                <TodosList />
            </div>
        </>
    )
}

export default Home
