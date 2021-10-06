import http from 'http'
import express from 'express'
import route from './src/route.js'

const middleware = express();
const server     = http.createServer(middleware);

middleware.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', false);

    console.log(`METHOD: ${(`       ${req.method}`).slice(-10)} URL: ${req.url}`)
    next();
})

middleware.use('/', express.static('public/html'))
middleware.use('/js', express.static('public/js'))
middleware.use('/css', express.static('public/css'))
middleware.use('/video', express.static('public/paths'))

middleware.use('/api', route)

middleware.use('*', (req, res, nexT) => {
    res.status(200);
    res.redirect('/404.html');
    res.end();
})

server.listen(
    8080,
    '192.168.19.78',
    () => console.log(`open in http://192.168.19.78:8080/`)
)