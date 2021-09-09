import React from "react";
import ReactDOM from "react-dom";

import HeaderBlock from "./components/HeaderBlock";

import './index.css'

// const el = React.createElement(
//   'h1',
//   null,
//   'Hello World, ReactJS!'
// );

const AppList = () => {
  const items = ['Item1', 'Item2', 'Item3', 'Item4'];
  const fisrtItems = <li>Item0</li>

  const isAuth = false;

  return (
    <ul>
      {
        isAuth ? fisrtItems : null
      }
      {
        items
      }
      {
        items.map(item => <li>{item}</li>)
      }
      <li>{items[0]}</li>
      <li>{items[1]}</li>
  </ul>
  )
}

const AppHeader = () => {
  const margin = 40;
  
  const headerStyle = {
    color: 'red',
    marginLeft: `${margin}px`,
    marginBottom: `${margin}px`
  };
  return (
  <h1
      className="header"
      >
        Hello, World!
  </h1>
  )
}

const AppInput = () => {
  const placeholder = "Type text...";

  return (
    <label>
      <input 
      id="search"
      placeholder={placeholder}
       />
    </label>
  )
}

const App = () => {
  return (
    <>
      <HeaderBlock />
      <AppHeader />
      <AppList />
      <AppHeader />
      <AppList />
      <AppHeader />
      <AppList />
      <AppInput />
    </>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));

