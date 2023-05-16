//const apiKey = "k_j4g6jcax";
//const apiKey = "k_s586m13z"
//const apiKey = "k_yysqmxbt";
const apiKey = "k_4l4m4s7p";
let paginacion = 1;
let paginacionFiltrada = 1;
// Función para buscar películas en la API de IMDB
async function buscarPeliculas() {
    const input = document.querySelector(".input");
    const busqueda = input.value;
  
      // Realizar la solicitud a la API de búsqueda de películas
      const response = await fetch(
        `https://imdb-api.com/es/API/SearchMovie/${apiKey}/${busqueda}`
      );
    
      if (response.ok) {
        const data = await response.json();
        console.log(data);

            // Manipular los datos recibidos y mostrar las películas
        const peliculasContainer = document.querySelector(".peliculas");
        peliculasContainer.innerHTML = ""; // Limpiar el contenedor de películas
    
        data.results.forEach((pelicula) => {
          const viewPeli = document.createElement("a");
          viewPeli.href = "detalles.html?id=" + pelicula.id;
          viewPeli.classList.add("view-peli");
    
          const img = document.createElement("img");
          img.src = pelicula.image;
    
          const p = document.createElement("p");
          p.textContent = pelicula.title;
    
          viewPeli.appendChild(img);
          viewPeli.appendChild(p);

          viewPeli.addEventListener("click", () => {
            const id = pelicula.id;
            mostrarDetallesPelicula(id);
        })
    
          peliculasContainer.appendChild(viewPeli);
        });

        paginacionFiltrada = 1;
      } 
    
}
  
// Asignar el evento de clic al botón de búsqueda
const buscarBtn = document.querySelector(".buscar");
buscarBtn.addEventListener("click", buscarPeliculas);

// Función para obtener películas populares de la API de IMDB
async function obtenerPeliculasPopulares() {

  if(!localStorage.getItem(`https://imdb-api.com/es/API/Top250Movies/${apiKey}`)) {
      // Realizar la solicitud a la API para obtener películas populares
      const response = await fetch(
        `https://imdb-api.com/es/API/Top250Movies/${apiKey}`
      );
    
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem(`https://imdb-api.com/es/API/Top250Movies/${apiKey}`, JSON.stringify(data));
      }
    }
    let data = JSON.parse(localStorage.getItem(`https://imdb-api.com/es/API/Top250Movies/${apiKey}`));
    peliculas(data, paginacion);
}
window.addEventListener("scroll", (e) => {

  if((window.scrollY + window.innerHeight) >= document.body.scrollHeight) {
    let data;
    if(document.querySelector(".input").value) {
      data = `https://imdb-api.com/es/API/SearchMovie/${apiKey}/${busqueda}`
      paginacionFiltrada++;
      peliculas(data, paginacionFiltrada);
    }else{
      data = JSON.parse(localStorage.getItem(`https://imdb-api.com/es/API/Top250Movies/${apiKey}`));
      paginacion++;
      peliculas(data, paginacion);
    }
  }
})


// Mostrar todas las mejores peliculas
async function peliculas(data, paginacion) {

    // Manipular los datos recibidos y mostrar las películas
    const peliculasContainer = document.querySelector(".peliculas");
    peliculasContainer.innerHTML = ""; // Limpiar el contenedor de películas

    const peliculasPopulares = data.items.slice(0,paginacion* 15); // Obtener solo las 10 primeras peliculas

    peliculasPopulares.forEach((pelicula) => {
      
      const viewPeli = document.createElement("a");
      viewPeli.href = "detalles.html?id=" + pelicula.id;
      viewPeli.classList.add("view-peli");

      const img = document.createElement("img");
      img.src = pelicula.image;

      const p = document.createElement("p");
      p.textContent = pelicula.fullTitle;

      viewPeli.appendChild(img);
      viewPeli.appendChild(p);

      viewPeli.addEventListener("click", () => {
          const id = pelicula.id;
          mostrarDetallesPelicula(id);
      })
      peliculasContainer.appendChild(viewPeli);
    });
}

// Llamar a obtenerPeliculasPopulares() al cargar la página
document.addEventListener("DOMContentLoaded", obtenerPeliculasPopulares);

// Función para mostrar los detalles de una película en una página nueva
function mostrarDetallesPelicula(id) {
    // Crear la URL de la página de detalles de la película con el ID de la película
    const detallesURL = `detalles.html?id=${id}`;
  }
  
  