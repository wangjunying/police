var DB_CONFIG = require("../dbconfig");
var mysql = require('mysql');
var crypto = require('crypto');
var Sync = require('sync');
var User = require('../controller/userController')

var conn = mysql.createConnection({
    host: DB_CONFIG.host,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    port: DB_CONFIG.port
});
conn.connect();

//添加车辆
function addCar(req, res) {
    var query = req.body;
    try {
        check(query, res, function() {
            var NO = query.NO || -1;
            var type = parseInt(query.type) || 1;
            if (NO == -1) {
                errorHandler(res, "params error");
            } else {
                conn.query("insert into car(NO,type)values(?,?)", [NO, type],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            errorHandler(res, err.message);
                        } else {
                            res.json({ "code": 200, "data": { "status": "success", "error": "success" } });
                        }
                    });
            }
        });
    } catch (e) {
        errorHandler(res, "unknown error")
    }
}

//删除车辆
function delCar(req, res) {
    var query = req.body;
    try {
        check(query, res, function() {
            var Id = query.Id || -1;
            if (Id == -1) {
                errorHandler(res, "params error");
            } else {
                conn.query("delete from car where Id=?", [Id],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            errorHandler(res, err.message);
                        } else {
                            res.json({ "code": 200, "data": { "status": "success", "error": "success" } });
                        }
                    });
            }
        });
    } catch (e) {
        errorHandler(res, "unknown error");
    }
}

//分类分页获取车辆或获取全部车辆
function getCar(req, res) {
    var query = req.body;
    try {
        check(query, res, function() {
            var page = parseInt(query.page) || -1;
            var pageSize = parseInt(query.pageSize) || 20;
            var type = parseInt(query.type) || 1;
            if (page == -1) {
                conn.query("select Id,NO from car where type=? order by Id desc", [type],
                    function(err, data) {
                        if (err) {
                            console.log(err);
                            errorHandler(res, err.message);
                        } else {
                            ret = {};
                            ret["status"] = "success";
                            ret["data"] = data;
                            res.json({ "code": 200, "data": ret });
                        }
                    });
            } else {
                if (page < 1) {
                    page = 1;
                }
                var start = (page - 1) * pageSize;
                conn.query("select Id,NO from car where type=? order by Id " +
                    "desc limit ?,?", [type, start, pageSize],
                    function(err, data) {
                        if (err) {
                            console.log(err);
                            errorHandler(res, err.message);
                        } else {
                            ret = {};
                            ret["status"] = "success";
                            ret["data"] = data;
                            res.json({ "code": 200, "data": ret });
                        }
                    });
            }
        });
    } catch (e) {
        errorHandler(res, "unknown error");
    }
}

//获取单个车辆信息
function getSingleCarInfo(req, res) {
    var query = req.body;
    try {
        check(query, res, function() {
            var Id = query.Id || -1;
            if (Id == -1) {
                errorHandler(res, "params error");
            } else {
                conn.query("select * from car where Id=?", [Id],
                    function(err, data) {
                        if (err) {
                            console.log(err);
                            errorHandler(res, err.message);
                        } else {
                            ret = {};
                            ret["status"] = "success";
                            ret["data"] = data;
                            res.json({ "code": 200, "data": ret });
                        }
                    });
            }
        });
    } catch (e) {
        errorHandler(res, "unknown error");
    }
}

//按车牌号搜索车辆
function searchCar(req, res) {
    var query = req.body;
    try {
        check(query, res, function() {
            var keyword = query.keyword;
            conn.query("select * from car where NO like " +
                conn.escape('%' + keyword + '%') +
                " order by Id desc", [keyword],
                function(err, data) {
                	if (err) {
                        console.log(err);
                        errorHandler(res, err.message);
                    } else {
                        ret = {};
                        ret["status"] = "success";
                        ret["data"] = data;
                        res.json({ "code": 200, "data": ret });
                    }
                });
        });
    } catch (e) {
        errorHandler(res, "unknown error");
    }
}

//获取车辆当前位置
function getCarPosition(req,res){
	var query = req.body;
	try{
		check(query,res,function(){
			var Id = query.Id || -1;
			if (Id == -1) {
                errorHandler(res, "params error");
            } else {
            	//需要对接接口,自己获取不了
            	var centerX = 12953017.52769;
            	var centerY = 4856608.65391;
            	var data = {longitude:centerX+Math.random(),
            				latitude:centerY+Math.random()
            				};
            	var ret = {};
                ret["status"] = "success";
                ret["data"] = data;
                res.json({ "code": 200, "data": ret });
            }
		});
	} catch(e) {
		errorHandler(res, "unknown error");	
	}
}

//获取车辆轨迹
function getCarTrack(req,res){
	var query = req.body;
	try{
		check(query,res,function(){
			var Id = query.Id || -1;
			if (Id == -1) {
                errorHandler(res, "params error");
            } else {
            	var centerX = 12953877.20796;
            	var centerY = 4829762.47364;
            	var track = [];
            	for(var i=0; i<50; i++){
            		var x = centerX + Math.random()*200;
            		var y = centerY + Math.random()*200;
            		track.push({"longitude":x,"latitude":y});
            	}
            	var ret = {};
                ret["status"] = "success";
                ret["data"] = track;
                res.json({ "code": 200, "data": ret });
            }
		});
	} catch(e) {
		errorHandler(res, "unknown error");	
	}
}



// function test(req,res){
// 	var centerX = 12953877.20796;
//     var centerY = 4829762.47364;
// 	var sql = "insert into camera (cam_no, cam_name, cam_loc_lan, cam_loc_lon,cam_sta, cam_desc, cam_addr, user_id, addtime, uptime) ";
//     sql += "values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//     var i = parseInt(Math.random()*1000000)+"";
//     conn.query(sql,[i,"camera_"+i,centerY+Math.random()*1000,centerX+Math.random()*1000,1,"","test.addr",7,new Date().getTime(),""],function(err,result){
//     	res.json("ahaahhaha");
//     });
// }

/*******************************************************
 ***********************公用部分***************************
 ********************************************************/
function errorHandler(res, desc) {
    res.json({ "code": 300, "data": { "status": "fail", "error": desc } });
}

function check(query, res, callback) {
    var mobile = query.mobile;
    var token = query.token;
    User.checkMobile2Token(mobile, token, function(result) {
        if (result) {
            callback();
        } else {
            errorHandler(res, "mobile not match token");
        }
    });
}

exports.addCar = addCar;
exports.delCar = delCar;
exports.getCar = getCar;
exports.getSingleCarInfo = getSingleCarInfo;
exports.searchCar = searchCar;
exports.getCarPosition = getCarPosition;
exports.getCarTrack = getCarTrack;
// exports.test = test;


