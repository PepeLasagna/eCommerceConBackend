// Se traen la categoría y el producto desde el local storage
const CAT_ID = localStorage.getItem('catID')
const PROD_ID = localStorage.getItem('prodID')

const CATEGORIES_URL = 'http://localhost:3000/categories'
const PRODUCTS_URL = `http://localhost:3000/products/${CAT_ID}`
const PRODUCT_INFO_URL = `http://localhost:3000/product-info/${PROD_ID}`
const CART = 'http://localhost:3000/cart'
const CART_INFO_URL = 'http://localhost:3000/cart/1'
const USER_INFO = 'http://localhost:3000/users'

const COMMENTS = `http://localhost:3000/comments/${PROD_ID}`

// Se encarga de mostrar u ocultar un spinner en la página
let showSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'block'
}

let hideSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'none'
}

// Función que permite que se realicen los fetch
let getJSONData = function (url) {
  let result = {}
  showSpinner()
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then(function (response) {
      result.status = 'ok'
      result.data = response
      hideSpinner()
      return result
    })
    .catch(function (error) {
      result.status = 'error'
      result.data = error
      hideSpinner()
      return result
    })
}

// Valida que el usuario esté logueado
function getUserStatus() {
  if (!localStorage.getItem('token')) {
    window.location.href = 'login.html'
  }
}

function getUser() {
  const token = JSON.parse(localStorage.getItem('token'))
  fetch(USER_INFO, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => showUser(data[0].first_name))
}

// Muestra el nombre de usuario en el navbar
function showUser(name) {
  document.getElementById('user').innerHTML = 'Hola, ' + name
}

// Funciones encargadas de los temas claro-oscuro
const temaOscuro = () => {
  document.querySelector('body').setAttribute('data-bs-theme', 'dark')
  document.querySelector('#dl-icon').setAttribute('class', 'bi bi-sun-fill')
  localStorage.setItem('tema', 'oscuro')
}

const temaClaro = () => {
  document.querySelector('body').setAttribute('data-bs-theme', 'light')
  document.querySelector('#dl-icon').setAttribute('class', 'bi bi-moon-fill')
  localStorage.removeItem('tema')
}

const temaActivo = () => {
  let tema = localStorage.getItem('tema')
  if (tema == 'oscuro') {
    return temaOscuro()
  } else {
    return temaClaro()
  }
}

const cambiarTema = () => {
  document.querySelector('body').getAttribute('data-bs-theme') === 'light'
    ? temaOscuro()
    : temaClaro()
}

function getUserData() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  return currentUser
}
