$(function(){
	$("#logout").click(function(){
		$.ajax({
			type:"POST",
			url:"/logout",
			success:function(data){
				if(data.msg=="注销成功"){
					swal("警告信息",data.msg);
					setTimeout(function(){
						window.location.href="/userlogin";
					},"1500")
				}
			}
		});
	});
	function getTrain(){
		$.ajax({
		type: "POST",
		url: "/userquerybytrain",
		success: function(data) {
			var header = "";
			for (var i = 0; i < data.msg.length; i++) {
				header += '<tr><td><span>'+data.msg[i].tnumber+'</span></td><td><span>'+data.msg[i].tstart+'</span></td><td><img style="width:30px;" src="imgs/箭头箭头.png"></td>'
						+'<td><span>'+data.msg[i].tend+'</span></td><td><span>'+data.msg[i].tstime+'</span></td><td><span>'+data.msg[i].tetime+'</span></td><td><span>'+data.msg[i].tcount+'</span></td>'
						+'<td><span><button class="btn btn-primary">查看详情</button></span></td></tr>';
			}
			$('#train').empty();
			$('#train').append(header);
		}
	});
	};
	$("#updateTrain").click(function(){
		getTrain();
	});
	getTrain();
	(function(){
		$.ajax({
			type:"POST",
			url:"/selfinfo",
			success:function(data){
				if(data.msg=="查询错误"){
					swal("服务器消息","查询用户信息失败");
				}else{
					$("#uname").text(data.msg[0].uname);
					$("#uphone").text(data.msg[0].uphone);
					$("#IDcard").text(data.msg[0].IDcard);
				}
			}
		})
	})()
	$("#search").click(function(){
		getTrain(); 
	});
	function searchSeat(tstart,tend){
		$.ajax({
			type:"POST",
			url:"/querybyplace",
			data:{
				tstart:tstart,
				tend:tend
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="未查询到符合条件的"){
					swal("服务器消息",data.msg);
				}else if(data.msg=="服务器错误"){
				swal("服务器消息",data.msg);
				}
				else{
					var content = "";
				for(i=0;i<data.msg.length;i++){
					content+='<tr id="'+i+'"><td><span>'+data.msg[i].cpname+'</span></td><td><span>'+data.msg[i].cpname1+'</span></td><td><span>'+data.msg[i].tnumber+'</span></td>'
							+'<td><span>'+data.msg[i].num+'</span></td><td><span>'+(data.msg[i].cprice1-data.msg[i].cprice)+'</span></td><td><span>'+data.msg[i].stime+'</span></td>'
							+'<td><span>'+data.msg[i].atime1+'</span></td><td><button class="btn btn-success" data-toggle="modal" data-target="#orderModal" onclick="openOrder('+i+','+data.msg[i].cpid+','+data.msg[i].cpid1+','+data.msg[i].tid+')">订票</button></td></tr>';
				}
				$("#searchSeatNum").empty();
				$("#searchSeatNum").append(content);
			}
			}
		})
	}
	$("#usersearch").click(function(){
		var tstart = $("#tstart").val();
		var tend = $("#tend").val();
		if(tstart==""||tend==""){
			swal("提示信息","输入信息不能为空");
			return;
		}
		$.ajax({
			type:"POST",
			url:"/querybyplace",
			data:{
				tstart:tstart,
				tend:tend
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="未查询到符合条件的"){
					swal("服务器消息",data.msg);
				}else if(data.msg=="服务器错误"){
				swal("服务器消息",data.msg);
				}
				else{
					var content = "";
				for(i=0;i<data.msg.length;i++){
					content+='<tr id="'+i+'"><td><span>'+data.msg[i].cpname+'</span></td><td><span>'+data.msg[i].cpname1+'</span></td><td><span>'+data.msg[i].tnumber+'</span></td>'
							+'<td><span>'+data.msg[i].num+'</span></td><td><span>'+(data.msg[i].cprice1-data.msg[i].cprice)+'</span></td><td><span>'+data.msg[i].stime+'</span></td>'
							+'<td><span>'+data.msg[i].atime1+'</span></td><td><button class="btn btn-success" data-toggle="modal" data-target="#orderModal" onclick="openOrder('+i+','+data.msg[i].cpid+','+data.msg[i].cpid1+','+data.msg[i].tid+')">订票</button></td></tr>';
				}
				$("#searchSeatNum").empty();
				$("#searchSeatNum").append(content);
			}
			}
		})
	});
	$("#subOrder").click(function(){
		var cpid = $("#cpid").val();
		var cpid1 = $("#cpid1").val();
		var cpname = $("#cpname5").text();
		var cpname1 = $("#cpname6").text();
		var tnumber = $("#tnumber2").text();
		var oprice = $("#cprice2").text();
		var stime = $("#stime2").text();
		var atime = $("#atime2").text();
		var tid = $("#tid").val();
		$.ajax({
			type:'POST',
			url:'/createorder',
			data:{
				cpid:cpid,
				cpid1:cpid1,
				cpname:cpname,
				cpname1:cpname1,
				tnumber:tnumber,
				oprice:oprice,
				stime:stime,
				atime:atime,
				tid:tid
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="票已被抢光了"){
					$("#orderModal").modal('hide');
					swal("票已被抢光了","","warning");
				}else if(data.msg=='购票成功'){
					$("#orderModal").modal('hide');
					searchSeat(cpname,cpname1);
					swal("购票成功","请到订单信息中查询","success");
				}else{
					swal("服务器消息",data.msg);
				}
			}
		});
	});
	$("#searchOrder").click(function(){
		$.ajax({
			type:"POST",
			url:"/orderinfo",
			success:function(data){
				if(data.msg=='服务器错误'){
					swal("服务器消息",data.msg);
				}
				else if(data.msg.length==0){
					swal("服务器消息","你还没有任何订单信息,已过期订单在历史记录");
				}else{
					var content = "";
					for(i=0;i<data.msg.length;i++){
						content+='<tr><td><span>'+data.msg[i].uname+'</span></td><td><span>'+data.msg[i].IDcard+'</span></td><td><span>'+data.msg[i].tnumber+'</span></td>'
								+'<td><span>'+data.msg[i].snumber+'</span></td><td><span>'+data.msg[i].ostart+'</td></span><td><span>'+data.msg[i].oend+'</td></span>'
								+'<td><span>'+data.msg[i].ostime+'</td></span><td><span>'+data.msg[i].oetime+'</td></span><td><span>'+data.msg[i].oprice+'</td></span></tr>';
					}
					$("#order").empty();
					$("#order").append(content);
				}
			}
		})
	});
	$("#historyOrder").click(function(){
		$.ajax({
			type:'POST',
			url:'/order',
			success:function(data){
				if(data.msg==0){
					swal("服务器消息","你没有任何历史记录");
				}else{
					var content = "";
					for(i=0;i<data.msg.length;i++){
						content+='<tr><td><span>'+data.msg[i].tnumber+'</span></td><td><span>'+data.msg[i].snumber+'</span></td><td><span>'+data.msg[i].ostart+'</span></td>'
								+'<td><span>'+data.msg[i].oend+'</span></td><td><span>'+data.msg[i].otime+'</span></td><td><span>'+data.msg[i].oprice+'</span></td><td><span><button class="btn btn-primary" onclick="deleteOrder('+data.msg[i].oid+')" style="margin-top: -3px;">删除</button></span></td> </tr>';
					}
					$("#oldOrder").empty();
					$("#oldOrder").append(content);
				}
			}
		})
	})
});
function openOrder(i,cpid,cpid1,tid){
	var obj = $("#"+i).children("td");
	var cpname = obj.eq(0).text();
	var cpname1 = obj.eq(1).text();
	var tnumber = obj.eq(2).text();
	var cprice = obj.eq(4).text();
	var stime = obj.eq(5).text();
	var atime = obj.eq(6).text();
	$("#tnumber2").text(tnumber);
	$("#cpname5").text(cpname);
	$("#cpname6").text(cpname1);
	$("#stime2").text(stime);
	$("#atime2").text(atime);
	$("#cprice2").text(cprice);
	$("#cpid").val(cpid);
	$("#cpid1").val(cpid1);
	$("#tid").val(tid);
}
function deleteOrder(oid){
	$.ajax({
		type:'POST',
		url:'/deleteorder',
		data:{
			oid:oid
		},
		dataType:'json',
		success:function(data){
			if(data.msg=="订单未过期"){
				swal("违规操作","订单未过期无法删除","warning");
			}else if(data.msg=="删除成功"){
				swal("删除成功","","success");
			}else{
				swal("服务器消息","服务器错误");
			}
		}
	});
	$.ajax({
			type:'POST',
			url:'/order',
			success:function(data){
				if(data.msg==0){
				}else{
					var content = "";
					for(i=0;i<data.msg.length;i++){
						content+='<tr><td><span>'+data.msg[i].tnumber+'</span></td><td><span>'+data.msg[i].snumber+'</span></td><td><span>'+data.msg[i].ostart+'</span></td>'
								+'<td><span>'+data.msg[i].oend+'</span></td><td><span>'+data.msg[i].otime+'</span></td><td><span>'+data.msg[i].oprice+'</span></td><td><span><button class="btn btn-primary" onclick="deleteOrder('+data.msg[i].oid+')" style="margin-top: -3px;">删除</button></span></td> </tr>';
					}
					$("#oldOrder").empty();
					$("#oldOrder").append(content);
				}
			}
		})
}