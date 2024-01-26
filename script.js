const searchBox = document.getElementById('searchBox');
const pokeForm = document.getElementById('pokeForm');

pokeForm.addEventListener('submit', displayPokemon);
searchBox.addEventListener('keyup', getInput)

getPokemonNames();

let pokemonNameList = [];

async function getPokemonNames(){

    const requset = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data    = await requset.json();

    pokemonNameList = data.results.map((element) => {
        return element.name;
    });
}


function getInput(){

    removePokemonAutoComplete();

    const value = searchBox.value.toLowerCase();

    if (value.length === 0) return;

    const inputedValue = [];

    pokemonNameList.forEach((pokemonName) =>{

        if(pokemonName.substr(0, value.length).toLowerCase() === value){
            inputedValue.push(pokemonName);
        }
    });
    createPokemonAutoComplete(inputedValue);
}
function createPokemonAutoComplete(object){

    const objectEl = document.createElement('ul');
    objectEl.className = 'autocomplete';

    object.slice(0,4).forEach((element) => {
        const objectItem = document.createElement('li');
        const objectButton = document.createElement('button');
        objectButton.innerHTML = element;
        objectButton.addEventListener('click', selectPokemonName)
        objectItem.appendChild(objectButton);
        objectEl.appendChild(objectItem);
    });

    document.querySelector('.searchWrapper').appendChild(objectEl);

}
function removePokemonAutoComplete(){
    const objectEl = document.querySelector('.autocomplete')
    if (objectEl !== null) objectEl.remove();
}
function selectPokemonName(bt){
    bt.preventDefault();

    const objectButton = bt.target;
    searchBox.value = objectButton.innerHTML;
    removePokemonAutoComplete();
}
function displayPokemon(event){
    event.preventDefault();

    const pokemonName = searchBox.value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then((data) => {
            document.querySelector('.pokemonChar h1').textContent = data.name.toUpperCase();
            document.getElementById('pokemonImage').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
        })
        .catch((error)=>{
            console.log(error);
        });


}
