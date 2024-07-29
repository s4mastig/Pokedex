let pokemonData = [];

let offset = 0;
const limit = 20;

async function init() {
    loadingSpinner.style.display = 'flex';
    await getDataPokemon();
    delayedRenderAndHideSpinner();
}

function delayedRenderAndHideSpinner() {
    setTimeout(() => {
        renderPokemon();
        loadingSpinner.style.display = 'none';
    }, 1500);
}

async function getDataPokemon() {
    for (let i = 1; i <= 151; i++) {

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let responseAsJson = await response.json();
        pokemonData.push(responseAsJson);
    }
}

function renderPokemon() {
    for (let i = offset; i < offset + limit; i++) {
        let singlePokemon = pokemonData[i];
        let button = document.getElementById('loadButton');

        if (!singlePokemon) {
            button.innerHTML = '';
            break;
        }

        renderSinglePokemon(singlePokemon, i);
    }
    offset += limit;
}

function renderSinglePokemon(singlePokemon, i) {
    let content = document.getElementById('content');
    let pokemonName = singlePokemon.name;
    pokemonName = capitalizeFirstLetter(pokemonName);
    let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
    let types = singlePokemon.types;
    let type1 = types[0].type.name;
    type1 = capitalizeFirstLetter(type1);
    let type2 = checkIfType2(types);
    let type2Div = checkIfType2Div(type2);
    let id = singlePokemon.id;

    content.innerHTML += renderPokemonHtml(i, id, type1, pokemonName, type2Div, pokemonImg);
    updateLoadButton();
}

function updateLoadButton() {
    let button = document.getElementById('loadButton');
    button.innerHTML = `<button onclick="loadMore()">Load more</button>`;
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
        type2Div = `<div class="type ${type2}">${type2}</div>`;
    }
    return type2Div;
}

function checkIfType2DivOpen(type2) {
    let type2Div = '';
    if (type2) {
        type2 = capitalizeFirstLetter(type2);
        type2Div = `<div class="type-open ${type2}">${type2}</div>`;
    }
    return type2Div;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadMore() {
    let loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'flex';

    delayedRenderAndHideSpinner();
}

function filterPokedex() {
    let search = document.getElementById('search').value.toLowerCase();
    let content = document.getElementById('content');
    let button = document.getElementById('loadButton');
    button.innerHTML = '';
    
    if (search === '') {
        resetPokedex(content);
        return;
    }
    
    if (search.length < 3) {
        content.innerHTML = '';
        return;
    }
    
    let filteredPokemon = pokemonData.filter(pokemon => pokemon.name.toLowerCase().startsWith(search));
    displayFilteredPokemon(filteredPokemon, content);
}

function resetPokedex(content) {
    loadingSpinner.style.display = 'flex';
    offset = 0;
    content.innerHTML = '';
    delayedRenderAndHideSpinner();
}

function displayFilteredPokemon(filteredPokemon, content) {
    content.innerHTML = '';
    for (let i = 0; i < filteredPokemon.length && i < 10; i++) { 
        let singlePokemon = filteredPokemon[i];
        let originalIndex = pokemonData.indexOf(singlePokemon);
        let pokemonName = capitalizeFirstLetter(singlePokemon.name);
        let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
        let types = singlePokemon.types;
        let type1 = capitalizeFirstLetter(types[0].type.name);
        let type2 = checkIfType2(types);
        let type2Div = checkIfType2Div(type2);
        let id = singlePokemon.id;
        
        content.innerHTML += renderPokemonHtml(originalIndex, id, type1, pokemonName, type2Div, pokemonImg);
    }
}

function openEntry(i) {
    content = document.getElementById('content');
    let singlePokemon = pokemonData[i];
    let pokemonImg = singlePokemon.sprites.other["official-artwork"].front_default;
    let types = singlePokemon.types;
    let type1 = types[0].type.name;
    type1 = capitalizeFirstLetter(type1);

    content.innerHTML += openEntryHtml(type1, pokemonImg, i);
    loadInfo(i);
}

function loadInfo(i) {
    colorButtons();
    let singlePokemon = pokemonData[i];
    let pokemonName = singlePokemon.name
    let pokemonHeight = singlePokemon.height / 10;
    let pokemonWeight = singlePokemon.weight / 10;
    pokemonName = capitalizeFirstLetter(pokemonName);
    let types = singlePokemon.types;
    let type1 = types[0].type.name;
    type1 = capitalizeFirstLetter(type1);
    let type2 = checkIfType2(types);
    let type2Div = checkIfType2DivOpen(type2);
    let id = singlePokemon.id;
    
    updateInfoClass();
    let infos = document.getElementById('info');
    infos.innerHTML = '';
    infos.innerHTML = loadInfoHtml(pokemonName, id, pokemonHeight, pokemonWeight, type1, type2Div, i);
    toggleSeparators();
}

function updateInfoClass(infos) {
    document.getElementById('info').classList.remove('stats');
    document.getElementById('info').classList.add('info');
}

function toggleSeparators() {
    document.getElementById('separator').classList.toggle('separator');
    document.getElementById('separator2').classList.toggle('separator2');
}

function cry(i) {
    let singlePokemon = pokemonData[i];
    let cry = singlePokemon.cries.latest;
    let audio = new Audio(`${cry}`);
    audio.volume = 0.05;
    audio.play();
}

function loadStats(i) {
    document.getElementById('info').classList.add('stats');
    document.getElementById('info').classList.remove('info');
    let singlePokemon = pokemonData[i];
    let baseStats = singlePokemon.stats;
    let statDivs = document.getElementById('info');
    statDivs.innerHTML = '';
    colorButtons();

    for (let j = 0; j < baseStats.length; j++) {
        let baseStat = baseStats[j].base_stat;
        let statName = baseStats[j].stat.name;
        statName = capitalizeFirstLetter(statName);
        statDivs.innerHTML += statDivsHtml(statName, baseStat);
    }
    toggleSeparators();
}

function colorButtons() {
    document.getElementById('buttonRight').classList.toggle('button-clicked');
    document.getElementById('buttonLeft').classList.toggle('button-clicked');
}

function closeCard() {
    let popUp = document.getElementById('popUp');
    popUp.remove();
}

function nextRight(i) {
    let popUp = document.getElementById('popUp');
    popUp.remove();
    if (i === 150) {
        i = 0;
        openEntry(i);
    }
    else {
        i++
        openEntry(i);
    }
}

function nextLeft(i) {
    let popUp = document.getElementById('popUp');
    popUp.remove();
    if (i === 0) {
        i = 150;
        openEntry(i);
    }
    else {
        i--
        openEntry(i);
    }
}