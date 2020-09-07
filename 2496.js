var body = $response.body;

body=body.replace(/vipstatus\":\d/g,'vipstatus":1').replace(/expiration_time\":\"0000-00-00\",'expiration_time\":\"2029-05-01\"');

$done({body});
