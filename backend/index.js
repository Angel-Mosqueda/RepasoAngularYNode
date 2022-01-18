'use strict'

var moongose = require('mongoose');
var app = require('./app');
var port = 3000;

// moongose.set('useFindAndModify',false); es obsoleto ahora
moongose.Promise = global.Promise;
moongose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser: true}).then( ()=>{
    console.log('la conexion a la base de datos se ha realizado correctamente');

    //Crear servidor y escuchar peticiones HTTP
    app.listen(port , ()=>{
        console.log('Servidor corriendo en http://localhos:'+port);
    })
})