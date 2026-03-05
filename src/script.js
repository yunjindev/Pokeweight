const pokemonOneInput = document.getElementById("pokemonOneInput");
const pokemonTwoInput = document.getElementById("pokemonTwoInput");
const submitBtn = document.getElementById("submitBtn");
const pokeCompare = document.getElementById("pokeCompare");
const pokeResult = document.getElementById("pokeResult");

function grabPokemonName(pokemonInput) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput.value.toLowerCase()}`)
        .then(response => response.json())
        .then(value =>  value.weight)
        .catch(err => {
            pokeCompare.textContent = "Error! Enter a real pokemon!";
            console.error(err)});
}

submitBtn.addEventListener("click", () => {
    pokeResult.hidden = false;
    if (pokemonOneInput.value === "" || pokemonTwoInput.value === "") {
        pokeCompare.textContent = "A pokemon field is missing!";
        return;
    }
    const pokemonOneWeight = grabPokemonName(pokemonOneInput);
    const pokemonTwoWeight = grabPokemonName(pokemonTwoInput);
    Promise.all([pokemonOneWeight, pokemonTwoWeight])
        .then(([weightOne, weightTwo]) => {
            if (weightOne === weightTwo && (weightOne == undefined && weightTwo == undefined)) {
            pokeCompare.textContent = "Error: Both pokemon are not found!"
        } else if (weightOne === weightTwo) {
            pokeCompare.textContent = "They are the same pokemon!"
        } else if (weightOne == undefined || weightTwo == undefined) {
            pokeCompare.textContent = "Error! One of the pokemon are not found!";
        } else if (weightOne > weightTwo) {
            pokeCompare.textContent = `${pokemonOneInput.value} (${weightOne}kg) is heavier than ${pokemonTwoInput.value} (${weightTwo}kg)!`
        } else {
            pokeCompare.textContent = `${pokemonTwoInput.value} (${weightTwo}kg) is heavier than ${pokemonOneInput.value} (${weightOne}kg)!`

        }
    });
});
