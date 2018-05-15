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
 * Middleware to serve Headers for Access-Control-Allow-Origin
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

/**
 *  Middleware for Route API
 */
app.use('/api', require('./Routes/api').route)

var port = Number(process.env.PORT || 8080)

app.listen(port, () => console.log('Server running on http://localhost:8080/'))