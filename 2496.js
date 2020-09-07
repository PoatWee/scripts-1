let obj = JSON.parse($response.body);

obj.value.rules = {"expiration_time":2029-05-01,"vipstatus":1};
  
$done({body: JSON.stringify(obj)});
