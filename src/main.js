import './style.css'


const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

fetch(URL_BASE)
  .then(response => response.json())
  .then(data => {
    const namePokemons = Object.entries(data.results);

    namePokemons.forEach((names) => {
      fetch(`${URL_BASE}${names[1].name}`)
        .then(response => response.json())
        .then(dados => {
          const card = document.getElementById('card');
          const div = document.createElement('div');

          const pokemonTypes = dados.types.map((tipos) => tipos.type.name);

          div.className = 'card';
          div.innerHTML = `
              <img src="${dados.sprites.other.dream_world.front_default}"
              alt="">
              <h2>${dados.name}</h2>
              <p>${pokemonTypes}</p>
            `;

          card.appendChild(div);
        })
    });
  })