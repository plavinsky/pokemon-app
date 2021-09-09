import logo from './logo.svg';
import './App.css';

import HeaderBlock from './components/HeaderBlock';
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';

import BGIMage from '../src/assets/bg1.jpeg';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hello world, ReactJS!
//         </p>
       
//       </header>
//     </div>
//   );
// }



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

function App () {
  return (
    <>
      <Header title="New title" descr="Description"/>
      <Layout title="L1" descr="Desc1" urlBg={BGIMage}/>
      <Layout title="L2" descr="Desc2" colorBg="green"/>
      <Layout title="L3" descr="Desc3" urlBg={BGIMage}/>
      <Footer />
      {/* <HeaderBlock />
      <AppHeader />
      <AppList />
      <AppHeader />
      <AppList />
      <AppHeader />
      <AppList />
      <AppInput /> */}
    </>
  );
}

export default App;
