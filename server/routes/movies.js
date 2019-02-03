var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movies = require('./../models/movies');

mongoose.connect('mongodb://127.0.0.1:27017/imoocmall');
mongoose.connection.on('connected', function () {
    console.log('connected');
});
mongoose.connection.on('error', function () {
    console.log('db connect error');
});
mongoose.connection.on('disconnected', function () {
    console.log('db disconnected');
});
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// http://localhost:3000/movies/movies?page=1&pageSize=3&priceLevel=1
router.get('/movies', function (req, res, next) {
    var page = parseInt(req.query.page);
    var pageSize = parseInt(req.query.pageSize);
    var sort = req.query.sort;
    var priceLevel = req.query.priceLevel;
    var skip = (page - 1) * pageSize;
    let goodsModel = Movies.find({});
    // goodsModel.sort({'salePrice': sort});
    goodsModel.exec({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

module.exports = router;
