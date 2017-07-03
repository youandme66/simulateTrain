var BaseDao = require('../Dao/BaseDao');
var pool = new BaseDao();
exports.adminLogin = function(user_params,callback){
	var sql = "select * from admin where anumber=? and apwd=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	})
};
exports.updatePwd = function(user_params,callback){
	var sql = "update admin set apwd=? where anumber=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};