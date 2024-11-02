import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import './src/database/dbConnection.js'

//1-configurar un puerto
const app = express();
app.set( 'port', process.env.PORT || 4000)
app.listen(app.get('port'), ()=>{
    console.info('estoy escuchando el puerto '+app.get('port'))
})

//2-configurar middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname,'/public')))

//3-configurar las rutas
// http://localhost:4000/prueba
app.get('/prueba',(req, res)=>{
    console.log('alguien hizo una solicitud get a la ruta de prueba')
    res.send('hola mundo desde el backend')
})