Vamos explicar em detalhes cada um dos componentes mencionados e como eles se integram no sistema de gerenciamento de tarefas.

### 1. `AddTodoModal`

Este componente renderiza um formulário dentro do modal para adicionar uma nova tarefa.

```jsx
function AddTodoModal() {
    return (
        <>
            <div className="form">      
                <h3>Add a new task</h3>
                <label htmlFor="title">Title *</label>
                <input type="text" name="title" placeholder="Enter a title..." /><br />
                <label htmlFor="description">Description *</label>
                <textarea name="description" rows="4" placeholder="Enter a description..." /><br />
                <button className="btn gray">Add Task</button>
            </div>
        </>
    )
}

export default AddTodoModal;
```

**Explicação:**
- **Estrutura do Formulário:** O formulário contém dois campos: um para o título (`input`) e outro para a descrição (`textarea`) da tarefa.
- **Botão "Add Task":** Um botão que, ao ser clicado, adicionará a nova tarefa. Atualmente, não há lógica implementada no botão, mas normalmente ele acionaria uma função para adicionar a tarefa.

### 2. `ModalCloseButton`

Este componente renderiza um botão para fechar o modal.

```jsx
const ModalCloseButton = ({ onClose }) => {
    return (
        <>
            <button className="close-btn" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                    <path fill="currentColor"
                        d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z" />
                </svg>
            </button>
        </>
    )
}

export default ModalCloseButton;
```

**Explicação:**
- **Botão de Fechar:** Um botão estilizado que usa um ícone SVG para fechar o modal. A função `onClick` recebe um manipulador `onClose` que é chamado para fechar o modal.

### 3. `ModalWindow`

Este componente renderiza a estrutura do modal e inclui o botão de fechar e o conteúdo do modal.

```jsx
import ModalCloseButton from './ModalCloseButton';
import './ModalWindow.scss';

function ModalWindow({ children, onClose }) {
    return (
        <>
            <div className="modal-wrapper" aria-modal="true" role="dialog" tabIndex="-1">
                <div className="inner">
                    <ModalCloseButton onClose={onClose} />
                    {children}
                </div>
            </div>
        </>
    )
}

export default ModalWindow;
```

**Explicação:**
- **Estrutura do Modal:** O modal é estruturado usando uma `div` com a classe `modal-wrapper`, que cobre toda a tela com um fundo semi-transparente.
- **Conteúdo do Modal:** O conteúdo do modal (`children`) é passado como prop e renderizado dentro da `div` com a classe `inner`.
- **Botão de Fechar:** O botão de fechar é incluído e o manipulador `onClose` é passado para ele.

### 4. `ModalWindow.scss`

Este arquivo de estilos define a aparência do modal.

```scss
.modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 500;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: grid;
    place-items: center;
    color: #000;

    .inner {
        background-color: white;
        padding: 30px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        position: relative;
        max-width: 600px;
        width: 90%;

        h3 {
            font-size: 16px;
            font-weight: 700;
            line-height: 21px;
            margin-bottom: 20px;
        }

        .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;
            background-color: #fff;
        }

        .form {
            display: flex;
            flex-direction: column;
            max-width: 100%;

            label {
                font-size: 12px;
                font-weight: 500;
                line-height: 16px;
                text-align: left;
            }

            input,
            select,
            textarea {
                font-size: 12px;
                font-weight: 400;
                line-height: 16px;
                border: 1px solid #C2C2C2;
                border-radius: 4px;
                padding: 8px 12px;
                margin-top: 5px;

                &::placeholder {
                    color: #A6A6A6;
                }
            }

            .btn {
                width: fit-content;
                padding-inline: 23px;
            }
        }
    }
}
```

**Explicação:**
- **Estilização do Modal:** A `modal-wrapper` cobre toda a tela com um fundo semi-transparente e centra o conteúdo do modal.
- **Estilização do Conteúdo:** A `inner` contém o conteúdo do modal com um fundo branco, padding, bordas arredondadas e uma posição relativa.
- **Botão de Fechar:** O botão de fechar é posicionado no canto superior direito do modal.
- **Estilização do Formulário:** Estilos específicos para o formulário, incluindo fontes, margens, padding e placeholders.

### 5. `Home`

Este componente renderiza a página principal, incluindo a lista de tarefas, o filtro e o modal para adicionar novas tarefas.

```jsx
import React, { useState } from 'react';
import Filter from '../components/Filter.jsx';
import TodosList from '../components/TodosList.jsx';
import AddTodoModal from '../modals/AddTodoModal.jsx';
import ModalWindow from '../modals/ModalWindow.jsx';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button onClick={openModal}>Add New Task</button>
            {isModalOpen && (
                <ModalWindow onClose={closeModal}>
                    <AddTodoModal />
                </ModalWindow>
            )}
            <div className="container">
                <Filter />
                <TodosList />
            </div>
        </>
    );
}

export default Home;
```

**Explicação:**
- **Estado do Modal:** O estado `isModalOpen` controla se o modal está aberto ou fechado.
- **Abrir e Fechar o Modal:** Funções `openModal` e `closeModal` são usadas para alterar o estado do modal.
- **Botão para Adicionar Tarefa:** Um botão que, ao ser clicado, abre o modal.
- **Renderização Condicional do Modal:** O modal é renderizado apenas se `isModalOpen` for `true`.
- **Conteúdo Principal:** Renderiza o filtro e a lista de tarefas.

### Integração Completa

Os componentes acima trabalham juntos para fornecer uma interface onde os usuários podem adicionar novas tarefas através de um modal. Quando o botão "Add New Task" é clicado, o modal abre, permitindo que o usuário preencha o formulário e adicione uma nova tarefa à lista. O botão de fechar no modal permite que o usuário feche o modal sem adicionar uma nova tarefa.