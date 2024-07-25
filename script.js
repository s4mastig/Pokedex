let pokemonData = [];

let offset = 0;
const limit = 20;

async function init() {
    await getDataPokemon();
    renderPokemon();
}

async function getDataPokemon() {
    for (let i = 1; i < 21; i++) {

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let responseAsJson = await response.json();
        pokemonData.push(responseAsJson);

    }

}

function renderPokemon() {
    for (let i = 0; i < pokemonData.length; i++) {
        let singlePokemon = pokemonData[i];

        let content = document.getElementById('content');
        let button = document.getElementById('loadButton');
        let pokemonName = singlePokemon.name;
        pokemonName = capitalizeFirstLetter(pokemonName);
        let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
        let types = singlePokemon.types;
        let type1 = types[0].type.name;
        type1 = capitalizeFirstLetter(type1);
        let type2 = checkIfType2(types);
        let type2Div = checkIfType2Div(type2);
        let id = singlePokemon.id;

        content.innerHTML += renderPokemonHtml(id, type1, pokemonName, type2Div, pokemonImg);
        button.innerHTML = `<button onclick="loadMore()">Load more</button>`;
    }
}

function checkIfType2(types) {
    let type2 = null;
    if (types.length > 1) {
        type2 = types[1].type.name;
    }
    return type2;
}
function checkIfType2Div(type2) {
    let type2Div = '';
    if (type2) {
        type2 = capitalizeFirstLetter(type2);
        type2Div = `<div class="type">${type2}</div>`;
    }
    return type2Div;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokemonHtml(id, type1, pokemonName, type2Div, pokemonImg) {
    return `
           <div class="poke-card ${type1}" onclick="openEntry()">
                <div class="poke-id">
                    <div>#${id}</div>
                </div>
                <div class="name-span">
                    <span>${pokemonName}</span>
                </div>
                <div class="lower-section">
                    <div class="types">
                        <div class="type">${type1}</div>
                        ${type2Div}
                    </div>
                    <img class="poke-img" src="${pokemonImg}">
                </div>
            </div>
            `;
}

async function loadMore() {
    pokemonData.length = pokemonData.length + 1;
    let x = pokemonData.length + 20;
    for (let i = pokemonData.length; i < x; i++) {

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let responseAsJson = await response.json();
        pokemonData.push(responseAsJson);
        showMore(i);
    }
    // console.log(pokemonData);
}

function showMore(i) {
    let singlePokemon = pokemonData[i];

    let content = document.getElementById('content');
    let button = document.getElementById('loadButton');
    let pokemonName = singlePokemon.name;
    pokemonName = capitalizeFirstLetter(pokemonName);
    let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
    let types = singlePokemon.types;
    let type1 = types[0].type.name;
    type1 = capitalizeFirstLetter(type1);
    let type2 = checkIfType2(types);
    let type2Div = checkIfType2Div(type2);
    let id = singlePokemon.id;

    content.innerHTML += renderPokemonHtml(id, type1, pokemonName, type2Div, pokemonImg);
    button.innerHTML = `<button onclick="loadMore()">Load more</button>`;
}

async function filterPokedex() {
    for (let i = 1; i < 100; i++) {

        let search = document.getElementById('search').value;
        search = search.toLowerCase();
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let responseAsJson = await response.json();
        // console.log(responseAsJson);

        let singlePokemon = responseAsJson;

        let content = document.getElementById('content');
        let button = document.getElementById('loadButton');
        let pokemonName = singlePokemon.name;
        pokemonName = capitalizeFirstLetter(pokemonName);
        let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
        let types = singlePokemon.types;
        let type1 = types[0].type.name;
        type1 = capitalizeFirstLetter(type1);
        let type2 = checkIfType2(types);
        let type2Div = checkIfType2Div(type2);
        let id = singlePokemon.id;


        if (pokemonName.toLowerCase().includes(search)) {

            button.innerHTML = '';
            content.innerHTML = renderPokemonHtml(id, type1, pokemonName, type2Div, pokemonImg);
        } 
        if (search === '') {
            content.innerHTML = '';
            renderPokemon();
        }
    }
}

// function openEntry(i) {
//     content = document.getElementById('content');
//     content.innerHTML += `
//     <div class="large-background" onclick="closeCard()">
//         <div class="poke-card-open"></div>    
//     </div>
    
//     `;
// }

// function closeCard() {
//     content = document.getElementById('content');
//     content.innerHTML = '';
//     content.innerHTML += renderPokemon();
// }