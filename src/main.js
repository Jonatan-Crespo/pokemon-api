import './style.css'

let offset = 0;
const cardContainer = document.getElementById('card');
const sectionModal = document.getElementById('modal');
const pokemonNames = document.getElementById('pokemon-input');

// Função para carregar Pokémons
function fetchPokemons(url) {
  cardContainer.innerHTML = ''

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const namePokemons = Object.entries(data.results);

      namePokemons.forEach((names) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${names[1].name}`)
          .then(response => response.json())
          .then(dados => {
            const div = document.createElement('div');
            const pokemonTypes = dados.types.map((tipos) => tipos.type.name);

            div.className = 'card';
            div.innerHTML = `
              <img src="${dados.sprites.other.dream_world.front_default}" alt="">
              <h2>${dados.name}</h2>
              <p>${pokemonTypes}</p>
            `;
            cardContainer.appendChild(div);
          })
          .catch(error => console.error("Erro ao carregar dados Pokémons:", error));
      });
    })
    .catch(error => console.error("Erro ao carregar Pokémons:", error));
}

// botão next - logica para adicionar 20 no offset e puxar os proximos 20 pokemons
function nextBtn() {
  const botaoNext = document.getElementById('next');
  botaoNext.addEventListener('click', (event) => {
    event.preventDefault();
    offset += 20;
    const URL_BASE = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    fetchPokemons(URL_BASE);
  });
};

// botão de previous - Logica para voltar 20 no offset e desativar qndo for igual a 0
function previousBtn() {
  const botaoPrevious = document.getElementById('previous');
  botaoPrevious.addEventListener('click', (event) => {
    event.preventDefault();
    if (offset >= 0) {
      document.getElementById('previous').disabled = false;
      offset -= 20;
      const URL_BASE = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
      fetchPokemons(URL_BASE);
    } else {
      document.getElementById('previous').disabled = true;
    }
  })
}

// pesquisa por pokemon
function searchPokemon() {
  const searchBtn = document.getElementById('search-pokemon');
  searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNames.value}`)
      .then(response => response.json())
      .then(dados => {
        const div = document.createElement('div');
        const pokemonTypes = dados.types.map((tipos) => tipos.type.name);

        div.className = 'modal-content';
        div.innerHTML = `
          <img src="${dados.sprites.other.dream_world.front_default}" alt="">
          
          <div class="dados">
            <h2>${dados.name}</h2>
            <p>Type: <span>${pokemonTypes}</span></p>
            <ul>Status:</ul>
              <li>HP = <span>${dados.stats[0].base_stat}</span></li>
              <li>Attack = <span>${dados.stats[1].base_stat}</span></li>
              <li>Defence = <span>${dados.stats[2].base_stat}</span></li>
              <li>Special Attack = <span>${dados.stats[3].base_stat}</span></li>
              <li>Special Defence = <span>${dados.stats[4].base_stat}</span></li>
              <li>Speed = <span>${dados.stats[5].base_stat}</span></li>
          </div>
        `;
        sectionModal.appendChild(div);
        sectionModal.style.display = 'block';
      })
      .catch(error => console.error("Não achou esse Pokemon:", error));
  })

}

function closeModal() {
  const closeBtn = document.getElementById('closeBtn');

  closeBtn.addEventListener('click', () => {
    sectionModal.style.display = 'none';
    location.reload();
  });

  window.addEventListener('click', (event) =>{
    if (event.target == sectionModal) {
      sectionModal.style.display = 'none';
      location.reload();
    }
  });

}

fetchPokemons(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
nextBtn();
previousBtn();
searchPokemon();
closeModal();