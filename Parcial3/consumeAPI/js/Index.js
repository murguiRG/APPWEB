let nombrePersonajeRef = document.getElementById("barra_busqueda").value;
let buscar = document.getElementById("buscar");
let resultados = document.getElementById("resultados");

let buscarPersonaje = () => {
    let nombrePersonaje = nombrePersonajeRef.value;
    
    //Si se desea ver un personaje
    let url = `https://apisimpsons.fly.dev/api/personajes/find/${nombrePersonaje}`;
    console.log(url);
    //Si la barra de búsqueda tiene un valor
    if (nombrePersonaje > 0) {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {

                
                //Si el personaje existe en la BD
                if (data.result.length > 0) {
                    //Borra los datos de la última consulta
                    resultados.innerHTML = "";
                    
                    //Falta fuente de imagen
                    data.result.forEach((result) => {
                        
                        resultados.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <img src="..." class="card-img-top" alt=${result.Nombre}> 
                            <div class="card-body">
                                <h4 class="card-title">${result.Nombre}</h4>
                                <h5>Historia</h5>
                                <p class="card-text">${result.Historia}</p>
                                <h5>Género:</h5>
                                <p class="card-text">${result.Genero}</p>
                                <h5>Estado</h5>
                                <p class="card-text">${result.Estado}</p>
                                <h5>Ocupación</h5>
                                <p class="card-text">${result.Ocupacion}</p>                        
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