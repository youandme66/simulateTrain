$(function(){
	$("#login").click(function(){
		var aname = $("#name").val();
		var apwd = $("#pwd").val();
		if(aname==""||aname==null||apwd==""||apwd==null){
			swal("警告信息","用户名或密码不能为空");
			return;
		}
		$.ajax({
			type:"POST",
			url:"/adminlogin",
			data:{
				anumber:aname,
				apwd:apwd
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="登录成功"){
					$("#name").val("");
					$("#pwd").val("");
					swal("登录成功","正在进入主页...","success");
					setTimeout(function(){
						window.location.href="/adminmain";	
					},"1500");
				}else{
					swal("服务器消息",data.msg);
				}
			}
		})
	})
})