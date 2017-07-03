var userDao = require('../Dao/UserDao');
var cookieTool = require('../tool/cookieTool');
exports.index = function(req, res, next) {
	try {
		if (req.signedCookies.user.is_visted) {
			res.render("main", {});
		} else {
			res.render('index', {});
		}
	} catch (e) {
		res.render("index", {});
	}

};
exports.login = function(req, res, next) {
	try {
		if (req.signedCookies.user.is_visted) {
			res.render("main", {});
		} else {
			res.render('userlogin', {});
		}
	} catch (err) {
		res.render("userlogin", {});
	}

};
exports.main = function(req, res, next) {
	try {
		if (req.signedCookies.user.is_visted) {
			res.render('main', {});
		} else {
			res.render('userlogin', {});
		}
	} catch (e) {
		res.render("userlogin", {});
	}


};
exports.userLogin = function(req, res, next) {
	var uphone = req.body.uphone;
	var upwd = req.body.upwd;
	var user_params = [uphone, upwd];
	userDao.userLogin(user_params, function(err, result) {
		if (err) {
			res.json({
				msg: "服务器错误"
			});
		} else {
			if (result.length == 0) {
				res.json({
					msg: "用户名或密码错误"
				});
			} else {
				cookieTool.gen_cookie(result, res);
				res.json({
					msg: "登录成功"
				});
			}
		}
	});
};
exports.register = function(req, res, next) {
	var uname = req.body.uname;
	var uphone = req.body.uphone;
	var upwd = req.body.upwd;
	var IDcard = req.body.IDcard;
	var auth_params = [IDcard];
	var user_params = [uname, uphone, upwd, IDcard];
	var phone_params = [uphone];
	userDao.getIDcard(auth_params, function(err, result) {
		if (err) {
			console.log(err);
			res.json({
				msg: "服务器错误"
			});
		} else {
			if (result.length == 0) {
				res.json({
					msg: "未找到此用户的身份"
				});
			} else {
				userDao.getUserByPhone(phone_params, function(err, result) {
					if (err) {
						res.json({
							msg: "服务器错误"
						});
					} else {
						if (result.length > 0) {
							res.json({
								msg: "此用户已被注册"
							});
						} else {
							userDao.addUser(user_params, function(err) {
								if (err) {
									if (err.errno == 1062) {
										res.json({
											msg: "此用户已被注册"
										});
									} else {
										res.json({
											msg: "注册失败"
										});
									}
								} else {
									res.json({
										msg: "注册成功"
									});
								}
							});
						}
					}
				});

			}
		}
	});

};
exports.findPwd = function(req, res, next) {
	var uphone = req.body.uphone;
	var upwd = req.body.upwd;
	var user_params_query = [uphone];
	var user_params = [upwd, uphone];
	userDao.getUserByPhone(user_params_query, function(err, result) {
		if (err) {
			res.json({
				msg: "服务器错误"
			});
		} else {
			if (result.length > 0) {
				userDao.findPwd(user_params, function(err) {
					if (err) {
						res.json({
							msg: "密码修改失败"
						});
					} else {
						res.json({
							msg: "密码修改成功"
						});
					}
				});
			} else {
				res.json({
					msg: "没有此用户"
				});
			}
		}
	});
};
//获取所有用户信息
exports.getUserInfo = function(req,res){
	var user_params = [];
	userDao.getUserInfo(user_params,function(err,result){
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
exports.logout = function(req, res,next) {
	res.clearCookie("user", {
		path: '/'
	});
	return res.json({
		code: 10,
		msg: "注销成功"
	});
};
exports.selfInfo = function(req,res,next){
	var uid = req.signedCookies.user.uid;
	var user_params = [uid];
	userDao.getUserById(user_params,function(err,result){
		if(err){
			res.json({
				msg:"查询错误"
			});
		}else{
			res.json({
				msg:result
			});
		}
	});
};