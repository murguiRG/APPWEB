let pokecard = document.getElementById("mipokemon");
let pokeNameId = document.getElementById("poke-name");
let searchBtn = document.getElementById("search");
let notice = document.getElementById("msg");
let url = "https://pokeapi.co/api/v2/pokemon/";

for (let id = 1; id <= 151; id++) 
{
    fetch(url + id)
        .then((respuesta) => respuesta.json())
        .then((data) => {pokemon(data);});
}

function pokemon(data) 
{
    const tarjetaPokeItem = document.createElement("div");

    let tipos = "";
    for (let i = 0; i < data.types.length; i++) 
    {
        tipos += `<button class="card-text ${data.types[i].type.name}">${data.types[i].type.name}</button>`;
    }
    let estadisticas = "";
    for (let i = 0; i < data.stats.length; i++) 
    {
    estadisticas += `<p class="card-text">${data.stats[i].stat.name}: ${data.stats[i].base_stat}</p>`;
    }

    console.log(data.sprites);

    //Hago un segundo fetch porque data no contiene directamente el flavor-text que necesito para
    //la descripción. Este se encuentra en una segunda url: data > species.url > flavor-text

    let descripcion = "";    
    fetch(data.species.url)        
    .then((respuesta) => respuesta.json())
    .then((species) => 
    {
        // console.log(species);
        const entries = species.flavor_text_entries;
        for (let i = 0; i < entries.length; i++) 
        {
            if (entries[i].language.name === "en") 
            {
                descripcion = entries[i].flavor_text;
                break;
            }
        }
       
        const modalHTML = 
        `
            <div class="card mipokemon">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                <h4 class="card-text">${tipos}</h4> 
                <div class="card-body">
                    <p class="card-title">${data.name} #${data.id}</p>                                                           
                    <button type="button" class="miboton btn" data-bs-toggle="modal" data-bs-target="#poke${data.id}">Details</button>
                </div>
            </div>
            
            <div class="modal fade" id="poke${data.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="staticBackdropLabel">${data.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Details</h1>
                            <p class="">${descripcion}</p>
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Statistics</h1>
                            <p>${estadisticas}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        tarjetaPokeItem.innerHTML = modalHTML;
        pokecard.appendChild(tarjetaPokeItem);
    });
}



let getpoke = () => {
    notice.innerHTML = ""; //limpia mi aviso si hay algo
    let estepoke = pokeNameId.value;
    let url = `https://pokeapi.co/api/v2/pokemon/${estepoke}`;
    if (estepoke.length <= 0) {
        notice.innerHTML = `<h3>Pokemon no encontrado</h3>`;
    } else {
        fetch(url)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Pokemon no encontrado"); 
                }
                return resp.json();
            })
            .then((dataType) => {
                const tipos = obtenerTipos(dataType);
                pokecard.innerHTML =
                    `
                    <div class="card mipokemon">
                        <img src="${dataType.sprites.front_default}" class="card-img-top" alt="${dataType.name}">
                        <h4 class="card-text">${tipos}</h4> 
                        <div class="card-body">
                            <p class="card-title">${dataType.name} #${dataType.id}</p>                                                           
                            <button onclick="location.reload()" type="button" class="miboton">Ver Todos</button>
                        </div>
                    </div>
                `;
            })
            .catch((error) => {
                notice.innerHTML = `<h3>${error.message}</h3>`; //aviso si se produce un error
            });
    }
};

function obtenerTipos(data) {
    let tipos = "";
    for (let i = 0; i < data.types.length; i++) {
        tipos += `<button class="card-text ${data.types[i].type.name}">${data.types[i].type.name}</button>`;
    }
    return tipos;
}

searchBtn.addEventListener("click", getpoke);
