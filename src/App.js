import './App.css';

import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import PokemonCard from './components/PokemonCard';

import BGIMage1 from '../src/assets/bg1.jpeg';
import BGIMage3 from '../src/assets/bg3.jpeg';

import POKEMONS from './data/pokemons.json';

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
