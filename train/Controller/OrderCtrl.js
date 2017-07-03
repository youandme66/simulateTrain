var orderDao = require('../Dao/OrderDao');
var trainDao = require('../Dao/TrainDao');
exports.createOrder = function(req,res){
	var uid = req.signedCookies.user.uid;
	var cpid = req.body.cpid;
	var cpid1 = req.body.cpid1;
	var cpname = req.body.cpname;
	var cpname1 = req.body.cpname1;
	var tnumber = req.body.tnumber;
	var oprice = req.body.oprice;
	var stime = req.body.stime;
	var atime = req.body.atime;
	var tid = req.body.tid;
	var train_params = [tid,cpid,cpid1,cpid,cpid1,tid];
	trainDao.getSeat(train_params,function(err,result){
		if(err){
			res.json({
				msg:'服务器错误'
			});
		}else{
			if(result.length==0){
				res.json({
					msg:"票已被抢光了"
				});
			}else{
				var seat_params = [result[0].sid,cpid,cpid1];
				trainDao.updateSeat(seat_params,function(err,result1){
					if(err){
						res.json({
							msg:'服务器错误'
						});
					}else{
						var seat = result[0].sid.split("");
						var snumber = ''+seat[2]+seat[3]+'车'+seat[4]+seat[5]+'号';
						var order_params = [uid,cpname,cpname1,tnumber,snumber,oprice,stime,atime];
						orderDao.createOrder(order_params,function(err,result2){
							if(err){
								res.json({
									msg:'服务器错误'
								});
							}else{
								res.json({
									msg:'购票成功'
								});
							}
						});
					}
				});
			}
		}
	});
};
//获取最新订单
exports.getOrder = function(req,res){
	var uid = req.signedCookies.user.uid;
	var order_params = [uid];
	orderDao.getOrder(order_params,function(err,result){
		if(err){
			res.json({
				msg:'服务器错误'
			});
		}else{
			res.json({
				msg:result
			});
		}
	});
};
//获取旧的订单
exports.getOldOrder = function(req,res){
	var uid = req.signedCookies.user.uid;
	var order_params = [uid];
	orderDao.getOldOrder(order_params,function(err,result){
		if(err){
			res.json({
				msg:'服务器错误'
			})
		}else{
			res.json({
				msg:result
			});
		}
	});
};
//删除订单
exports.deleteOrder = function(req,res){
	var oid = req.body.oid;
	var order_params = [oid];
	orderDao.deleteOrder(order_params,function(err,result){
		if(err){
			res.json({
				msg:'服务器错误'
			});
		}else{
		if(result.affectedRows==0){
			res.json({
				msg:'订单未过期'
			})
		}else{
			res.json({
				msg:'删除成功'
			});
		}	
		} 
	})
}