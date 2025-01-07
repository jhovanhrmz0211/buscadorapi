const inputBuscador = document.querySelector(".buscador-input");
const btnBuscar = document.querySelector(".btn-buscador");
const main = document.querySelector(".main");
const btnAnterior = document.querySelector(".btn-anterior");
const btnSiguiente = document.querySelector(".btn-siguiente");

let currentPage = 1; // Página actual
let currentQuery = ""; // Búsqueda actual

const spinner = document.querySelector(".spinner");

const getImages = async (query, page = 1) => {
  spinner.classList.remove("hidden"); // Mostrar spinner
  const endpoint = `https://api.unsplash.com/search/photos?query=${query}&per_page=10&page=${page}&client_id=jMBn4JdVYyIHAl4cKVZ7ICCtjtZmXHml5iEczZA7BkE`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    renderImages(data.results);
    btnAnterior.disabled = page === 1;
    btnSiguiente.disabled = page >= 5; // Limita a 5 páginas
  } catch (error) {
    console.error(error);
  } finally {
    spinner.classList.add("hidden"); // Ocultar spinner
  }
};

const renderImages = (images) => {
  main.innerHTML = "";
  images.forEach((image) => {
    const containerImg = document.createElement("div");
    containerImg.classList.add("container-img");

    const img = document.createElement("img");
    const p = document.createElement("p");
    p.classList.add("autor");

    // Placeholder de baja calidad
    img.src = image.urls.thumb; // Imagen pequeña como placeholder
    img.dataset.src = image.urls.regular; // Carga diferida
    img.alt = image.alt_description || "Imagen de Unsplash";
    p.innerHTML = `Autor: ${image.user.name}` || "No ha ingresado su nombre";

    containerImg.appendChild(img);
    containerImg.appendChild(p);
    main.appendChild(containerImg);

    // Agregar evento para abrir el modal
    img.addEventListener("click", () => {
      modal(image); // Pasa el objeto image al modal
    });
  });

  // Llamar la función para cargar imágenes visibles
  lazyLoadImages();
};

const modal = (imagen) => {
  // Crear el overlay
  const overlay = document.createElement("div");
  overlay.classList.add("overlay", "visible");

  // Crear el contenedor del modal
  const modal = document.createElement("div");
  modal.classList.add("modal", "visible");

  const img = document.createElement("img");
  const p = document.createElement("p");
  p.classList.add("autor");

  img.src = imagen.urls.regular;
  img.alt = imagen.alt_description || "Imagen de Unsplash";
  p.innerHTML = `Autor: ${imagen.user.name}` || "No ha ingresado su nombre";

  modal.appendChild(img);
  modal.appendChild(p);
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Función para cerrar el modal
  const cerrarModal = () => {
    modal.classList.remove("visible");
    overlay.classList.remove("visible");
    setTimeout(() => {
      modal.remove();
      overlay.remove();
    }, 300); // Tiempo igual al de la transición en CSS
  };

  // Cerrar modal al hacer clic en el overlay o en el modal mismo
  overlay.addEventListener("click", cerrarModal);
  modal.addEventListener("click", cerrarModal);
};


const lazyLoadImages = () => {
  const images = document.querySelectorAll("img[data-src]");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Asignar el src real
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => observer.observe(img));
};

// Eventos para los botones de búsqueda
btnBuscar.addEventListener("click", () => {
  const textIn = inputBuscador.value.trim();
  const busqueda = textIn.replace(/\s/g, "+");
  if (busqueda !== "") {
    currentQuery = busqueda;
    currentPage = 1; // Reinicia a la primera página
    getImages(busqueda, currentPage);
  } else {
    alert("Introduce una búsqueda");
  }
});

// Eventos para los botones de paginación
btnAnterior.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    getImages(currentQuery, currentPage);
  }
});

btnSiguiente.addEventListener("click", () => {
  if (currentPage < 5) { // Verifica que no pase de la página 5
    currentPage += 1;
    getImages(currentQuery, currentPage);
  }
});
