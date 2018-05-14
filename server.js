const express = require('express')
const app = express()

/**
 *  Middleware for json and url encoding support
 */
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

/**
 *  Middleware for Route API
 */
app.use('/api', require('./Routes/api').route)

var port = Number(process.env.PORT || 8080)

app.listen(port, () => console.log('Server running on http://localhost:8080/'))