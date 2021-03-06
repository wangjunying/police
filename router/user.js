var server = global.server
var User = require('../controller/userController')

//注册新账号
server.post("/user/register",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.register(req,res);
	return next();
});

//登录
server.post("/user/login",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.login(req,res);
	return next();
});

//使用token登录
server.post("/user/loginWithToken",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.loginWithToken(req,res);
	return next();
});

//退出登录
server.post("/user/logout",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.logout(req,res);
	return next();
});

//分页获取用户
server.post("/user/getUsers",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.getUsers(req,res);
	return next();
});

//获取单个用户信息
server.post("/user/getSingleUserInfo",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.getSingleUserInfo(req,res);
	return next();
});

//根据手机号码获取单个用户信息
server.post("/user/getSingleUserInfoByMobile",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.getSingleUserInfoByMobile(req,res);
	return next();
});

//根据用户名模糊查询用户信息
server.post("/user/getUsersByKeyword",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.getUsersByKeyword(req,res);
	return next();
});

//根据Id删除管理员用户
server.post("/user/delPCUser",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.delPCUser(req,res);
	return next();
});

//添加app用户
server.post("/user/addMobileUser",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.addMobileUser(req,res);
	return next();
});

//删除app用户
server.post("/user/delMobileUser",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.delMobileUser(req,res);
	return next();
});

//分页获取app用户
server.post("/user/getMobileUsers",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.getMobileUsers(req,res);
	return next();
});

//判断用户是否拥有权限
server.post("/user/checkUserPermission",function(req,res,next){
	res.setHeader("Access-Control-Allow-Origin","*");
	User.checkMobile2TokenWithPermissionFrontEnd(req,res);
	return next();
});

module.exports = server;