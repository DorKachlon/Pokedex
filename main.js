const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search");
const results = document.getElementById("results");
const divTypes = document.getElementById("divTypes");
const divTypesNames = document.getElementById("divTypesNames");
const nextPokemon = document.getElementById("nextPokemon");
const previousPokemon = document.getElementById("previousPokemon");
const divImg = document.getElementById("divImg");
const headerPokemonType = document.getElementById("headerPokemonType");

searchButton.addEventListener("click", () => {
    searching(searchInput.value);
});

async function searching(id) {
    try {
        const { data } = await axios.get(
            `http://pokeapi.co/api/v2/pokemon/${id}`
        );
        results.style.background =
            "linear-gradient(180deg, white 20%, #f0f0f0c2 80%)";
        divTypes.hidden = false;
        divImg.hidden = false;
        makeDiv(
            data.name,
            id,
            data.height,
            data.weight,
            data.sprites.front_default,
            data.sprites.back_default,
            data.types
        );

        if (id == 1) {
            nextPreviosButton("10153", "2");
        } else if ((id > 1 && id < 806) || (id > 1000 && id < 10153)) {
            nextPreviosButton(`${parseInt(id) - 1}`, `${parseInt(id) + 1}`);
        } else if (id == 807) {
            nextPreviosButton("806", "10001");
        } else if (id == 10153) {
            nextPreviosButton("10152", "1");
        }
    } catch (e) {
        results.innerHTML = "";
        divTypes.innerHTML = "";
        divTypesNames.innerHTML = "";
        searchInput.value = "";
        divImg.innerHTML = "";
        headerPokemonType.innerHTML = "";
        headerPokemonType.style = "";
        results.style.background = "";
        divTypes.hidden = true;
        divImg.hidden = true;
        nextPokemon.innerHTML = "";
        previousPokemon.innerHTML = "";
        headerPokemonType.innerHTML = "";
        Swal.fire({
            icon: "error",
            title: "Oops... error 404",
            text: "Something went wrong!",
        });
    }
    searchInput.value = "";
    headerPokemonType.hidden = true;
    divTypesNames.innerHTML = "";
}

async function nextPreviosButton(previousID, nextID) {
    const next = await axios.get(`http://pokeapi.co/api/v2/pokemon/${nextID}`);
    const previous = await axios.get(
        `http://pokeapi.co/api/v2/pokemon/${previousID}`
    );
    nextPokemon.innerHTML = `${next.data.name} #${next.data.id}   <i class="fa fa-arrow-right" aria-hidden="true"></i>`;
    previousPokemon.innerHTML = `<i class="fa fa-arrow-left" aria-hidden="true"></i>   ${previous.data.name} #${previous.data.id}`;
    nextPokemon.onclick = () => {
        searching(next.data.id);
    };
    previousPokemon.onclick = () => {
        searching(previous.data.id);
    };
}

searchInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        searching(searchInput.value);
    }
});

const makeDiv = (name, id, height, weight, front, over, types) => {
    const htmlText = `
    <div id="nameId">
    <div id="namePokemon">${name}</div>
    <span id="idPokemon">#${id}</span>
    </div>
    <div id="ditails">
    <div id="heightPokemon">height: ${height} </div>
    <div id="weightPokemon">weight: ${weight}</div>
    </div>`;
    divImg.innerHTML = `<img id="pokemonImg" src="${front}" /></div> `;
    results.innerHTML = htmlText;
    const pokemonImg = document.getElementById("pokemonImg");
    pokemonImg.onmouseover = () => (pokemonImg.src = over);
    pokemonImg.onmouseout = () => (pokemonImg.src = front);

    divTypes.innerHTML = "<p>Type</p>";
    for (let i = 0; i < types.length; i++) {
        const type = document.createElement("button");
        type.innerHTML = types[i].type.name;
        type.className = types[i].type.name;
        type.onclick = async () => {
            divTypesNames.innerHTML = "";
            const { data } = await axios.get(`${types[i].type.url}`); //"https://pokeapi.co/api/v2/type/12/"
            headerPokemonType.innerHTML = `Pokemons from type ${data.name}`;
            headerPokemonType.style.background = getComputedStyle(
                type
            ).background;
            headerPokemonType.style.backgroundColor = getComputedStyle(
                type
            ).backgroundColor;
            headerPokemonType.style.color = getComputedStyle(type).color;

            for (let j = 0; j < data.pokemon.length; j++) {
                creatPokemonsByType(data.pokemon[j].pokemon.url); //https://pokeapi.co/api/v2/pokemon/1/
            }
            headerPokemonType.hidden = false;
        };
        divTypes.append(type);
    }
};

function creatPokemonsByType(url) {
    //https://pokeapi.co/api/v2/pokemon/1/
    debugger;
    const pokemonByTypeContainer = document.createElement("div");
    const pokemonByTypeName = document.createElement("div");
    const pokemonByTypePicture = document.createElement("img");
    const pokemonByTypeId = document.createElement("div");
    pokemonByTypeContainer.className = "pokemonByTypeContainer";
    pokemonByTypeName.className = "pokemonByTypeName";
    pokemonByTypePicture.className = "pokemonByTypePicture";
    pokemonByTypeId.className = "pokemonByTypeId";
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            pokemonByTypeName.innerHTML = data.name;
            pokemonByTypePicture.src = data.sprites.front_default;
            pokemonByTypeId.innerHTML = `#${data.id}`;
            pokemonByTypeContainer.append(
                pokemonByTypePicture,
                pokemonByTypeId,
                pokemonByTypeName
            );
            divTypesNames.appendChild(pokemonByTypeContainer);
            pokemonByTypeContainer.onclick = () => {
                searching(data.id);
                divTypesNames.innerHTML = "";
                searchInput.value = "";
                headerPokemonType.innerHTML = "";
                headerPokemonType.style = "";
            };
        });
}
