var adminDao = require("../Dao/AdminDao");
var cookieTool = require("../tool/cookieTool");
exports.admin = function(req,res,next){
	try{
		if(req.signedCookies.admin.is_admin){
		res.render("adminmain",{});
	}else{
		res.render("adminlogin",{});
	}
	}catch(e){
		res.render("adminlogin",{});
	}	
};
exports.adminMain = function(req,res,next){
	try{
		if(req.signedCookies.admin.is_admin){
		res.render("adminmain",{});
	}else{
		res.render("adminlogin",{});
	}
}catch(e){
	res.render("adminlogin",{});
}
	
};
exports.adminLogin = function(req,res,next){
	var anumber = req.body.anumber;
	var apwd = req.body.apwd;
	var user_params = [anumber,apwd];
	adminDao.adminLogin(user_params,function(err,result){
			if(err){
				res.json({
					msg:'服务器错误'
				});
			}else{
				if(result.length>0){
					cookieTool.gen_cookie_admin(result,res);
					res.json({
						msg:"登录成功"
					});
				}else{
					res.json({
						msg:"用户名或密码错误"
					});
				}
			}
	});
};
exports.logout = function(req,res,next){
	res.clearCookie("admin", {
		path: '/'
	});
	return res.json({
		code: 10,
		msg: "注销成功"
	});
};
exports.updatePwd = function(req,res,next){
	var anumber = req.signedCookies.admin.anumber;
	var apwd = req.body.apwd;
	var user_params = [apwd,anumber];
	adminDao.updatePwd(user_params,function(err,result){
		if(err){
			res.json({
				msg:"服务器错误"
			});
		}else{
			res.json({
				msg:"密码修改成功"
			});
		}
	});
};