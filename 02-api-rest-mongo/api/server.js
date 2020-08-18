const app = require('./app');
const db = require('mongoose'); 


db.connect('mongodb://localhost:27017/agenda').then(
    app.listen(4000, () => console.log('server up and running'))
).catch(
    err => console.log('Error conectando a la base de datos', err)
)