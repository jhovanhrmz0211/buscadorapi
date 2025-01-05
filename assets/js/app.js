const inputBuscador = document.querySelector(".buscador-input");
const btnBuscar = document.querySelector(".btn-buscador");
const main = document.querySelector(".main");

const getImages = async (query) => {
  const endpoint = `https://api.unsplash.com/search/photos?query=${query}&per_page=10&client_id=jMBn4JdVYyIHAl4cKVZ7ICCtjtZmXHml5iEczZA7BkE`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    renderImages(data.results);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const renderImages = (images) => {
  main.innerHTML = "";
  images.forEach((image) => {
    const containerImg = document.createElement("div");
    containerImg.classList.add("container-img");

    const img = document.createElement("img");
    img.src = image.urls.small;
    img.alt = image.alt_description || "Imagen de Unsplash";
    containerImg.appendChild(img);
    main.appendChild(containerImg);
  });
};

btnBuscar.addEventListener("click", () => {
  const textIn = inputBuscador.value;
  const busqueda = textIn.replace(/\s/g, "+");
  if (busqueda !== "") {
    getImages(busqueda);
  } else {
    alert("Introduce una busqueda");
  }
});
