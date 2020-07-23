const sql = require('../config/db');

const User = function(user){
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.phone = user.phone;
    this.country = user.country;
    this.city = user.city;
    this.postcode = user.postcode;
    this.name = user.name;
    this.address = user.address;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, username: newUser.username, email: newUser.email});
    });
}

User.findById = (email, password, result) => {
    sql.query(`SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`, (err, res) => {
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

User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = User;