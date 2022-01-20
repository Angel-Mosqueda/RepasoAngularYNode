'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) =>{
        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor:'Angel',
            url:'youtube.com',
            hola
        });
    },

    test: (req,res)=>{
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de articulos'
        })
    },

    save: (req, res) =>{
        //Reccoger los parametros por post
        var params = req.body;
        console.log(params);
        //Validar datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(404).send({
                status: 'error',
                message:'Faltan datos por enviar !!!'
            })
        }

        if(validate_title && validate_content){
           //Crear el objeto a guardar
            var article = new Article();

            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el articulo
            article.save((err, articleStored)=>{
                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                       message:'El articulo no se ha guardado :/'
                    });
                }
                //Devolver una respuesta
                return res.status(200).send({
                    status: 'succes',
                    articleStored
                });
            });

            
        }else{
            return res.status(200).send({
                status: 'error',
               message:'Los datos no son validos'
            });
        }
        
    },

    getArticles: (req, res) =>{
        //Find
        Article.find({}).sort('_id').exec((err,articles)=>{

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message:'Error al devolver los articulos'
                });
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message:'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'succes',
                articles
            });
        });

        
    }

}//end controller

module.exports = controller;