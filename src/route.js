import { Router } from "express";
import fs from 'fs'
import Path from 'path'

const route = Router();

route.get('/routes/:path', (req, res, next) => {
    res.status(200)
    const directory = `./public/paths/${req.params.path}`

    try {
        const directorys = fs.readdirSync(directory)
                             .filter((path) => {
                                 return fs.statSync(`${directory}/${path}`).isFile()
                             }).filter((path) => {
                                const {ext} = Path.parse(`${directory}/${path}`)
                                return /\.MP4/g.test(ext.toUpperCase())
                             })
        res.json(directorys)
    } catch (error) { res.status(400) }
    res.end();
})

route.get('/routes', (req, res, next) => {
    res.status(200)
    const directory = './public/paths';

    try {
        const directorys = fs.readdirSync(directory)
                             .filter((path) => {
                                 return fs.statSync(`${directory}/${path}`)
                             })
        res.json(directorys)
    } catch (error) { console.log(error); res.status(400) }
    res.end();
})

route.get('/git', (req, res, next) => {
    const file = fs.readFileSync('./data/table.json')

    res.json(JSON.parse(file));
    res.end();
});

export default route;