### Explicação dos Componentes: `App`, `Item` e `OrderDetails`

O projeto consiste em três componentes principais: `App`, `Item` e `OrderDetails`. A seguir, vamos detalhar cada um desses componentes.

### 1. Componente `App`

O componente `App` é o componente principal da aplicação e gerencia o estado dos itens, lida com a seleção de produtos e a alteração de quantidades.

#### Estrutura Básica

```jsx
import './App.css';
import OrderDetails from './components/OrderDetails';
import Item from './components/Item';
import { useState } from 'react';

function App() {
    const shopName = "Jersey Shop Made with React JS";

    const [items, setItems] = useState([
        {
            id: 1, 
            photo: "real_madrid.webp",
            name: "Real Madrid",
            price: 119.99,
            active: false,
            quantity: 1, 
            isInBag: false
        },
        // outros itens...
    ]);

    const itemsInBag = items.filter(item => item.isInBag);

    function selectHandler(id) {
        let item = items.filter(item => item.id === id)[0];
        item.isInBag = !item.isInBag;
        setItems(items.map(el => el.id === id ? item : el));
    }

    function quantityHandler(e, id, increment){
        e.stopPropagation();
        let item = items.filter(item => item.id === id)[0];
        item.quantity += increment;
        setItems(items.map(el => el.id === id ? item : el));
    }
    
    return ( 
        <>
            <section className="items">
                <h4>{ shopName }</h4>

                { items.map(item => 
                    <Item 
                        selectProduct={(id) => selectHandler(id)}
                        changeQuantity={(e, id, increment)=> quantityHandler(e, id, increment)}
                        item={item} 
                        key={item.id} 
                    />
                ) }
                
            </section>
            
            {itemsInBag.length > 0 && <OrderDetails itemsInBag={itemsInBag} />}
        </>   
    );
}

export default App;
```

#### Funções do Componente `App`

- **Estado Inicial**: O estado inicial dos itens é definido com `useState`, contendo uma lista de objetos que representam os produtos.
- **Manipuladores de Eventos**:
  - `selectHandler(id)`: Alterna o estado `isInBag` de um item, adicionando ou removendo-o da "bag".
  - `quantityHandler(e, id, increment)`: Atualiza a quantidade de um item incrementando ou decrementando seu valor.

### 2. Componente `Item`

O componente `Item` representa um único item na lista de produtos. Ele exibe informações sobre o produto e permite ao usuário selecionar o produto ou alterar sua quantidade se ele estiver na "bag".

#### Estrutura Básica

```jsx
function Item ({item, selectProduct, changeQuantity}) {
    return ( 
        <>
            <div onClick={()=> selectProduct(item.id)} className={`product ${item.isInBag ? 'selected' : ''}`}>
                <div className="photo">
                    <img src={"./img/" + item.photo} />
                </div>
                <div className="description">
                    <span className="name">{item.name}</span>
                    <span className="price">$ {item.price}</span>
                    { item.isInBag &&
                        <div className="quantity-area">
                            <button disabled={item.quantity<=1} onClick={(e) => changeQuantity(e, item.id, -1)}>-</button>
                            <span className="quantity">{item.quantity}</span>
                            <button onClick={(e) => changeQuantity(e, item.id, +1)}>+</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Item;
```

#### Funções do Componente `Item`

- **Props**:
  - `item`: O objeto que representa o item.
  - `selectProduct`: Função para selecionar o produto.
  - `changeQuantity`: Função para alterar a quantidade do produto.
- **Renderização**: Exibe a imagem, o nome e o preço do produto. Se o produto estiver na "bag", também exibe controles para alterar a quantidade.

### 3. Componente `OrderDetails`

O componente `OrderDetails` exibe um resumo dos itens na "bag" e o valor total do pedido.

#### Estrutura Básica

```jsx
function OrderDetails ({itemsInBag}) {
    function calculateTotal(){
        let orderTotal = 0;
        itemsInBag.forEach(item => orderTotal += item.price * item.quantity);
        return orderTotal.toFixed(2);
    }

    return ( 
        <>
            <section className="summary">
                <strong>Order Summary</strong>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    { itemsInBag.map(item => 
                        <tr key={item.id}>
                            <td>{item.quantity}x {item.name}</td>
                            <td>$ {(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ) }
                        <tr>
                            <th>Total</th>
                            <th>$ {calculateTotal()}</th>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default OrderDetails;
```

#### Funções do Componente `OrderDetails`

- **Props**:
  - `itemsInBag`: Lista de itens que estão na "bag".
- **Funções**:
  - `calculateTotal()`: Calcula o valor total do pedido somando os preços dos itens na "bag" multiplicados pela quantidade de cada item.
- **Renderização**: Exibe uma tabela com a quantidade, o nome e o total para cada item, além do valor total do pedido.

### Conclusão

Este projeto é um exemplo de uma aplicação simples de e-commerce construída com React, demonstrando como gerenciar o estado e a interação entre componentes. O `App` gerencia o estado global dos itens, o `Item` lida com a exibição e interação de cada produto individual, e o `OrderDetails` resume os itens selecionados e calcula o total do pedido.