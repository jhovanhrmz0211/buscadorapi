const inputBuscador = document.querySelector('.buscador-input');
const btnBuscar = document.querySelector('.btn-buscador');

const buscarImg = async (query) => {
  const endpoint = `https://api.unsplash.com/search/photos?query=${query}&per_page=10&client_id=jMBn4JdVYyIHAl4cKVZ7ICCtjtZmXHml5iEczZA7BkE`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }

    const data = await response.json();
    mostrarResultados(data.results);
  } catch (error) {
    console.error('Error:', error);
  }
};

const mostrarResultados = (imagenes) => {
  const main = document.querySelector('.main');
  main.innerHTML = ''; // Limpiar contenido previo

  if (imagenes.length === 0) {
    alert('No se encontraron resultados');
    return;
  }

  imagenes.forEach((imagen) => {
    const contenedor = document.createElement('div'); // Crear un nuevo contenedor para cada imagen
    contenedor.classList.add('imagen-contenedor'); // Agregar clase para estilos

    const img = document.createElement('img');
    img.src = imagen.urls.small;
    img.alt = imagen.alt_description || 'Imagen de Unsplash';

    contenedor.appendChild(img);
    main.appendChild(contenedor);
  });
};

btnBuscar.addEventListener('click', () => {
  const key = inputBuscador.value; // Obtén el valor del input al hacer clic
  const palabra = key.replace(/\s/g, '+'); // Reemplaza espacios con "+"
  
  if (palabra) {
    buscarImg(palabra);
  } else {
    alert('Ingresa una palabra clave');
  }
});
