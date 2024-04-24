import express from 'express';
import { fileURLToPath } from 'url';
import { dirname  } from 'path';
const __filename = fileURLToPath(  import.meta.url  );
const __dirname = dirname(__filename);
const usuarios = ['Juan','Jocelyn', 'Astrid', 'Maria', 'Ignacia', 'Javier', 'Brian'];
function obtenerRandomEntre(min, max) {
    return Math.floor(Math.random() * (max - min+1) + min);
  }
  
console.log(obtenerRandomEntre(1,4));
console.log('Salida de __dirname', __dirname );
console.log('Salida de __filename', __filename );
console.log(usuarios)

const app = express();

//requerimiento 2
app.use( express.static('assets') );
app.get('/',(req,res) => {
    
    res.sendFile( __dirname + '/index.html' )
    
})

//requerimiento 4
app.use('/abracadabra/juego/:usuario', ( req, res, next )=>{

    const usuario = req.params.usuario;
    usuarios.includes(usuario) ? next() : res.redirect('/who.jpeg');

})

app.get('/abracadabra/juego/:usuario',( req, res )=>{
    res.sendFile(__dirname + '/index.html')
})

//requerimiento 3
app.get('/abracadabra/usuarios', (req , res)=>{
    res.json({ usuarios });
})


//requerimiento 5 

app.get('/abracadabra/conejo/:n', (req, res)=>{
    const number = req.params.n;
    const random = obtenerRandomEntre(1,4);
    console.log( 'Salida  de numero sombrero-->', number );
    console.log( 'Salida  de random-->', random );
    number == random ? res.redirect('/conejito.jpg') : res.redirect('/voldemort.jpg')
})

//requerimiento 6
app.get('*' , (req,res)=>{
    res.send('<h2>Esta pagina no existe </h2>')
})

app.listen( 3000 , () => console.log('Arriba el sever en el puerto 3000') );