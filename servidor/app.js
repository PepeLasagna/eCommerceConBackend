const express = require('express')
const cors = require('cors')
const prodRoutes = require('./routes/appRoutes')

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())

app.use('/', prodRoutes)

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
