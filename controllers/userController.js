const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).json({message: "Tidak boleh kosong"});
    }

    const user = new User({
        username: req.body.username,
        //password: bcrypt.hashSync(req.body.password, 8),
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        city: req.body.city,
        postcode: req.body.postcode,
        name: req.body.name,
        address: req.body.address
    });

    User.create(user, (err, data) => {
        if(err){
            res.status(500).json({message: err.message});
        }else{
            // var token = jwt.sign({ id: data.id }, config.secret, {
            //     expiresIn: 86400 // expires in 24 hours
            // });
            res.status(200).json({data: data, token: token});
        }
    });
}

exports.findOne = (req, res) => {
    User.findById(req.body.email, req.body.password, (err, data) => {
        //let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
        //if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });
        if(err){
            if(err.kind === "not_found"){
                res.status(400).json({message: `Tidak ada dengan id ${req.params.email}`});
            }else{
                res.status(500).json({message: `Kesalahan saat mengambil data dengan id ${req.params.email}`});
            }
        }else{
            // var token = jwt.sign({ id: data.id }, config.secret, {
            //     expiresIn: 86400 // expires in 24 hours
            // });
            res.status(200).json(data);
        }
    });
}

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if(err){
            res.status(500).json({message: err.message});
        }else{
            res.status(200).json(data);
        }
    });
}