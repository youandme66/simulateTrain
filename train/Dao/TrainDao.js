var BaseDao = require('./BaseDao');
var pool = new BaseDao();
//添加列车
exports.addTrain = function(train_params,callback){
	var sql = "insert into train(tnumber,tstart,tend,tstime,tcount,tetime) value(?,?,?,?,?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//删除列车
exports.deleteTrain = function(train_params,callback){
	var sql = "delete from train where tnumber=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//更新列车
exports.updateTrain = function(train_params,callback){
	var sql = "update train set tstart=?,tend=?,tstime=?,tcount=?,tetime=? where tnumber=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.updateTrainCount = function(train_params,callback){
	var sql = "update train set tcount=? where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//添加站点
exports.addPlace = function(place_params,callback){
	var sql = "insert into cplace(tid,cpname,cprice,atime,stime) value(?,?,?,?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,place_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.doneTrain = function(train_params,callback){
	var sql = "update train set isOpen=1 where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
// exports.getPlace = function(place_params,callback){
// 	var sql = "select cpname from cplace where tid=? and cpname=?";
// 	pool.getConnection(function(err,connection){
// 		connection.connect();
// 		connection.query(sql,place_params,function(err,result){
// 			callback(err,result);
// 		});
// 		connection.release();
// 	});
// };
//获取列车编号
exports.getTrainNum = function(train_params,callback){
	var sql = "select tnumber from train where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获取所有列车
exports.getTrain = function(place_params,callback){
	var sql = "select tid,tnumber,tstart,tend,DATE_FORMAT(tstime,'%Y-%m-%d %H:%i') tstime,tcount,DATE_FORMAT(tetime,'%Y-%m-%d %H:%i') tetime from train where tetime>now() and isopen=1";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,place_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//管理员获取所有车
exports.admingetTrain = function(place_params,callback){
	var sql = "select tid,tnumber,tstart,tend,DATE_FORMAT(tstime,'%Y-%m-%d %H:%i') tstime,tcount,DATE_FORMAT(tetime,'%Y-%m-%d %H:%i') tetime,isopen from train";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,place_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.getAllPlace = function(train_params,callback){
	var sql = "select cpname from cplace where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.initSeat = function(train_params,callback){
	var sql = "insert into place(sid,cpid,tid) value(?,?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//通过地点查询位置
exports.getTrainByPlace = function(train_params,callback){
	var sql = "select a.tid tid,a.cpid cpid,b.cpid cpid1,a.cpname cpname,b.cpname cpname1,a.cprice cprice,b.cprice cprice1,DATE_FORMAT(a.stime,'%Y-%m-%d %H:%i') stime,DATE_FORMAT(b.atime,'%Y-%m-%d %H:%i') atime1,tnumber from cplace a INNER JOIN cplace b on a.tid=b.tid inner JOIN train c on a.tid=c.tid where a.cpname=? and b.cpname=? and a.cpid<b.cpid and a.stime>NOW() and c.isopen=1";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.getPlaceByCid = function(place_params,callback){
	var sql = "select cpid from cplace where (cpname=? or cpname=?) and tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,place_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
// exports.getSeatByPlace = function(seat_params,callback){
// 	var sql = "select count(*) from place where cpid>? and cpid<? and isseat=0 and tid=? group by sid";
// 	pool.getConnection(function(err,connection){
// 		connection.connect();
// 		connection.query(sql,seat_params,function(err,result){
// 			callback(err,result);
// 		});
// 		connection.release();
// 	});
// };
// exports.updateSeatByPlace = function(seat_params,callback){
// 	var sql = "update seat set isseat=1 from (select sid from place where cpid>? and cpid<? and isseat=0 and tid=?)";
// 	pool.getConnection(function(err,connection){
// 		connection.connect();
// 		connection.query(sql,seat_params,function(err,result){
// 			callback(err,result);
// 		});
// 		connection.release();
// 	});
// };
//查询列车通过编号
exports.getTrainByNum = function(train_params,callback){
	var sql = "select tid,tnumber,tstart,tend,DATE_FORMAT(tstime,'%Y-%m-%d %H:%i') tstime,tcount,DATE_FORMAT(tetime,'%Y-%m-%d %H:%i') tetime,isopen from train where tnumber like concat('%',?,'%')";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release(); 
	});
};
//添加站点
exports.addPlace = function(train_params,callback){
	var sql = "insert into cplace(tid,cpname,cprice,atime,stime) value(?,?,?,?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//查询站点
exports.getPlace = function(train_params,callback){
	var sql = "select cpid,tid,cpname,cprice,DATE_FORMAT(atime,'%Y-%m-%d %H:%i') atime,DATE_FORMAT(stime,'%Y-%m-%d %H:%i') stime from cplace where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//更新站点
exports.updatePlace = function(train_params,callback){
	var sql = "update cplace set cpname=?,cprice=?,atime=?,stime=? where cpid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获取火车座位
exports.getTrainSeat = function(train_params,callback){
	var sql = "select tcount from train where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获取火车站点编号
exports.getTrainPlace = function(train_params,callback){
	var sql = "select cpid from cplace where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//是否开启
exports.isOpen = function(train_params,callback){
	var sql = "select isopen from train where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//锁住列车
exports.lockTrain = function(train_params,callback){
	var sql = "update train set isopen=1 where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获得票数
exports.getSeatNum = function(train_params,callback){
	var sql = "select sid from place where tid=? and cpid>=? and cpid<? and isseat=0 group by sid HAVING count(sid)=(select count(*) from cplace where cpid>=? and cpid<? and tid=?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	})
}
//取票
exports.getSeat = function(train_params,callback){
	var sql = "select sid from place where tid=? and cpid>=? and cpid<? and isseat=0 group by sid HAVING count(sid)=(select count(*) from cplace where cpid>=? and cpid<? and tid=?) limit 1";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//占座
exports.updateSeat = function(seat_params,callback){
	var sql = "update place set isseat=1 where sid=? and cpid>=? and cpid<?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,seat_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//删除站点
exports.deletePlace = function(place_params,callback){
	var sql = "delete from cplace where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,place_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	})
}
//删除座位
exports.deleteSeat = function(seat_params,callback){
	var sql = "delete from place where tid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,seat_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//火车id
exports.getTrainId = function(train_params,callback){
	var sql = "select tid,isopen from train where tnumber=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,train_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};