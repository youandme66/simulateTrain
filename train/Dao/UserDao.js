var BaseDao = require('../Dao/BaseDao');
var pool = new BaseDao();
//用户登录
exports.userLogin = function(user_params,callback){
	var sql = "select * from user where uphone=? and upwd=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//添加用户
exports.addUser = function(user_params,callback){
	var sql = "insert into user(uname,uphone,upwd,IDcard) value(?,?,?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err)
		});
		connection.release();
	});
};
//更新密码
exports.findPwd = function(user_params,callback){
	var sql = "update user set upwd=? where uphone=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
//通过手机获得用户
exports.getUserByPhone = function(user_params,callback){
	var sql = "select * from user where uphone=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//身份验证
exports.getIDcard = function(user_params,callback){
	var sql = "select * from auth where IDcard=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获得用户通过ID
exports.getUserById = function(user_params,callback){
	var sql = "select * from user where uid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获取所有用户信息
exports.getUserInfo = function(user_params,callback){
	var sql = "select * from user";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
