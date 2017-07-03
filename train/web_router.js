var express = require("express");
var router = express.Router();
var userCtrl = require('./Controller/UserCtrl');
var adminCtrl = require('./Controller/AdminCtrl');
var trainCtrl = require('./Controller/TrainCtrl');
var orderCtrl = require('./Controller/OrderCtrl');
//用户管理操作
router.route("/").get(userCtrl.index);
//用户登录
router.route("/userlogin").get(userCtrl.login).post(userCtrl.userLogin);
//用户注册
router.route("/register").post(userCtrl.register);
//主界面
router.route("/main").get(userCtrl.main);
//查询列车
router.route("/userquerybytrain").get().post(trainCtrl.queryTrain);
//管理员查询列车
router.route("/querybytrain").get().post(trainCtrl.adminqueryTrain);
//通过编号查询列车
router.route("/querybynum").get().post(trainCtrl.getTrainByNum);
//通过站点查询列车
router.route("/querybyplace").post(trainCtrl.getTrainByPlace);
//获取已完成订单
router.route("/order").get().post(orderCtrl.getOldOrder);
//获取用户信息
router.route("/userinfo").get().post(userCtrl.getUserInfo);
//获取自身用户信息
router.route("/selfinfo").get().post(userCtrl.selfInfo);
//订单信息
router.route("/orderinfo").get().post(orderCtrl.getOrder);
//创建订单
router.route("/createorder").get().post(orderCtrl.createOrder);
//router.route("/updateorder").post();
router.route("/deleteorder").post(orderCtrl.deleteOrder);
//找回密码
router.route("/findpwd").post(userCtrl.findPwd);
//登出系统
router.route("/logout").post(userCtrl.logout);
//管理员操作
router.route("/adminlogin").get(adminCtrl.admin).post(adminCtrl.adminLogin);
//管理员主界面
router.route("/adminmain").get(adminCtrl.adminMain);
//router.route("/validateuser").get().post();
//添加车辆
router.route("/addcar").post(trainCtrl.addcar);
//添加站点
router.route("/addplace").get().post(trainCtrl.addPlace);
//更新车辆
router.route("/updatecar").post(trainCtrl.updateTrain);
//更新站点
router.route("/updateplace").post(trainCtrl.updatePlace);
//删除车辆
router.route("/deletecar").post(trainCtrl.deleteTrain);
//删除站点
//router.route("/deleteplace").post();
//管理员登出系统
router.route("/adminlogout").post(adminCtrl.logout);
//管理员修改密码
router.route('/admin/updatepwd').post(adminCtrl.updatePwd);
//查询站点
router.route('/getplace').post(trainCtrl.getPlace);
//开启列车
router.route('/starttrain').post(trainCtrl.openTrain);
module.exports = router;
