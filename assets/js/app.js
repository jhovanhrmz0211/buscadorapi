const inputBuscador = document.querySelector('.buscador-input');
const btnBuscar = document.querySelector('.btn-buscador');

btnBuscar.addEventListener('click', () => {
  const palabra = inputBuscador.value; // Obtén el valor del input al hacer clic
//   console.log(palabra);

  const key = palabra.replace(/\s/g, '+'); // Reemplaza espacios con "+"
  console.log(key);
});
