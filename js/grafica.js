//const apiKey = "k_j4g6jcax";
//const apiKey = "k_s586m13z";
//const apiKey = "k_yysqmxbt";
const apiKey = "k_4l4m4s7p";

// Función para obtener los datos de las películas más populares
async function obtenerPeliculasPopulares() {

  if(!localStorage.getItem(`https://imdb-api.com/es/API/MostPopularMovies/${apiKey}`)) {
      const response = await fetch(
        `https://imdb-api.com/es/API/MostPopularMovies/${apiKey}`
      );
    
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem( `https://imdb-api.com/es/API/MostPopularMovies/${apiKey}`, JSON.stringify(data));
        return data.items.sort((a, b) => b.imDbRating - a.imDbRating);
        
      } else {
        console.log("Error al obtener los datos de las películas más populares");
        return [];
      }
  }
}


// Función para crear la gráfica de barras
async function crearGrafica() {
  const peliculasPopulares = await obtenerPeliculasPopulares();

  if(peliculasPopulares && peliculasPopulares.length > 0) {
    const chartData = {
      labels: peliculasPopulares.map((pelicula) => pelicula.title),
      datasets: [
        {
          label: "Rating",
          data: peliculasPopulares.map((pelicula) => pelicula.imDbRating),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
        },
      },
    };
  
    const chartElement = document.getElementById("chart");
    const chart = new Chart(chartElement, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }else {
    console.log("No se encontraron peliculas populares");
  }
}

// Llamar a la función para crear la gráfica
crearGrafica();
