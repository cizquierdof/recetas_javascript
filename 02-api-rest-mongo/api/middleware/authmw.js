/*********************************
 * Un middleware es una función que se inyectará donde proceda para hacer su función
 * le pasamos req, res y next, donde next le indica al mw que a partir de ahí continue con 
 * el flujo normal 
 */
const jwt = require('jsonwebtoken')

const secretKey = 'dsjabnbakdq3eelknadoiaJKNAAL' //lo normal es tener esto en un archivo de configuración


 const authorize = (req, res, next)=>{
     const auth = req.headers['authorization'];
     const token = auth.split(' ')[1];
     jwt.verify(token, secretKey, (err, user)=>{
        if(err){
            //tratamiento de error de autorización
            return res.status(403).jsonp({msg:'Usuario no autorizado'})
        }else{
            //tratamiento de autorización correcta. Aquí podemos hacer lo que necesitemos
            //identificar usuario, su rol, datos que pasamos en el payload del token, etc.
            console.log('usuario', user);
        }
    }); 
    
    next();
 }

 module.exports = authorize;