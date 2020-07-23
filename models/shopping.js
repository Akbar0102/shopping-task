const sql = require('../config/db');

const Shopping = function(shopping){
    this.name = shopping.name;
    this.createddate = shopping.createddate;
}

Shopping.create = (newShopping, result) => {
    sql.query("INSERT INTO shopping SET ?", newShopping, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newShopping});
    });
}

Shopping.findById = (shoppingId, result) => {
    sql.query(`SELECT * FROM shopping WHERE id = ${shoppingId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            result(null, res[0]);
            return;
        }
        //tidak ada
        result({kind: "not_found"}, null);
    });
}

Shopping.getAll = result => {
    sql.query("SELECT * FROM shopping", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Shopping.updateById = (id, shopping, result) => {
    sql.query("UPDATE shopping SET name = ?, createddate = ? WHERE id = ?", [shopping.name, shopping.createddate, id], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        result(null, {id: id, ...shopping});
    });
}

Shopping.remove = (id, result) => {
    sql.query("DELETE FROM shopping WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        result(null, res);
    });
}

module.exports = Shopping;