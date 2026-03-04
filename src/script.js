const inputText = document.getElementById("inputText");
const submitBtn = document.getElementById("submitBtn");
const pokeName = document.getElementById("pokeName");

function grabPokemonName() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputText.value.toLowerCase()}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const pokeWeight = data.weight;
            const pokeNameText = data.name;
            pokeName.textContent = `${pokeNameText} and ${pokeWeight}`;
            initGame(pokeWeight);
        })
        .catch(err => {
            pokeName.textContent = "Error: Enter a real pokemon!";
            console.error(err)});

        function initGame(pokeWeight) {
            if (pokeWeight > 100) {
                console.log("Hes heavier");
        } else {
            console.log("They are lighter");
        }
    }
}

submitBtn.addEventListener("click", () => {
    grabPokemonName();
});
