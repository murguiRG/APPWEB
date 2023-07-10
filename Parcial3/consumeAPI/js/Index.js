let nombrePersonajeRef = document.getElementById("barra_busqueda").value;
let buscar = document.getElementById("buscar");
let resultados = document.getElementById("resultados");

let buscarPersonaje = () => {
    let nombrePersonaje = nombrePersonajeRef.value;
    
    //Si se desea ver un personaje
    let url = `https://apisimpsons.fly.dev/api/personajes/find/${nombrePersonaje}`

    //Si la barra de búsqueda tiene un valor
    if (nombrePersonaje.length > 0) {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                
                //Si el personaje existe en la BD
                if (data.result.length > 0) {
                    //Borra los datos de la última consulta
                    resultados.innerHTML = "";
                    
                    //Falta fuente de imagen
                    data.result.forEach((personaje) => {
                        
                        resultados.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <img src="..." class="card-img-top" alt=${personaje.Nombre}> 
                            <div class="card-body">
                                <h4 class="card-title">${personaje.Nombre}</h4>
                                <h5>Historia</h5>
                                <p class="card-text">${personaje.Historia}</p>
                                <h5>Género:</h5>
                                <p class="card-text">${personaje.Genero}</p>
                                <h5>Estado</h5>
                                <p class="card-text">${personaje.Estado}</p>
                                <h5>Ocupación</h5>
                                <p class="card-text">${personaje.Ocupacion}</p>                        
                            </div>
                        </div>
                        ` 
                    });
                    
                }//El personaje no existe en la BD
                else {
                    resultados.innerHTML = `<h3>${data.Error}</h3>`
                }
            })
            //Para indicar que hubo un error desconocido
            .catch(() => {
            resultados.innerHTML = `<h3>Ocurrió un error</h3>`
        })
    }     
}
buscar.addEventListener("click", buscarPersonaje);
window.addEventListener("load", buscarPersonaje);

//Si una vez presionado el "buscar" el campo está vacío...

if (nombrePersonajeRef.length == 0) {
    resultados.innerHTML = `<h3>Ingresa el nombre del personaje</h3>`
}