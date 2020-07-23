const Shopping = require('../models/shopping');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).json({message: "Tidak boleh kosong"});
    }

    const shopping = new Shopping({
        name: req.body.name,
        createddate: req.body.createddate
    });

    Shopping.create(shopping, (err, data) => {
        if(err){
            res.status(500).json({message: err.message});
        }else{
            res.status(200).json({data: data});
        }
    });
}

exports.findAll = (req, res) => {
    Shopping.getAll((err, data) => {
        if(err){
            res.status(500).json({message: err.message});
        }else{
            res.status(200).json(data);
        }
    });
}

exports.findOne = (req, res) => {
    Shopping.findById(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(400).json({message: `Tidak ada dengan id ${req.params.id}`});
            }else{
                res.status(500).json({message: `Kesalahan saat mengambil data dengan id ${req.params.id}`});
            }
        }else{
            res.status(200).json(data);
        }
    });
}

exports.update = (req, res) => {
    if(!req.body){
        res.status(400).json({message: "Tidak boleh kosong"});
    }

    Shopping.updateById(req.params.id, new Shopping(req.body), (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(400).json({message: `Tidak ada dengan id ${req.params.id}`});
            }else{
                res.status(500).json({message: `Kesalahan saat mengupdate data dengan id ${req.params.id}`});
            }
        }else{
            res.status(200).json(data)
        }
    });
}

exports.delete = (req, res) => {
    Shopping.remove(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(400).json({message: `Tidak ada dengan id ${req.params.id}`});
            }else{
                res.status(500).json({message: `Kesalahan saat menghapus data dengan id ${req.params.id}`});
            }
        }else{
            res.status(200).json({message: "Data telah dihapus"});
        }
    });
}