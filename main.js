const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search");
const results = document.getElementById("results");

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

searchButton.addEventListener("click", async () => {
    const { data } = await axios.get(
        `http://pokeapi.co/api/v2/pokemon/${searchInput.value}`
    );
    makeDiv(
        data.name,
        data.height,
        data.weight,
        data.sprites.front_default,
        data.sprites.back_default
    );
});

searchInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        searchPokemon(searchInput.value);
    }
});

const makeDiv = (name, height, weight, front, over) => {
    const htmlText = `
    <div class="pokemonContainer">
    <div>Name: ${name}</div>
    <div>height: ${height}</div>
    <div>weight: ${weight}</div>
    <div>picture: <img id="pokemonImg" src="${front}" /></div> 
    </div>`;
    results.innerHTML = htmlText;
    const pokemonImg = document.getElementById("pokemonImg");
    pokemonImg.onmouseover = () => (pokemonImg.src = over);
    pokemonImg.onmouseout = () => (pokemonImg.src = front);
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
