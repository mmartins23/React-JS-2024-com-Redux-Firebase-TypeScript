### Componentes Funcionais em React

Componentes funcionais são a maneira mais simples de definir componentes em React. Eles são funções JavaScript que aceitam um único argumento chamado `props` (abreviação de propriedades) e retornam elementos React, que descrevem o que deve aparecer na tela.

### 1. Criando um Componente Funcional Básico

#### Exemplo Simples
Um componente funcional básico pode ser definido como uma função que retorna um elemento JSX.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Uso do componente Welcome
ReactDOM.render(
  <Welcome name="Alice" />,
  document.getElementById('root')
);
```

### 2. Usando `props`

Os `props` são um objeto passado de um componente pai para um componente filho e contêm valores que o componente filho pode usar.

#### Exemplo com Props
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### 3. Componentes Aninhados

Você pode combinar vários componentes funcionais para criar interfaces de usuário complexas e reutilizáveis.

#### Exemplo de Componentes Aninhados
```jsx
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
}

const comment = {
  date: new Date().toLocaleDateString(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
);
```

### 4. Estado com `useState`

Os componentes funcionais podem usar o hook `useState` para gerenciar estado interno.

#### Exemplo com `useState`
```jsx
import React, { useState } from 'react';

function Counter() {
  // Declara uma nova variável de estado, que chamaremos de "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
```

### 5. Efeitos Colaterais com `useEffect`

O hook `useEffect` permite realizar efeitos colaterais, como manipulações de DOM, assinaturas de dados, e outras operações que precisam ocorrer após a renderização.

#### Exemplo com `useEffect`
```jsx
import React, { useState, useEffect } from 'react';

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000);

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### Conclusão

Componentes funcionais em React são simples e eficazes para criar interfaces de usuário. Eles podem receber `props`, gerenciar estado usando `useState`, e realizar efeitos colaterais com `useEffect`. Essa abordagem permite a construção de componentes reutilizáveis e modulares de forma clara e concisa.