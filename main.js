const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search");
const results = document.getElementById("results");
const errorImage = document.getElementById("error");
const divTypes = document.getElementById("divTypes");
const divTypesNames = document.getElementById("divTypesNames");
errorImage.hidden = true;
// const searchPokemon = async (pokemonId) => {
//     const { data } = await axios.get(
//         `http://pokeapi.co/api/v2/pokemon/${pokemonId}`
//     );
//     makeDiv(
//         data.name,
//         data.height,
//         data.weight,
//         data.sprites.front_default,
//         data.sprites.back_default
//     );
// };

searchButton.addEventListener("click", () => {
    searching(searchInput.value);
});

async function searching(id) {
    try {
        errorImage.hidden = true;
        const { data } = await axios.get(
            `http://pokeapi.co/api/v2/pokemon/${id}`
        );
        makeDiv(
            data.name,
            data.height,
            data.weight,
            data.sprites.front_default,
            data.sprites.back_default,
            data.types
        );
    } catch (e) {
        errorImage.hidden = false;
        results.innerHTML="";
        divTypes.innerHTML = "";
        divTypesNames.innerHTML = "";
        searchInput.value="";
    }
}

searchInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        searching(searchInput.value);
    }
});

const makeDiv = (name, height, weight, front, over, types) => {
    const htmlText = `
    <div class="pokemonContainer">
    <div>Name: ${name}</div>
    <div>height: ${height}</div>
    <div>weight: ${weight}</div>
    <div><img id="pokemonImg" src="${front}" /></div> 
    </div>`;
    results.innerHTML = htmlText;
    const pokemonImg = document.getElementById("pokemonImg");
    pokemonImg.onmouseover = () => (pokemonImg.src = over);
    pokemonImg.onmouseout = () => (pokemonImg.src = front);

    divTypes.innerHTML = "";
    for (let i = 0; i < types.length; i++) {
        const type = document.createElement("div");
        type.innerHTML = `type ${i + 1}: ${types[i].type.name}`;
        type.onclick = () => {
            axios.get(`${types[i].type.url}`).then((res) => {
                divTypesNames.innerHTML = "";
                for (let j = 0; j < res.data.pokemon.length; j++) {
                    const typeName = document.createElement("li");
                    typeName.innerHTML = res.data.pokemon[j].pokemon.name;
                    divTypesNames.append(typeName);
                    typeName.onclick = () => {
                        searching(res.data.pokemon[j].pokemon.name);
                        divTypes.innerHTML = "";
                        divTypesNames.innerHTML = "";
                        searchInput.value="";
                    };
                }
            });
        };
        divTypes.append(type);
    }
};

// const searching=()=>{
//   axios.get(`http://pokeapi.co/api/v2/pokemon/${searchInput.value}`)
//   .then(res=>{

// const name=document.createElement("h1");
// const height=document.createElement("p");
// const weight=document.createElement("p");
// const image=document.createElement("img");
// name.id="name";
// height.id="height";
// weight.id="weight";
// image.id="image";

// name.innerHTML=data.name;
// height.innerHTML=data.height;
// weight.innerHTML=data.weight;
// // image.src=data.sprites.front_default;

// results.append(
//   name,
//   height,
//   weight,
//   image
// );
//   }
