var mysql = require('mysql');
var mysqlcfg = require('../config/mysqlCfg');
module.exports = function(){
	var pool = mysql.createPool(mysqlcfg);
	return pool;
}

