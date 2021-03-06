
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import PokemonCard from '../../components/PokemonCard';

import BGIMage1 from '../../assets/bg1.jpeg';
import BGIMage3 from '../../assets/bg3.jpeg';

import POKEMONS from '../../data/pokemons.json';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {gameMethods} from "../../store/game";

import s from './style.module.css';


function HomePage ({onChangePage}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleGameClick = () => {
      dispatch(gameMethods.clean());
      history.push('game');
    }

  return (
    <>
      <Header 
          title="Pokemon game" 
          descr="Simple triple triad card game with pokemons"
          onGameClick={handleGameClick}
        />
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
