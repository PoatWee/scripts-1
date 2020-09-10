/*

Quantumult X 脚本:

[rewrite_local]
# 月光加速器
#app下载地址：https://www.newmoonfast2020.xyz
^https:\/\/moon\.mxnode\.cn\/light\/dispatch\/v1\?cmd\=status\&.+ url script-response-body https://raw.githubusercontent.com/sngxpro/scripts/master/yg.js

[mitm]
hostname = buy.itunes.apple.com,

*/

let obj = JSON.parse($response.body);
obj = {
  "status" : "ok",
  "tokens" : null,
  "reason" : "",
  "token" : {
    "device" : "",
    "uid" : 0,
    "remote" : "",
    "id" : 0,
    "app" : "",
    "platform" : "",
    "initime" : "",
    "token" : ""
  },
  "user" : {
    "score" : 1,
    "allflow" : 2147483648,
    "uid" : 5674497,
    "ID" : 274769,
    "initime" : "2020-08-27 19:55:39",
    "channel" : "",
    "flowdown" : 9999999,
    "endtime" : "2030-08-27 23:59:02",
    "source" : 1,
    "shared" : 1,
    "access" : {
      "paytime" : "2020-08-27 00:00:00",
      "payamount" : "{\"rmb\":1}",
      "state" : "view",
      "uid" : 19,
      "ID" : 68,
      "payno" : "1",
      "link" : 3,
      "time" : 518400,
      "desc" : "{}",
      "level" : 26,
      "app" : "moon",
      "price" : "{\"rmb\":1}",
      "apid" : 1,
      "end" : "2030-08-28 00:00:00",
      "flow" : 21990232555520,
      "auid" : 8823801065666192365,
      "name" : "{\"cn\":\"vip\"}"
    },
    "app" : "moon",
    "password" : "",
    "platform" : "web",
    "flowup" : 1,
    "remain" : "999.0",
    "device" : "",
    "auid" : 8823801065666192365,
    "name" : "tdawei9@163.com"
  }
};

$done({body: JSON.stringify(obj)});
