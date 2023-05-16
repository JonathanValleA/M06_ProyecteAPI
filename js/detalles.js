// Obtener el ID de la película de la URL
const urlParams = new URLSearchParams(window.location.search);
const peliculaId = urlParams.get("id");
//const apiKey = "k_j4g6jcax";
//const apiKey = "k_s586m13z";
//const apiKey = "k_yysqmxbt";
const apiKey = "k_4l4m4s7p";

async function obtenerDetallesPelicula() {
  // Obtener los detalles de la película desde IMDb
  const imdbResponse = await fetch(
    `https://imdb-api.com/es/API/Ratings/${apiKey}/${peliculaId}`
  );
  
  if (imdbResponse.ok) {
    const imdbData = await imdbResponse.json();
    console.log(imdbData);

    const calificacionElement = document.getElementById("calificacion");
    const calificacion = imdbData.theMovieDb;

    calificacionElement.innerHTML = `
      <span>${calificacion}</span>
      <div class="estrella">&#9733;</div>
      <div class="estrella">&#9733;</div>
      <div class="estrella">&#9733;</div>
      <div class="estrella">&#9733;</div>
      <div class="estrella">&#9733;</div>
    `
    // Obtener la URL de la imagen de la película utilizando la API de TMDb
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=af87c317ca9efc8e3eb09ebb0e73a2c9`
    );

    if (tmdbResponse.ok) {
      const tmdbData = await tmdbResponse.json();
      const imagenURL = `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`;

      // Mostrar los detalles de la película en la página
      const tituloElement = document.getElementById("titulo");
      const imagenElement = document.getElementById("imagen");
      const descripcionElement = document.getElementById("descripcion");
      const añoElement = document.getElementById("año");

      tituloElement.textContent = imdbData.title;
      descripcionElement.textContent = imdbData.type;
      añoElement.textContent = imdbData.year;
      imagenElement.src = imagenURL;
    } else {
      console.log("Error al obtener los detalles de la película desde TMDb");
    }
  } else {
    console.log("Error al obtener los detalles de la película desde IMDb");
  }
}


// Llamar a la función para obtener los detalles de la película al cargar la página
document.addEventListener("DOMContentLoaded", obtenerDetallesPelicula);
