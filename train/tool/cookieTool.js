exports.gen_cookie=function(user,res){
    var is_visted=1;
    var uid=null;
	uid=user[0].uid;
	var opts = {
    path: '/',
    maxAge: 10 * 24 * 60 * 60 * 1000, //30天
    signed: true,
    httpOnly: false
  };
  res.cookie("user", {is_visted:is_visted,uid:uid}, opts);
};
exports.gen_cookie_admin = function(user,res){
	var is_admin=1;
	var anumber = user[0].anumber;
	var opts = {
		path:'/',
		maxAge:1*24*60*60*1000,
		signed:true,
		httpOnly:false
	};
	res.cookie("admin",{is_admin:is_admin,anumber:anumber},opts);
}