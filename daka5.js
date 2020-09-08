/*說明：此腳本非原創，是群友分享的模板修改而來，原作者似乎叫做@ziye，如有知道的請告知我！

*微信公众号：少年歌行PRO仅对脚本进行了整理和魔改，特此说明！

仓库地址：https://github.com/sngxpro/scripts

*脚本使用说明：

配置好脚本后，微信打开对应小程序获取cookie

对应小程序的二维码见仓库的readme.md

以圈x为例

hostname= xx.cqxygzs.cn,

重写：
https:\/\/xx\.cqxygzs\.cn\/* url script-request-header https://raw.githubusercontent.com/sngxpro/scripts/master/daka5.js

task（默认设置15分钟一次，请自改喜欢的频率）
0 1/15 0-23 * * ? https://raw.githubusercontent.com/sngxpro/scripts/master/daka5.js






三，添加重写，然后打开以下对应程序，获取ck后注释掉

*/


//正文


const sy = init()//声明必须
const notifyInterval = 1; //通知开为1，常关为0
const logs = 0; // 日志开关
const jsname = '早起打卡'
const jbid =1
const sb='失败,请获取ck'

const cs = 20;//小程序打卡次数
const xj = 1;//提现标准
var tz=''

const dkurlkey = 'daka5dkurl'+jbid
const dkurl = sy.getdata(dkurlkey)


let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie()
} else {
   all()
}


 
function GetCookie() {
if ($request && $request.url.match(/i=3&/))
if ($request && $request.url.match(/action=today&contr=index/))
 {
  const dkurl =  $request.url
  sy.log(`dkurl:${dkurl}`)
  if (dkurl) sy.setdata(dkurl, dkurlkey)
  sy.msg(dkurlkey, `获取cookie: 成功🎉`, ``)
}

}
  

//异步运行


function all()

 {

   for(var i=0;i<4;i++)
 { (function(i) {
            setTimeout(function() {
    
     if(i==0) dktj(i);
else if(i==1) dkxj(i); 
else if(i==2) dktx()
else if(i==3) showmsg(i);
}, (i + 1) * 1000);
                })(i)


}}




//统计

function dktj() {
return new Promise((resolve, reject) => {

  const Tjurl = {
    url: dkurl
	 };
   sy.get(Tjurl,(error, response, data) =>{
     if(logs)sy.log(`${jsname}1统计 - data: ${data}`)
       obj = JSON.parse(data)
if(obj.status == 1 && obj.info.today.clock <  cs){tz+="[账户信息]🎉"+"\n"+
"今日已打卡"+[Number(obj.info.today.clock) +1]+"/"+cs+"次"+"余"+[Number(obj.info.today. currency)+1]+"币"+"\n"
 }else tz+="[打卡完成]"+"余"+[Number(obj.info.today. currency)+1]+"币"+"\n"


 


cstj1(obj.info.today.clock);



    resolve()
    })
   })
  }  


//次数统计


function cstj1(tjtj)
{
if (tjtj<cs)
dkdk();


}


//现金

function dkxj() {
return new Promise((resolve, reject) => {

  const Xjurl = {
    url: dkurl.replace(/action=today&contr=index/g, `action=index&contr=my`)
	 };
   sy.get(Xjurl,(error, response, data) =>{
     if(logs)sy.log(`${jsname}1现金 - data: ${data}`)
       obj = JSON.parse(data)
if(obj.status ==  1)   {




       tz +="💵现金余额"+
obj.info.member.money+"元"+"\n"
 
 }

    else tz +=sb+"\n";


xjtj1(obj.info.member.money);



    resolve()
    })
   })
  }  




//自动提现

function dktx() {
return new Promise((resolve, reject) => {

  const Txurl = {
    url: dkurl.replace(/action=today&contr=index/g, `action=withdrawals&contr=my&money=${xj}&payment_code=`)
	 };
   sy.get(Txurl,(error, response, data) =>{
     if(logs)sy.log(`${jsname}1提现 - data: ${data}`)
       obj = JSON.parse(data)
if(obj.status ==  1)   {

tz +='提现成功，成功提现'+xj+'元'+"\n"
 
 }

if(obj.status ==  2)   {

tz +='提现失败,原因:'+obj.info+"\n"
 
 }




    resolve()
    })
   })
  }  



//现金统计


function xjtj1(tjtj)
{
if (tjtj>xj)
dktx()

}



//打卡
function dkdk() {
return new Promise((resolve, reject) => {

  const Dkurl = {
    url: dkurl.replace(/action=today&contr=index/g, `action=sign&contr=clock`)
	 };
   sy.get(Dkurl,(error, response, data) =>{
     if(logs)sy.log(`${jsname}1打卡- data: ${data}`)
       obj = JSON.parse(data)

   if (obj.status==1){
tz+='[️打卡任务]:'+'打卡次数+1'+'\n'

    }
else tz +=obj.info+'\n'


    resolve()
    })
   })
  }  


function showmsg() {

console.log(tz)

if (notifyInterval==1)
sy.msg(jsname,'',tz)
}


function init() {
  isSurge = () => {
    return undefined !== this.$httpClient
  }
  isQuanX = () => {
    return undefined !== this.$task
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle = '', body = '') => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (msg) => {
    console.log(`${msg}\n`)
  }
  get = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == 'string') options = { url: options }
      options['method'] = 'GET'
      return $task.fetch(options).then(
        (response) => {
          response['status'] = response.statusCode
          callback(null, response, response.body)
        },
        (reason) => callback(reason.error, null, null)
      )
    }
    if (isSurge()) return $httpClient.get(options, callback)
  }
  post = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == 'string') options = { url: options }
      options['method'] = 'POST'
      $task.fetch(options).then(
        (response) => {
          response['status'] = response.statusCode
          callback(null, response, response.body)
        },
        (reason) => callback(reason.error, null, null)
      )
    }
    if (isSurge()) $httpClient.post(options, callback)
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
