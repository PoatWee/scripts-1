/*
#基于jungegeCN脚本修改

# by微信公众号：少年歌行PRO 2020/9/4 更新
# 电报资源发布群（禁言纯净）@shao66 
# 电报水友交流群（资源同步）@sngxpro
# 电报私聊 @shaogebot


圈X：
https:\/\/api1000\.cvxia\.com\/(user\/info|mov\/browse2*) url script-response-body https://raw.githubusercontent.com/JungegeCN/JGG/master/hgsp.js

MITM = api1000.cvxia.com
*/

var body = $response.body;

body=body.replace(/vipLogo\":\d/g,'vipLogo":4').replace(/gender\":(\-|\+?)\d+/g,'gender":1').replace(/isPaid\":\d+/g,'isPaid":1').replace(/supUserId\":\d+/g,'supUserId":0').replace(/hasBuy\":\w+/g,'hasBuy":true').replace(/vipEndDate\":\"(.*?)\"/g,'vipEndDate":\"2222-02-22\"').replace(/phone\":\"(.*?)\"/g,'phone":\"JungegeCN\"').replace(/userCls\":\d+/g,'userCls":2').replace(/isExpired\":\d+/g,'isExpired":1');

$done({body});
