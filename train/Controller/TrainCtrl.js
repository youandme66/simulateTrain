var trainDao = require('../Dao/TrainDao');
var eventproxy = require('eventproxy');
//添加列车
exports.addcar = function(req, res, next) {
	var tnumber = req.body.tnumber;
	var tstart = req.body.tstart;
	var tend = req.body.tend;
	var tcount = req.body.tcount;
	var tetime = req.body.tetime;
	var tstime = req.body.tstime;
	var train_params = [tnumber, tstart, tend, tstime, tcount, tetime];
	trainDao.addTrain(train_params, function(err, result) {
		if (err) {
			if (err.errno == 1062) {
				res.json({
					msg: "此列车已被注册"
				});
			} else {
				res.json({
					msg: '服务器错误'
				});
			}
		} else {
			res.json({
				msg: "添加成功"
			});
		}
	});
};
//查询列车
exports.queryTrain = function(req, res, next) {
	var place_params = [];
	trainDao.getTrain(place_params, function(err, result) {
		if (err) {
			if (err) {
				res.json({
					msg: '服务器错误'
				});
			}
		} else {
			res.json({
				msg: result
			});
		}
	});
};
//
exports.adminqueryTrain = function(req, res, next) {
	var place_params = [];
	trainDao.admingetTrain(place_params, function(err, result) {
		if (err) {
			if (err) {
				res.json({
					msg: '服务器错误'
				});
			}
		} else {
			res.json({
				msg: result
			});
		}
	});
};
//删除列车
exports.deleteTrain = function(req, res) {
	var tnumber = req.body.tnumber;
	var password = req.body.password;
	var train_params = [tnumber];
	if(password!="001520258"){
		res.json({
			msg:'你的IP已被服务器记录,请谨慎使用'
		});
		return;
	}
	trainDao.getTrainId(train_params,function(err,result){
		if(err){
			res.json({
				msg:'服务器错误'
			});
		}else{
			if(result.length==0){
				res.json({
					msg:'请不要进行非法操作'
				});
			}else{
				var train_params1 = [result[0].tid];
				trainDao.deleteSeat(train_params1,function(err,result){
					if(err){
						res.json({
							msg:'删除失败,请速与管理员联系'
						});
					}else{
						trainDao.deletePlace(train_params1,function(err,result){
							if(err){
								res.json({
									msg:'删除失败,请速与管理员联系'
								})
							}else{
								trainDao.deleteTrain(train_params, function(err, result) {
									if (err) {
										res.json({
											msg: "删除失败,请速与管理员联系"
										});
									} else {
										res.json({
											msg: "删除成功"
										});
									}
								});
							}
						});
					}
				});
			}
		}
	});
};
//更新列车
exports.updateTrain = function(req, res) {
	var tstart = req.body.tstart;
	var tend = req.body.tend;
	var tstime = req.body.tstime;
	var tcount = req.body.tcount;
	var tetime = req.body.tetime;
	var tnumber = req.body.tnumber;
	var train_params = [tstart, tend, tstime, tcount, tetime, tnumber];
	var train_params1 = [tnumber];
	trainDao.getTrainId(train_params1, function(err, result) {
		if(err){
			res.json({
				msg:'修改失败'
			});
		}else{
			if (result[0].isopen[0] == 1) {
				res.json({
					msg: '列车已被开启'
				});
			}else{
				trainDao.updateTrain(train_params, function(err, result) {
		if (err) {
			console.log(err);
			res.json({
				msg: '服务器错误'
			});
		} else {
			res.json({
				msg: '更新成功'
			});
		}
	});
			}
		}
	});	
};
//通过编号查询列车
exports.getTrainByNum = function(req, res) {
	var tnumber = req.body.tnumber;
	var train_params = [tnumber];
	trainDao.getTrainByNum(train_params, function(err, result) {
		if (err) {
			console.log(err);
			res.json({
				code: -20,
				msg: "服务器错误"
			});
		} else {
			if (result.length == 0) {
				res.json({
					code: -20,
					msg: "没有查询到此列车"
				});
			} else {
				res.json({
					code: 20,
					msg: result
				});
			}
		}
	});
};
//查询站点
exports.getPlace = function(req, res) {
	var tid = req.body.tid;
	var train_params = [tid];
	trainDao.getPlace(train_params, function(err, result) {
		if (err) {
			res.json({
				msg: '服务器错误'
			});
		} else {
			trainDao.getTrainNum(train_params, function(err, result2) {
				if (err) {
					res.json({
						msg: '服务器错误'
					});
				} else {
					res.json({
						tnumber: result2[0].tnumber,
						msg: result
					});
				}
			});
		}
	});
};
//更新站点
exports.updatePlace = function(req, res) {
	var cpid = req.body.cpid;
	var cpname = req.body.cpname;
	var cprice = req.body.cprice;
	var atime = req.body.atime;
	var stime = req.body.stime;
	var tid = req.body.tid;
	var train_params = [cpname, cprice, atime, stime, cpid];
	var train_params1 = [tid];
	trainDao.isOpen(train_params1, function(err, result) {
		if(err){
			res.json({
				msg:'修改失败'
			})
		}else{
			if (result[0].isopen[0] == 1) {
				res.json({
					msg: '列车已被开启'
				});
			}else{
				trainDao.updatePlace(train_params, function(err, result) {
		if (err) {
			res.json({
				msg: "修改失败"
			});
		} else {
			res.json({
				msg: "修改成功"
			});
		}
	});
			}
			
		}
	});
	
};
//添加站点
exports.addPlace = function(req, res) {
	var tid = req.body.tid;
	var cpname = req.body.cpname;
	var cprice = req.body.cprice;
	var atime = req.body.atime;
	var stime = req.body.stime;
	var train_params = [tid, cpname, cprice, atime, stime];
	var train_params1 = [tid];
	trainDao.isOpen(train_params1, function(err, result) {
		if (err) {
			res.json({
				msg: '服务器错误'
			});
		} else {
			if (result[0].isopen[0] == 1) {
				res.json({
					msg: '列车已被开启'
				});
			} else {
				trainDao.addPlace(train_params, function(err, result) {
					if (err) {
						res.json({
							msg: "服务器错误"
						});
					} else {
						res.json({
							msg: "添加成功"
						});
					}
				});
			}
		}
	})

};
//开启列车
exports.openTrain = function(req, res) {
	var ep = new eventproxy();
	ep.on('err', function() {
		res.json({
			msg: '服务器错误'
		});
	});
	var train = [];
	var tid = req.body.tid;
	var train_params = [tid];
	trainDao.isOpen(train_params, function(err, result) {
		if (err) {
			ep.emit('err')
		} else {
			if (result[0].isopen[0] == 1) {
				res.json({
					msg: "已被开启"
				});
			} else {
				trainDao.lockTrain(train_params, function(err, result) {
					if (err) {
						ep.emit('err');
						return;
					}
				})
				trainDao.getTrainSeat(train_params, function(err, result) {
					if (err) {
						ep.emit('err');
					} else {
						train[0] = result[0].tcount;
						trainDao.getTrainPlace(train_params, function(err, result) {
							if (err) {
								console.log(err);
							} else {
								for (i = 0; i < result.length; i++) {
									train[i + 1] = result[i].cpid;
								}
								for (i = 1; i <= train[0]; i++) {
									var sid = '';
									if (tid >= 1 && tid <= 9) {
										sid += '0' + tid;
									} else {
										sid += tid;
									}
									if (Math.ceil(i / 20) >= 1 && Math.ceil(i / 20) <= 9) {
										sid += '0' + Math.ceil(i / 20);
									} else {
										sid += Math.ceil(i / 20);
									}
									if (i % 20 >= 1 && i % 20 <= 9) {
										sid += '0' + i % 20;
									} else {
										if (i % 20 == 0) {
											sid += 20;
										} else {
											sid += i % 20;
										}
									}
									for (j = 1; j < train.length; j++) {
										// if(i==(train[0]+1)&&j==train.length){
										// 	res.json({
										// 		msg:'开启成功'
										// 	});
										// }
										var cpid = train[j];
										var seat_params = [sid, cpid, tid];
										trainDao.initSeat(seat_params, function(err, result) {
											if (err) {
												console.log(err);
											} else {}
										});
									}
								}
							}
						});
					}
				});
				res.json({
					msg: '开启成功'
				});
			}
		}
	})

};
//查询车票
exports.getTrainByPlace = function(req,res){
	var tstart = req.body.tstart;
	var tend = req.body.tend;
	var train_params = [tstart,tend];
	var result3 = [];
	trainDao.getTrainByPlace(train_params,function(err,result){
		if(err){
			console.log(err);
			res.json({
				msg:"服务器错误"
			});
		}else{
			if(result.length==0){
				res.json({
					msg:"未查询到符合条件的"
				});
			}else{
				result.forEach(function(data){
					var train_params = [data.tid,data.cpid,data.cpid1,data.cpid,data.cpid1,data.tid];
					trainDao.getSeatNum(train_params,function(err,result2){
						if(err){
							console.log('查询错误');
						}else{
							data.num = result2.length;
							result3[result3.length]=data;
							if(result3.length==result.length){
								res.json({
									msg:result3
								});
							}
						}
					});
				});
			}
		}
	});
}

