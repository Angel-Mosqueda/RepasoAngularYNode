'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Angel',
            url: 'youtube.com',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de articulos'
        })
    },

    save: (req, res) => {
        //Reccoger los parametros por post
        var params = req.body;
        console.log(params);
        //Validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            })
        }

        if (validate_title && validate_content) {
            //Crear el objeto a guardar
            var article = new Article();

            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el articulo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado :/'
                    });
                }
                //Devolver una respuesta
                return res.status(200).send({
                    status: 'succes',
                    articleStored
                });
            });


        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }

    },

    getArticles: (req, res) => {

        var query = Article.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }

        //Find
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'succes',
                articles
            });
        });
    },

    getArticle: (req, res) => {
        //Recoger el id de la url
        var articleId = req.params.id;

        //Comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            });
        }

        //Buscar el articulo
        Article.findById(articleId, (err, article) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }

            //Devolver en JSON
            return res.status(200).send({
                status: 'succes',
                article
            });
        })

    }


}//end controller

module.exports = controller;