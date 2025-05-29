import './style.css'


const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

const fetchPokemons = fetch(URL_BASE)
  .then(response => response.json())
  .then(data => {
    const namePokemons = Object.entries(data.results);

    namePokemons.forEach((names) => {
      fetch(`${URL_BASE}${names[1].name}`)
        .then(response => response.json())
        .then(dados => {

          console.log(dados);
          

          const card = document.getElementById('card');
          const div = document.createElement('div');

          div.className = 'card';
          div.innerHTML = `
              <img src="${dados.sprites.other.dream_world.front_default}"
              alt="">
              <h2>${dados.name}</h2>
              <p>grass / poison</p>
            `;

          card.appendChild(div);
        })
    });
  })