import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import PokemonCard from './components/PokemonCard';

import BGIMage1 from '../src/assets/bg1.jpeg';

import BGIMage3 from '../src/assets/bg3.jpeg';



const POKEMONS = [
  {
    "abilities": [
      "keen-eye",
      "tangled-feet",
      "big-pecks"
    ],
    "stats": {
      "hp": 63,
      "attack": 60,
      "defense": 55,
      "special-attack": 50,
      "special-defense": 50,
      "speed": 71
    },
    "type": "flying",
    "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    "name": "pidgeotto",
    "base_experience": 122,
    "height": 11,
    "id": 17,
    "values": {
      "top": "A",
      "right": 2,
      "bottom": 7,
      "left": 5
    }
  },
  {
    "abilities": [
      "intimidate",
      "shed-skin",
      "unnerve"
    ],
    "stats": {
      "hp": 60,
      "attack": 95,
      "defense": 69,
      "special-attack": 65,
      "special-defense": 79,
      "speed": 80
    },
    "type": "poison",
    "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
    "name": "arbok",
    "base_experience": 157,
    "height": 35,
    "id": 24,
    "values": {
      "top": 5,
      "right": 9,
      "bottom": "A",
      "left": "A"
    }
  },
  {
    "abilities": [
      "static",
      "lightning-rod"
    ],
    "stats": {
      "hp": 35,
      "attack": 55,
      "defense": 40,
      "special-attack": 50,
      "special-defense": 50,
      "speed": 90
    },
    "type": "electric",
    "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    "name": "pikachu",
    "base_experience": 112,
    "height": 4,
    "id": 25,
    "values": {
      "top": 8,
      "right": "A",
      "bottom": 9,
      "left": 6
    }
  },
  {
    "abilities": [
      "overgrow",
      "chlorophyll"
    ],
    "stats": {
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "special-attack": 65,
      "special-defense": 65,
      "speed": 45
    },
    "type": "grass",
    "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    "name": "bulbasaur",
    "base_experience": 64,
    "height": 7,
    "id": 1,
    "values": {
      "top": 8,
      "right": 4,
      "bottom": 2,
      "left": 7
    }
  },
  {
    "abilities": [
      "blaze",
      "solar-power"
    ],
    "stats": {
      "hp": 39,
      "attack": 52,
      "defense": 43,
      "special-attack": 60,
      "special-defense": 50,
      "speed": 65
    },
    "type": "fire",
    "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    "name": "charmander",
    "base_experience": 62,
    "height": 6,
    "id": 4,
    "values": {
      "top": 7,
      "right": 6,
      "bottom": 1,
      "left": 4
    }
  }
];

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
      <Header 
          title="Pokemon game" 
          descr="Simple triple triad card game with pokemons"
        />
      
      <Layout title="L1" descr="Desc01" urlBg={BGIMage3}>
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid. <br/>
           Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
        <p></p>
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
           Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>

        
      </Layout>
      
      <Layout title="L2" descr="Desc2" colorBg="green">

        <div className="flex">
            {
              POKEMONS.map((item) => <PokemonCard key={item.id} name={item.name} id={item.id} img={item.img} type={item.type} values={item.values} />)
            }
        </div>

      </Layout>
      
      <Layout title="L3" descr="Desc3" urlBg={BGIMage1}/>
      <Footer />
    </>
  );
}

export default App;
