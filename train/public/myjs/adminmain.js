$(function() {
	//添加车辆
	$("#addTrain").click(function() {
		var tnumber = $('#tnumber').val();
		var tstime = $('#tstime').val();
		var tetime = $('#tetime').val();
		var tcount = $('#tcount').val();
		var tstart = $('#tstart').val();
		var tend = $('#tend').val();
		if (tnumber == "" || tstime == "" || tetime == "" || tcount == "" || tstart == "" || tend == "") {
			swal("警告信息", "输入信息不能为空");
			return;
		}
		$.ajax({
			type: "POST",
			url: "/addcar",
			data: {
				tnumber: tnumber,
				tstime: tstime,
				tetime: tetime,
				tcount: tcount,
				tstart: tstart,
				tend: tend
			},
			dataType: 'json',
			success: function(data) {
				if (data.msg == "添加成功") {
					var tnumber = $('#tnumber').val("");
					var tstime = $('#tstime').val("");
					var tetime = $('#tetime').val("");
					var tcount = $('#tcount').val("");
					var tstart = $('#tstart').val("");
					var tend = $('#tend').val("");
					gettrain();
					swal(data.msg, "", "success");
					$('#Inset').modal('hide');
				} else {
					swal("", data.msg);
				}
			}
		});
	});
	//更新密码
	$("#updatepwd").click(function() {
		var apwd1 = $("#apwd").val();
		var apwd2 = $("#apwd2").val();
		if (apwd1 == "" || apwd2 == "") {
			swal("警告信息", "输入信息不能为空");
			return;
		}
		if (apwd1 != apwd2) {
			swal("警告信息", "两次密码输入不一致");
			return;
		}
		$.ajax({
			type: "POST",
			url: "/admin/updatepwd",
			data: {
				apwd: apwd1
			},
			dataType: "json",
			success: function(data) {
				if (data.msg == "密码修改成功") {
					swal("", data.msg, "success");
					var apwd1 = $("#apwd").val("");
					var apwd2 = $("#apwd2").val("");
					$("#UpdatePwd").modal('hide');
				} else {
					swal("警告信息", data.msg);
				}
			}
		});
	});
	//登出系统
	$("#logout").click(function() {
		$.ajax({
			type: "POST",
			url: "/adminlogout",
			success: function(data) {
				if (data.msg == "注销成功") {
					swal(data.msg, "", "success");
					setTimeout(function() {
						window.location.href = "/adminlogin";
					}, "1500");
				} else {
					swal("服务器消息", data.msg);
				}
			}
		});
	});
	//查询所有车辆
	function gettrain() {
		$.ajax({
			type: "POST",
			url: "/querybytrain",
			success: function(data) {
				var header = '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1">列车</div>' + '<div class="col-md-1"><span>出发地</span></div>' + '<div class="col-md-1"><img style="width:20px;" src="imgs/箭头箭头.png"></div>' + '<div class="col-md-1"><span>目的地</span></div>' + '<div class="col-md-2"><span>出发时</span></div>' + '<div class="col-md-2"><span>到达时</span></div>' + '<div class="col-md-1"><span>票数</span></div><div class="col-md-1"><span>是否开启</span></div></div></li>';
				for (var i = 0; i < data.msg.length; i++) {
					header += '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1"><a href="#" onclick="getPlace(' + data.msg[i].tid + ')" data-toggle="tab" role="tab"><span>' + data.msg[i].tnumber + '</span></a></div>' + '<div class="col-md-1"><span>' + data.msg[i].tstart + '</span></div>' + '<div class="col-md-1"><img style="width:20px;" src="imgs/箭头箭头.png"></div>' + '<div class="col-md-1"><span>' + data.msg[i].tend + '</span></div>' + '<div class="col-md-2"><span>' + data.msg[i].tstime + '</span></div>' + '<div class="col-md-2"><span>' + data.msg[i].tetime + '</span></div>' + '<div class="col-md-1"><span>' + data.msg[i].tcount + '</span></div><div class="col-md-1"><span>' +(data.msg[i].isopen.data[0]==1?"已开启":"未开启")+ '</span></div><div class="col-md-1" ><button  type="button" class="btn btn-danger btn-sm" style="margin-top: -4px;" onclick="deleteInfo(' + (i + 1) + ')">删除信息</button></div>' + '<div class="col-md-1" ><button  type="button" data-toggle="modal" data-target="#Update" class="btn btn-primary btn-sm" style="margin-top: -4px;" onclick="updateInfo(' + (i + 1) + ')">更新信息</button></div></div></li>'
				}
				$('ul#train').empty();
				$('ul#train').append(header);
			}
		});
	}
	//获取用户信息
	function getuser() {
		$.ajax({
			type: "POST",
			url: "/userinfo",
			success: function(data) {
				var header = '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-2">用户名</div>' + '<div class="col-md-2"><span>手机号</span></div>' + '<div class="col-md-4"><span>身份证号</span></div>' + '<div class="col-md-3"><span>学生证号</span></div>' + '<div class="col-md-1"><span>是否是学生</span></div>';
				if (data.msg.length == 0) {
					$('ul#train').empty();
					$('ul#train').append(header);
					swal("服务器消息", "当前没有任何用户");
				} else {
					for (var i = 0; i < data.msg.length; i++) {
						header += '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-2"><span>' + data.msg[i].uname + '</span></a></div>' + '<div class="col-md-2"><span>' + data.msg[i].uphone + '</span></div>' + '<div class="col-md-4"><span>' + data.msg[i].IDcard + '</span></div>' + '<div class="col-md-3"><span>' + (data.msg[i].IDstu == null ? '无学生证号' : data.msg[i].IDstu) + '</span></div>' + '<div class="col-md-1"><span>' + (data.msg[i].isstu == 0 ? '否' : '是') + '</span></div>';
					}
					$('ul#train').empty();
					$('ul#train').append(header);
				}
			}
		});
	}
	$("#userinfo").click(getuser);
	$("#manage").click(gettrain);
	$(document).ready(gettrain);
	//更新车辆
	$('#updateCar').click(function() {
		var tnumber = $("#tnumber1").val();
		var tstime = $("#tstime1").val();
		var tetime = $("#tetime1").val();
		var tcount = $("#tcount1").val();
		var tstart = $("#tstart1").val();
		var tend = $("#tend1").val();
		if (tnumber == "" || tstime == "" || tetime == "" || tcount == "" || tstart == "" || tend == "") {
			swal("警告信息", "输入信息不能为空");
			return;
		}
		$.ajax({
			type: "POST",
			url: "/updatecar",
			data: {
				tnumber: tnumber,
				tstime: tstime,
				tetime: tetime,
				tcount: tcount,
				tstart: tstart,
				tend: tend
			},
			dataType: "json",
			success: function(data) {
				if (data.msg == "更新成功") {
					swal(data.msg, "", "success");
					$("#Update").modal('hide');
					gettrain();
				}else if(data.msg=="列车已被开启"){
					swal(tnumber+"次列车已被开启,不可更新","","warning");
					$("#Update").modal('hide');
				}
				 else {
					swal("警告信息", data.msg);
				}
			}
		});
	});
	//通过编号查询列车
	$("#search").click(function() {
		var tnumber = $("#tnumber2").val();
		if (tnumber == "") {
			swal("警告信息", "输入信息不能为空");
			return;
		}
		$.ajax({
			type: "POST",
			url: "/querybynum",
			data: {
				tnumber: tnumber
			},
			dataType: 'json',
			success: function(data) {
				if (data.code == -20) {
					swal("服务器消息", data.msg);
				} else {
					var header = '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1">列车</div>' + '<div class="col-md-1"><span>出发地</span></div>' + '<div class="col-md-1"><img style="width:20px;" src="imgs/箭头箭头.png"></div>' + '<div class="col-md-1"><span>目的地</span></div>' + '<div class="col-md-2"><span>出发时</span></div>' + '<div class="col-md-2"><span>到达时</span></div>' + '<div class="col-md-1"><span>票数</span></div><div class="col-md-1"><span>是否开启</span></div></div></li>';
				for (var i = 0; i < data.msg.length; i++) {
					header += '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1"><a href="#" onclick="getPlace(' + data.msg[i].tid + ')" data-toggle="tab" role="tab"><span>' + data.msg[i].tnumber + '</span></a></div>' + '<div class="col-md-1"><span>' + data.msg[i].tstart + '</span></div>' + '<div class="col-md-1"><img style="width:20px;" src="imgs/箭头箭头.png"></div>' + '<div class="col-md-1"><span>' + data.msg[i].tend + '</span></div>' + '<div class="col-md-2"><span>' + data.msg[i].tstime + '</span></div>' + '<div class="col-md-2"><span>' + data.msg[i].tetime + '</span></div>' + '<div class="col-md-1"><span>' + data.msg[i].tcount + '</span></div><div class="col-md-1"><span>' +(data.msg[i].isopen.data[0]==1?"已开启":"未开启")+ '</span></div><div class="col-md-1" ><button  type="button" class="btn btn-danger btn-sm" style="margin-top: -4px;" onclick="deleteInfo(' + (i + 1) + ')">删除信息</button></div>' + '<div class="col-md-1" ><button  type="button" data-toggle="modal" data-target="#Update" class="btn btn-primary btn-sm" style="margin-top: -4px;" onclick="updateInfo(' + (i + 1) + ')">更新信息</button></div></div></li>'
				}
				$('ul#train').empty();
				$('ul#train').append(header);
				}
			}
		});
	});

	function getPlace(i) {
		$.ajax({
			type: "POST",
			url: "/getplace",
			data: {
				tid: i
			},
			dataType: "json",
			success: function(data) {
				if (data.msg == "服务器错误") {
					swal("查询错误", "", "success");
				} else {
					if (data.msg.length == 0) {
						$('ul#train').empty();
						appendFoot(data.tnumber, i);
					} else {
						var header = '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1">列车</div>' + '<div class="col-md-1"><span>站点</span></div>' + '<div class="col-md-2"><span>价格</span></div>' + '<div class="col-md-3"><span>抵达时间</span></div>' + '<div class="col-md-3"><span>发车时间</span></div>';
						for (j = 0; j < data.msg.length; j++) {
							header += '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1"><span>' + data.tnumber + '</span></div>' + '<div class="col-md-1"><span>' + data.msg[j].cpname + '</span></div>' + '<div class="col-md-2"><span>' + data.msg[j].cprice + '</span></div>' + '<div class="col-md-3"><span>' + data.msg[j].atime + '</span></div>' + '<div class="col-md-3"><span>' + data.msg[j].stime + '</span></div>' + '<div class="col-md-2" ><button  type="button" data-toggle="modal" data-target="#updateplace" class="btn btn-primary btn-sm" style="margin-top: -4px;" onclick="updateplaceInfo(' + (j + 1) + ',' + data.msg[j].cpid + ',' + i + ')">更新信息</button></div></div></li>';
						}
						$('ul#train').empty();
						$('ul#train').append(header);
						appendFoot(data.tnumber, i);
					}
				}
			}
		});

	}
	$("#subplace").click(function() {
		var tid = $("#tid").val();
		var cpname = $("#cpname").val();
		var cprice = $("#cprice").val();
		var atime = $("#atime").val();
		var stime = $("#stime").val();
		if(tid==""||cpname==""||cprice==""||atime==""||stime==""){
			swal("提示信息","输入信息不能为空");
			return;
		}
		$.ajax({
			type: "POST",
			url: "/addplace",
			data: {
				tid: tid,
				cpname: cpname,
				cprice: cprice,
				atime: atime,
				stime: stime
			},
			dataType: "json",
			success: function(data) {
				if (data.msg == "添加成功") {
					$("#addplace").modal("hide");
					swal("添加成功", "", "success");
					$("#cpname").val("");
					$("#cprice").val("");
					$("#atime").val("");
					$("#stime").val("");
					getPlace(tid);
				}else if(data.msg=="列车已被开启"){
					swal("服务器消息","列车已被启动,不可添加站点");
				}
				 else {
					swal("服务器消息", "添加失败");
				}
			}
		});
	});
	$("#subupdateplace").click(function() {
		var cpid = $("#cpid").val();
		var cpname = $("#cpname1").val();
		var cprice = $("#cprice1").val();
		var atime = $("#atime1").val();
		var stime = $("#stime1").val();
		var tid = $("#tid2").val();
		if(cpid==""||cpname==""||cprice==""||atime==""||stime==""||tid==""){
			swal("提示信息","输入信息不能为空");
			return;
		}
		$.ajax({
			type: "POST",
			url: "/updateplace",
			data: {
				cpid: cpid,
				cpname: cpname,
				cprice: cprice,
				atime: atime,
				stime: stime,
				tid:tid
			},
			dataType: "json",
			success: function(data) {
				if (data.msg == "修改成功") {
					$("#updateplace").modal("hide");
					swal("修改成功", "", "success");
					getPlace(tid);
				}else if(data.msg=='列车已被开启'){
					swal("服务器消息","列车已被开启,不可修改站点")
				} 
				else {
					swal("服务器消息", "修改失败");
				}
			}
		});
	});
	$("#tstime").datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: 1
	});
	$("#tetime").datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: 1
	});
	$("#tstime1").datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: 1
	});
	$("#tetime1").datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: 1
	});
	$("#atime").datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: 1
	});
	$("#stime").datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: 1
	});
	$("#atime1").datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: 1
	});
	$("#stime1").datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: 1
	});
});

function updateInfo(i) {
	var tnumber = $('ul#train li').eq(i).children('div').children('div').eq(0).text();
	var tstart = $('ul#train li').eq(i).children('div').children('div').eq(1).text();
	var tend = $('ul#train li').eq(i).children('div').children('div').eq(3).text();
	var tstime = $('ul#train li').eq(i).children('div').children('div').eq(4).text();
	var tetime = $('ul#train li').eq(i).children('div').children('div').eq(5).text();
	var tcount = $('ul#train li').eq(i).children('div').children('div').eq(6).text();
	$("#car").text(tnumber);
	$("#tnumber1").val(tnumber);
	$("#tstime1").val(tstime);
	$("#tetime1").val(tetime);
	$("#tcount1").val(tcount);
	$("#tstart1").val(tstart);
	$("#tend1").val(tend);
}
//查询所有车辆
function gettrain() {
	$.ajax({
		type: "POST",
		url: "/querybytrain",
		success: function(data) {
			var header = '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1">列车</div>' + '<div class="col-md-1"><span>出发地</span></div>' + '<div class="col-md-1"><img style="width:20px;" src="imgs/箭头箭头.png"></div>' + '<div class="col-md-1"><span>目的地</span></div>' + '<div class="col-md-2"><span>出发时</span></div>' + '<div class="col-md-2"><span>到达时</span></div>' + '<div class="col-md-1"><span>票数</span></div></div></li>';
			for (var i = 0; i < data.msg.length; i++) {
				header += '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1"><a href="#" onclick="getPlace(' + data.msg[i].tid + ')" data-toggle="tab" role="tab"><span>' + data.msg[i].tnumber + '</span></a></div>' + '<div class="col-md-1"><span>' + data.msg[i].tstart + '</span></div>' + '<div class="col-md-1"><img style="width:20px;" src="imgs/箭头箭头.png"></div>' + '<div class="col-md-1"><span>' + data.msg[i].tend + '</span></div>' + '<div class="col-md-2"><span>' + data.msg[i].tstime + '</span></div>' + '<div class="col-md-2"><span>' + data.msg[i].tetime + '</span></div>' + '<div class="col-md-1"><span>' + data.msg[i].tcount + '</span></div>' + '<div class="col-md-1" ><button  type="button" class="btn btn-danger btn-sm" style="margin-top: -4px;" onclick="deleteInfo(' + (i + 1) + ')">删除信息</button></div>' + '<div class="col-md-1" ><button  type="button" data-toggle="modal" data-target="#Update" class="btn btn-primary btn-sm" style="margin-top: -4px;" onclick="updateInfo(' + (i + 1) + ')">更新信息</button></div></div></li>'
			}
			$('ul#train').empty();
			$('ul#train').append(header);
		}
	});
}

function deleteInfo(i) {
	var tnumber = $('ul#train li').eq(i).children('div').children('div').eq(0).text();
	swal({
		title: "确定删除列车?",
		text: tnumber+"次列车一旦删除不可恢复，请慎重选择",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "强制删除",
		cancelButtonText: "取消",
		closeOnConfirm: false,
		closeOnCancel: false
	}, function(flag) {
		if (flag) {
			swal({   
			title: "请输入安全密码",   
			text: "如果密码输入错误,你的IP将被服务器锁定",   
			type: "input",   
			showCancelButton: true,   
			closeOnConfirm: false,
			inputType:"password",   
			animation: "slide-from-top",   
			inputPlaceholder: "输入密码" }, 
			function(inputValue){   
				if (inputValue === false){
					swal("警告信息","出现异常");
				}      
				else if (inputValue != "") {     
					   $.ajax({
							type: "POST",
							url: "/deletecar",
							data: {
								tnumber: tnumber,
								password:inputValue
							},
							dataType: 'json',
							success: function(data) {
								if (data.msg == "删除成功") {
									swal("删除成功", "", "success");
									gettrain();
								} else if(data.msg=="你的IP已被服务器记录,请谨慎使用"){
									swal("输入错误,你的IP已被服务器记录,请谨慎使用!", "","warning");
								}else if(data.msg=="删除失败,请速与管理员联系!"){
									swal(data.msg,"","error");
								}else{
									swal(data.msg,"","warning");
								}
							}
						});
				}else if(inputValue==""){
					swal.showInputError("请输入安全密码");
				}else{
					swal("警告信息","系统出现异常");
				}      
			});
			
		} else {
			swal("已取消", "已取消删除" + tnumber + "次列车", "warning");
		}
	});

};

function getPlace(i) {
	$.ajax({
		type: "POST",
		url: "/getplace",
		data: {
			tid: i
		},
		dataType: "json",
		success: function(data) {
			if (data.msg == "服务器错误") {
				swal("查询错误", "", "success");
			} else {
				if (data.msg.length == 0) {
					$('ul#train').empty();
					appendFoot(data.tnumber, i);
				} else {
					var header = '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1">列车</div>' + '<div class="col-md-1"><span>站点</span></div>' + '<div class="col-md-2"><span>价格</span></div>' + '<div class="col-md-3"><span>抵达时间</span></div>' + '<div class="col-md-3"><span>发车时间</span></div>';
					for (j = 0; j < data.msg.length; j++) {
						header += '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-1"><span>' + data.tnumber + '</span></div>' + '<div class="col-md-1"><span>' + data.msg[j].cpname + '</span></div>' + '<div class="col-md-2"><span>' + data.msg[j].cprice + '</span></div>' + '<div class="col-md-3"><span>' + data.msg[j].atime + '</span></div>' + '<div class="col-md-3"><span>' + data.msg[j].stime + '</span></div>' + '<div class="col-md-2" ><button  type="button" data-toggle="modal" data-target="#updateplace" class="btn btn-primary btn-sm" style="margin-top: -4px;" onclick="updateplaceInfo(' + (j + 1) + ',' + data.msg[j].cpid + ',' + i + ')">更新信息</button></div></div></li>';
					}
					$('ul#train').empty();
					$('ul#train').append(header);
					appendFoot(data.tnumber, i);
				}
			}
		}
	});

}

function appendFoot(tnumber, tid) {
	var header = '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-12"><button data-toggle="modal" data-target="#addplace" class="btn btn-primary btn-block" onclick="addPlace(\'' + tnumber + '\'' + ',' + tid + ')">添加站点</button></div></div>' + '<li class="list-group-item">' + '<div class="row">' + '<div class="col-md-12"><button class="btn btn-danger btn-block" onclick="startTrain(\'' + tnumber + '\'' + ',' + tid + ')">开启列车</button></div></div>';
	$('ul#train').append(header);
}

function addPlace(tnumber, tid) {
	$("#tnumber3").text(tnumber);
	$("#tid").val(tid);
}

function updateplaceInfo(i, cpid, tid) {
	var tnumber = $('ul#train li').eq(i).children('div').children('div').eq(0).text();
	var cpname = $('ul#train li').eq(i).children('div').children('div').eq(1).text();
	var cprice = $('ul#train li').eq(i).children('div').children('div').eq(2).text();
	var atime = $('ul#train li').eq(i).children('div').children('div').eq(3).text();
	var stime = $('ul#train li').eq(i).children('div').children('div').eq(4).text();
	$("#tid2").val(tid);
	$("#cpid").val(cpid);
	$("#tnumber4").text(tnumber);
	$("#cpname1").val(cpname);
	$("#cprice1").val(cprice);
	$("#atime1").val(atime);
	$("#stime1").val(stime);
}

function startTrain(tnumber, tid) {
	swal({
		title: "确定开启列车?",
		text: tnumber+"次此列车一旦开启不可更改，请慎重选择",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "开启",
		cancelButtonText: "取消",
		closeOnConfirm: false,
		closeOnCancel: false
	}, function(flag) {
		if (flag) {
			$.ajax({
				type: "POST",
				url: "/starttrain",
				data: {
					tnumber: tnumber,
					tid: tid
				},
				dataType: "json",
				success: function(data) {
					if (data.msg == "开启成功") {
						swal("列车" + tnumber + "次开启成功", "", "success");
					}else if(data.msg=='已被开启'){
						swal("列车"+tnumber+'次已被开启',"","warning");
					}
					 else {
						swal("服务器消息", "开启失败");
					}
				}
			})
		} else {
			swal("已取消", "已取消开启" + tnumber + "次列车", "error");
		}
	})
}