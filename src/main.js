import './style.css'


const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/'
fetch(URL_BASE)
  .then((response) => response.json())
  .then((data) => console.log(data.results))