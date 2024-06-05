### Props em React

`Props` (abreviação de "properties") são uma maneira de passar dados de um componente pai para um componente filho em React. Eles são um objeto que contém todas as propriedades passadas para o componente. Props são lidos pelo componente filho, mas não podem ser modificados por ele; em outras palavras, eles são imutáveis dentro do componente que os recebe.

### Como Usar Props

1. **Passando Props**: Para passar props para um componente filho, você adiciona atributos ao JSX do componente filho.

2. **Recebendo Props**: O componente filho recebe os props como um único argumento para a função do componente (para componentes funcionais) ou acessa `this.props` (para componentes de classe).

### Exemplo Básico

#### Passando e Recebendo Props
Aqui está um exemplo simples de como passar e usar props em um componente funcional.

```jsx
// Definindo um componente funcional que recebe props
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usando o componente Welcome e passando o prop "name"
ReactDOM.render(
  <Welcome name="Alice" />,
  document.getElementById('root')
);
```

### Exemplo Detalhado

Vamos ver um exemplo mais detalhado que inclui múltiplos componentes e props.

#### Componente `Avatar`
Este componente recebe um usuário (`user`) como prop e exibe a imagem do avatar do usuário.

```jsx
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

#### Componente `UserInfo`
Este componente recebe um usuário (`user`) como prop e usa o componente `Avatar` para exibir a imagem do usuário e o nome do usuário.

```jsx
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
```

#### Componente `Comment`
Este componente recebe `date`, `text` e `author` como props e usa o componente `UserInfo` para exibir as informações do autor.

```jsx
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

// Dados de exemplo
const comment = {
  date: new Date().toLocaleDateString(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

// Renderizando o componente Comment com os dados passados como props
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
);
```

### Props como Funções

Props também podem ser funções, permitindo que componentes filhos comuniquem eventos ou mudanças de volta para o componente pai.

#### Exemplo com Função como Prop
```jsx
function Button(props) {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  );
}

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <Button onClick={handleClick} label="Click me" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### Conclusão

`Props` são uma parte essencial do React que permite a passagem de dados de componentes pais para componentes filhos. Eles tornam os componentes mais reutilizáveis e configuráveis, promovendo a construção de interfaces de usuário modulares e escaláveis. Props são imutáveis dentro do componente que os recebe, o que ajuda a manter a previsibilidade e a simplicidade na gestão do estado da aplicação.