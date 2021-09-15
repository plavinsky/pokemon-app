import s from './style.module.css';

import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import PokemonCard from '../../components/PokemonCard';

import BGIMage1 from '../../assets/bg1.jpeg';
import BGIMage3 from '../../assets/bg3.jpeg';

import POKEMONS from '../../data/pokemons.json';
import MenuHeader from '../../components/MenuHeader';


function HomePage ({onChangePage}) {
  
    const handleGameClick = () => {
        onChangePage && onChangePage('game');
    }

  return (
    <>
      

      <Header 
          title="Pokemon game" 
          descr="Simple triple triad card game with pokemons"
          onGameClick={handleGameClick}
        >
            

        </Header>

      
      <Layout title="L1" descr="Desc01" urlBg={BGIMage3}>
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid. <br/>
           Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
        <p></p>
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
           Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>

        
      </Layout>
      
      <Layout title="L2" descr="Desc2" colorBg="green">

        <div className={s.flex}>
            {
              POKEMONS.map((item) => <PokemonCard key={item.id} name={item.name} id={item.id} img={item.img} type={item.type} values={item.values} />)
            }
        </div>

      </Layout>
      
      <Layout title="L3" descr="Desc3" urlBg={BGIMage1}/>
      
    </>
  );
}

export default HomePage;
