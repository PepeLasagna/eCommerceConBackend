document.addEventListener('DOMContentLoaded', function () {
  getUser()
  // getUserStatus();
  showUser()
  temaActivo()

  document.getElementById('autos').addEventListener('click', function () {
    localStorage.setItem('catID', 101)
    window.location = 'products.html'
  })
  document.getElementById('juguetes').addEventListener('click', function () {
    localStorage.setItem('catID', 102)
    window.location = 'products.html'
  })
  document.getElementById('muebles').addEventListener('click', function () {
    localStorage.setItem('catID', 103)
    window.location = 'products.html'
  })
})

// Bloque encargado del cierre de sesión
document.getElementById('cerrar_sesion').addEventListener('click', (a) => {
  localStorage.removeItem('userStatus')
  localStorage.removeItem('currentUser')
  window.location.href = 'login.html'
})

function getUser() {
  const token = JSON.parse(localStorage.getItem('token'))
  console.log(token)
  fetch(USER_INFO, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
}
