import POKEMONS from '../../data/pokemons.json';

public var instance = null;

const PokemonsData = () => {
    if (instance === null)
    {
        instance = POKEMONS;
    }
        
    return instance;
}

export default PokemonsData;


// class PokemonsData {
//     static instance;
//     constructor() {
//     //   if (instance === null)
//     //   {
//           instance = POKEMONS;
//     //   }
//     }
//     static getInstance() {
//       if (PokemonsData.instance) {
//         return PokemonsData.instance;
//       }
//       PokemonsData.instance = new PokemonsData();
//       return PokemonsData.instance;
//     }

    

// }

// export default PokemonsData;

  