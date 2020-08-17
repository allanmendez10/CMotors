const express = require('express')
const app = express()


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use(require('./routes/index'))

const port = process.env.PORT


app.listen(port, () => {
    console.log('Server is up on port ' + 3000)
})