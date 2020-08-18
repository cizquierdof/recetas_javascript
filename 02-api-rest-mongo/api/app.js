const express = require('express');
const routes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authmw = require('./middleware/authmw');

//creamos una semilla que necesitaremos luego para el algoritmo de codificación
//la semilla puede ser cualquier string 
const secretKey = 'dsjabnbakdq3eelknadoiaJKNAAL'

/*******************************
 * las password siempre van a estar encriptadas, de modo que en nuestra base de datos o lo que 
 * utilicemos para guardar usuario y password, lo que se almacena no es la password plana, sino
 * un hash de ella. Para lidiar con esto vamos a utilizar bcrypt
 */
//necesitamos una semilla para hashear la password, pero como requieren un formato específico no
//vale inventarse una aleatoriamente como hemos hecho con secretKey. bcrypt proporciona un generador
//A las semillas de este tipo se les suele denominar salt

//console.log('salt', bcrypt.genSaltSync(40));
const salt = '$2b$10$pbrOdfO5Vr1pV7nHwZyaLu'; //¡Ojo! los salt no deben contener '/' porque lo toma como escape

const hashedPasssword = bcrypt.hashSync('1234',salt);
console.log('1234',hashedPasssword);

const app = express();

app.use(express.json());    //para poder leer el body en formato json

//endpoints de home, no requieren autorización
app.get('/', (req, res) => res.status(200).send('<h1>HOME PAGE</h1>'))
app.get('/home', (req, res) => res.status(200).send('<h1>HOME PAGE</h1>'))

/*****************
 * Endpoint de login, requiere user y password y devuelve un token
 * para probar, enviar desde postman un post al endpoint con un body: 
 * 
 *      {
 *      "user":"carlos",
 *      "password":"1234"
 *      }
 * 
 */

app.post('/login', (req, res) => {
    console.log(req.body);
    const userPass = req.body;    //obtenemos los datos del body
    // en una app real comprobareiamos los datos en una bbdd, en este ejemplo 
    // los comprobamos 'a pelo'
    //¡Ojo! de nuevo repito que lo que guardaríamos en la base de datos no es el password sino un hash
    // y lo que nos envian también es un hash
    if (userPass.user === 'carlos' && bcrypt.hashSync(userPass.password, salt)  === hashedPasssword) {
        //generamos el token que vamos a devolver cuando la auenticación es correcta
        //necesitamos pasarle el payload que irá codificado y que luego podremos recuperar y la semilla. También es importante
        //pasarle una caducidad, porque si no, el mismo token serviría para siempre y esto es muy inseguro

        const token = jwt.sign({ user: userPass.user }, secretKey, {
            expiresIn: 60 * 60 * 24 //expira en 24 horas
        });
        return res.status(200).jsonp({ token });
    } else {
        return res.status(403).json({ msg: 'Usuario o password incorrectos' })
    }

})

/****************
 * Endpoint que requiere autorización
 * 
 * las peticiones con autorización requieren que se le envie una cabecera con el token, con postman iremos al apartado
 * auth y le pegamos el token que hemos generado con el login en 'bearer token'
 * 
 * El procedimiento a continuación se pone a modo de explicación de como se hace, en producción real se utilizaría un midleware
 * para evitar tener que repetir todo este proceso para cada petición
 */

app.get('/private', (req, res) => {
    //recogemos la autorización
    const auth = req.headers['authorization']
    console.log('token:', auth);
    //auth es un string que dice 'bearer [string del token], como solo nos interesa el token podemos aislarlo así
    const token = auth.split(' ')[1];
    //ya podemos verificar el token mediante la secretKey. jwt.verify() se le pasa una función de callback donde poder
    //indicar que se hace en caso de error y con los resultados
    jwt.verify(token, secretKey, (err, user)=>{
        if(err){
            return res.status(403).jsonp({msg:'Usuario no autorizado'})
        }else{
            console.log('usuario', user);
        }
    }); 
    return res.status(200).jsonp({ msg: 'Esta es un área privada' })

});

/*********************
 * Otro endpoint que requiere autorización, esta vez utilizamos un middleware
 */
app.get('/private-mw', authmw, (req, res)=>{
    return res.status(200).jsonp({ msg: 'Esta es un área privada, autorizada con middleware' })

})

app.use('/api', require('./routes/userRoutes'));


module.exports = app;