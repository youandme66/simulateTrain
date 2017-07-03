$(function() {
	//登录验证
	var isvalidate = {
		"phone": false,
		"pwd": false
	};
	$("#phone").change(function() {
		var is_phone_regx = /^\d{11}$/;
		if ($(this).val() == "" || $(this).val() == null || !is_phone_regx.test($(this).val())) {
			$("#info1").removeClass("has-success");
			$("#info1").addClass("has-error");
			$("#uphone").removeClass("glyphicon-ok");
			$("#uphone").addClass("glyphicon-remove");
			isvalidate.phone = false;
		} else {
			$("#info1").removeClass("has-error");
			$("#info1").addClass("has-success");
			$("#uphone").removeClass("glyphicon-remove");
			$("#uphone").addClass("glyphicon-ok");
			isvalidate.phone = true;
		}
	});
	$("#pwd").change(function() {
		if ($(this).val() == "" || $(this).val() == null || $(this).val().length < 8 || $(this).val().length > 16) {
			$("#info2").removeClass("has-success");
			$("#info2").addClass("has-error");
			$("#upwd").removeClass("glyphicon-ok");
			$("#upwd").addClass("glyphicon-remove");
			isvalidate.pwd = false;
		} else {
			$("#info2").removeClass("has-error");
			$("#info2").addClass("has-success");
			$("#upwd").removeClass("glyphicon-remove");
			$("#upwd").addClass("glyphicon-ok");
			isvalidate.pwd = true;
		}
	});
	//用户登录
	$("#login").click(function() {
		var phone = $("#phone").val();
		var is_phone_regx = /^\d{11}$/;
		if (is_phone_regx.test(phone)) {
			isvalidate.phone=true;
		}
		if (!isvalidate.phone) {
			swal("警告信息","手机号格式不正确");
			return;
		}
		var pwd = $("#pwd").val();
		if(pwd.length>=8&&pwd.length<=16){
			isvalidate.pwd=true;
		}
		if (!isvalidate.pwd) {
			swal("警告信息","密码格式不正确");
			return;
		}
		var data = {
			"uphone": phone,
			"upwd": pwd
		};
		$.ajax({
			type: "POST",
			url: "/userlogin",
			data: data,
			dataType: "json",
			success: function(data) {
				if(data.msg=="登录成功"){
					$("#phone").val("");
					$("#pwd").val("");
					swal("登录成功","正在进入主页...","success");
					setTimeout(function(){
						window.location.href='/main';
					},"1500");
				}else{
					swal("服务器消息",data.msg);
				}
			}
		});
	});
	//注册验证
	var revalidate={
		"phone":false,
		"pwd":false,
		"name":false,
		"IDcard":false
	};
	$("#name1").change(function() {
		var is_name = /^[a-zA-Z0-9\-_\u4E00-\uFA29|\uE7C7-\uE7F3]{1,20}$/i;
		if ($(this).val() == "" || $(this).val() == null || !is_name.test($(this).val())) {
			$("#info3").removeClass("has-success");
			$("#info3").addClass("has-error");
			$("#uname1").removeClass("glyphicon-ok");
			$("#uname1").addClass("glyphicon-remove");
			revalidate.name = false;
		} else {
			$("#info3").removeClass("has-error");
			$("#info3").addClass("has-success");
			$("#uname1").removeClass("glyphicon-remove");
			$("#uname1").addClass("glyphicon-ok");
			revalidate.name = true;
		}
	});
	$("#phone1").change(function() {
		var is_phone_regx = /^\d{11}$/;
		if ($(this).val() == "" || $(this).val() == null || !is_phone_regx.test($(this).val())) {
			$("#info4").removeClass("has-success");
			$("#info4").addClass("has-error");
			$("#uphone1").removeClass("glyphicon-ok");
			$("#uphone1").addClass("glyphicon-remove");
			revalidate.phone = false;
		} else {
			$("#info4").removeClass("has-error");
			$("#info4").addClass("has-success");
			$("#uphone1").removeClass("glyphicon-remove");
			$("#uphone1").addClass("glyphicon-ok");
			revalidate.phone = true;
		}
	});
	$("#IDcard").change(function() {
		if ($(this).val() == "" || $(this).val() == null||$(this).val().length!=18) {
			$("#info9").removeClass("has-success");
			$("#info9").addClass("has-error");
			$("#uIDcard").removeClass("glyphicon-ok");
			$("#uIDcard").addClass("glyphicon-remove");
			revalidate.IDcard = false;
		} else {
			$("#info9").removeClass("has-error");
			$("#info9").addClass("has-success");
			$("#uIDcard").removeClass("glyphicon-remove");
			$("#uIDcard").addClass("glyphicon-ok");
			revalidate.IDcard = true;
		}
	});
	$("#pwd1").change(function() {
		if ($(this).val() == "" || $(this).val() == null ||$(this).val().length < 8 || $(this).val().length > 16) {
			$("#info5").removeClass("has-success");
			$("#info5").addClass("has-error");
			$("#upwd1").removeClass("glyphicon-ok");
			$("#upwd1").addClass("glyphicon-remove");
			revalidate.pwd = false;
		} else {
			$("#info5").removeClass("has-error");
			$("#info5").addClass("has-success");
			$("#upwd1").removeClass("glyphicon-remove");
			$("#upwd1").addClass("glyphicon-ok");
			revalidate.pwd = true;
		}
	});
	//用户注册
	$("#register").click(function(){
		var is_name = /^[a-zA-Z0-9\-_\u4E00-\uFA29|\uE7C7-\uE7F3]{1,20}$/i;
		var is_phone_regx = /^\d{11}$/;
		var uname = $("#name1").val();
		var uphone = $("#phone1").val();
		var upwd = $("#pwd1").val();
		var uIDcard = $("#IDcard").val();
		if(is_name.test(uname)){
			revalidate.name=true;
		}
		if(is_phone_regx.test(uphone)){
			revalidate.phone=true;
		}
		if(upwd.length>=8&&upwd.length<=16){
			revalidate.pwd=true;
		}
		if(uIDcard.length==18){
			revalidate.IDcard=true;
		}
		if(!revalidate.name){
			swal("警告信息","用户名格式不正确");
			return;
		}
		if(!revalidate.phone){
			swal("警告信息","手机号格式不正确");
			return;
		}
		if(!revalidate.pwd){
			swal("警告信息","密码格式不正确");
			return;
		}
		if(!revalidate.IDcard){
			swal("警告信息","身份证格式不正确");
			return;
		}
		$.ajax({
			type:"POST",
			url:"/register",
			data:{
				uname:uname,
				uphone:uphone,
				upwd:upwd,
				IDcard:uIDcard
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="注册成功"){
					$("#name1").val("");
					$("#phone1").val("");
					$("#pwd1").val("");
					$("#myModal2").modal('hide');
					swal("注册成功","请登录","success");
				}else{
					swal("服务器消息",data.msg);
				}
			}
		});
	});
	//找回密码验证
	var findvalidate = {
		"phone":false,
		"pwd1":false,
		"pwd2":false,
		"issame":false
	};
	$("#phone2").change(function() {
			var is_phone_regx = /^\d{11}$/;
		if ($(this).val() == "" || $(this).val() == null ||!is_phone_regx.test($(this).val())) {
			$("#info6").removeClass("has-success");
			$("#info6").addClass("has-error");
			$("#uphone2").removeClass("glyphicon-ok");
			$("#uphone2").addClass("glyphicon-remove");
			findvalidate.phone = false;
		} else {
			$("#info6").removeClass("has-error");
			$("#info6").addClass("has-success");
			$("#uphone2").removeClass("glyphicon-remove");
			$("#uphone2").addClass("glyphicon-ok");
			findvalidate.phone = true;
		}
	});
	$("#pwd2").change(function() {
		if ($(this).val() == "" || $(this).val() == null ||$(this).val().length < 8 || $(this).val().length > 16) {
			$("#info7").removeClass("has-success");
			$("#info7").addClass("has-error");
			$("#upwd2").removeClass("glyphicon-ok");
			$("#upwd2").addClass("glyphicon-remove");
			findvalidate.pwd1 = false;
		} else {
			$("#info7").removeClass("has-error");
			$("#info7").addClass("has-success");
			$("#upwd2").removeClass("glyphicon-remove");
			$("#upwd2").addClass("glyphicon-ok");
			if($(this).val()==$("#pwd3").val()){
				findvalidate.issame=true;
			}
			findvalidate.pwd1 = true;
		}
	});
	$("#pwd3").change(function() {
		if ($(this).val() == "" || $(this).val() == null ||$(this).val().length < 8 || $(this).val().length > 16) {
			$("#info8").removeClass("has-success");
			$("#info8").addClass("has-error");
			$("#upwd3").removeClass("glyphicon-ok");
			$("#upwd3").addClass("glyphicon-remove");
			findvalidate.pwd2 = false;
		} else {
			$("#info8").removeClass("has-error");
			$("#info8").addClass("has-success");
			$("#upwd3").removeClass("glyphicon-remove");
			$("#upwd3").addClass("glyphicon-ok");
			if($(this).val()==$("#pwd2").val()){
				findvalidate.issame=true;
			}
			findvalidate.pwd2 = true;
		}
	});
	//用户找回密码
	$("#updatepwd").click(function(){
		var uphone = $("#phone2").val();
		var upwd = $("#pwd2").val();
		var upwd2 = $("#pwd3").val();
		var is_phone_regx = /^\d{11}$/;
		if(is_phone_regx.test(uphone)){
			findvalidate.phone=true;
		}
		if(upwd.length>=8&&upwd<=16&&upwd2.length>=8&&upwd2<=16){
			findvalidate.pwd1=true;
			findvalidate.pwd2=true;
		}
		if(upwd==upwd2){
			findvalidate.issame=true;
		}
		if(!findvalidate.phone){
			swal("警告信息","手机号格式不正确");
			return;
		}
		if(!findvalidate.pwd1){
			swal("警告信息","密码格式不正确");
			return;
		}
		if(!findvalidate.pwd2){
			swal("警告信息","密码格式不正确");
			return;
		}
		if(!findvalidate.issame){
			swal("警告信息","两次输入密码不一致");
			return;
		}
		$.ajax({
			type:"POST",
			url:"/findpwd",
			data:{
				uphone:uphone,
				upwd:upwd
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="密码修改成功"){
					$("#phone2").val("");
					$("#pwd2").val("");
					$("#pwd3").val("");
					$("#myModal").modal('hide');
					swal("找回密码成功","请登录","success");
				}else{
					swal("服务器消息",data.msg);
				}
			}
		});
	});
});

