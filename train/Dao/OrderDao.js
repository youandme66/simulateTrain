var BaseDao = require('./BaseDao');
var pool = new BaseDao();
//创建订单
exports.createOrder = function(order_params,callback){
	var sql = "insert into `order`(uid,ostart,oend,tnumber,snumber,oprice,ostime,oetime,otime) value(?,?,?,?,?,?,?,?,now())";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,order_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//删除订单
exports.deleteOrder = function(order_params,callback){
	var sql = "delete from `order` where oid=? and oetime<now()";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,order_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获取最新订单
exports.getOrder = function(order_params,callback){
	var sql = "select ostart,oend,tnumber,snumber,oprice,DATE_FORMAT(ostime,'%Y-%m-%d %H:%i') ostime,DATE_FORMAT(oetime,'%Y-%m-%d %H:%i') oetime,uname,IDcard from `order` a inner join user b on a.uid=b.uid  where a.uid=? and oetime>now()";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,order_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获取过期订单
exports.getOldOrder = function(order_params,callback){
	var sql = "select oid,ostart,oend,tnumber,snumber,oprice,DATE_FORMAT(ostime,'%Y-%m-%d') ostime,DATE_FORMAT(otime,'%Y-%m-%d %H:%i') otime,uname,IDcard from `order` a inner join user b on a.uid=b.uid  where a.uid=? and oetime<now()";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,order_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
}