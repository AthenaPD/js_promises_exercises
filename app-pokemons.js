// 2. Once you have names and URLs of all the pokemon, 
// pick three at random and make requests to their URLs. 
// Once those requests are complete, console.log the data for each pokemon.
const baseURL = "https://pokeapi.co/api/v2/pokemon/"
const pokemonPromises = [];
for (let i=0; i<3; i++) {
    let id = Math.round(Math.random() * 1025);
    pokemonPromises.push(
        axios.get(`${baseURL}${id}`)
    );
}

Promise.all(pokemonPromises)
    .then(pokemonArr => {
        for (res of pokemonArr) console.log(res.data);
    })
    .catch(err => console.log(err));

// 3. Start with your code from 2, but instead of logging the data on each random pokemon, 
// store the name of the pokemon in a variable and then make another request, 
// this time to that pokemon’s ***species*** URL (you should see a key of ***species*** in the data). 
// Once *that* request comes back, look in the ***flavor_text_entries*** key of the response data 
// for a description of the species written in English. If you find one, ***console.log*** the 
// name of the pokemon along with the description you found.
// Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite
//  food, peat moss, as they dive underwater.”
Promise.all(pokemonPromises)
    .then(pokemonArr => {
        for (res of pokemonArr) {
            const name = res.data.name;
            axios.get(res.data.species.url)
                .then(species => {
                    const texts = species.data.flavor_text_entries;
                    const enIdx = texts.findIndex(txt => txt.language.name === 'en');
                    console.log(`${name}: ${texts[enIdx].flavor_text}`);
                })
        };
    })
    .catch(err => console.log(err));

// 4. BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. 
// Build an HTML page that lets you click on a button to generate data from three randomly 
// chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description 
// of its species which you found in 3.
$("#button").on('click', showPokemons);

function showPokemons(evt) {
    evt.preventDefault();

    // Get 3 random pokemons
    const baseURL = "https://pokeapi.co/api/v2/pokemon/"
    const pokemonPromises = [];
    for (let i=0; i<3; i++) {
        let id = Math.round(Math.random() * 1025);
        pokemonPromises.push(
            axios.get(`${baseURL}${id}`)
        );
    }

    Promise.all(pokemonPromises)
    .then(pokemonArr => {
        for (res of pokemonArr) {
            const name = res.data.name;
            const img = res.data.sprites.front_default;
            axios.get(res.data.species.url)
                .then(species => {
                    // Get description
                    const texts = species.data.flavor_text_entries;
                    const enIdx = texts.findIndex(txt => txt.language.name === 'en');
                    const des = texts[enIdx].flavor_text;

                    // Put a card representation of the pokemon on the page
                    const $pokemonCard = $(`
                        <div class="col">
                            <div class="card mx-3 my-2" style="width: 18rem;">
                                <img src="${img}" class="card-img-top" alt="An image of ${name}">
                                <div class="card-body">
                                    <h5 class="card-title">${name}</h5>
                                    <p class="card-text">${des}</p>
                                </div>
                            </div>
                        </div>
                        `);
                    
                    $('#pokemons').append($pokemonCard);
                })
        };
        $("#pokemons").append($("<br>"))
    })
    .catch(err => console.log(err));
}
