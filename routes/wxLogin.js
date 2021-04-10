const Router = require('koa-router');
const router = new Router({prefix: '/wx'});

var AppID = 'wx3f32158413714763';
var AppSecret = '04d6889e2d80b47e619e6c196ccfdd83';


router.get('/wechat_login', function(req,res, next){
    // 第一步：用户同意授权，获取code
    var to = 'get_wx_access_token';
    // 这是编码后的地址
    var return_uri = 'http://shutiaogege.natapp1.cc'+to;  
    var scope = 'snsapi_userinfo';
    router.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=STATE#wechat_redirect');

});

router.get('/get_wx_access_token', function(req,res, next){
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {   
            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
        },
        function(error, response, body){
            if(response.statusCode == 200){
                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                //console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;
                request.get(
                    {
                        url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
                    },
                    function(error, response, body){
                        if(response.statusCode == 200){
                            // 第四步：根据获取的用户信息进行对应操作
                            var userinfo = JSON.parse(body);
                            console.log('获取微信信息成功！');
                            //其实，到这就写完了，你应该拿到微信信息以后去干该干的事情，比如对比数据库该用户有没有关联过你们的数据库，如果没有就让用户关联....等等等...
                            // 小测试，实际应用中，可以由此创建一个帐户
                            res.send("\
                                <h1>"+userinfo.nickname+" 的个人信息</h1>\
                                <p><img src='"+userinfo.headimgurl+"' /></p>\
                                <p>"+userinfo.city+"，"+userinfo.province+"，"+userinfo.country+"</p>\
                                <p>openid: "+userinfo.openid+"</p>\
                            ");
                        }else{
                            console.log(response.statusCode);
                        }
                    }
                );
            }else{
                console.log(response.statusCode);
            }
        }
    );
})



module.exports = router


