

if (typeof (WebSocket) == "undefined") {
    alert("您的浏览器不支持WebSocket");
} else{
    console.log("您的浏览器支持WebSocket");

    var socket={};
    socket.send = function(data){

    };

    // 避免重复连接
    var lockReconnect = false;
    var socket;
    // 定时任务
    var tt;
    // 控制[观战、选红、选黑]等操作时，推送了最新的消息导致不一致
    var MESSAGE_ORDER_SUSPENDED;
    var MESSAGE_ORDER_LAST;
    function createWebSocket() {
        try {
            var deskId = parseInt(com.getRadioValue("loc"), 10) || 1;
            //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接   nginx实现http-> https ws -> wss的转换
            var url = "ws://"+document.location.host+"/websocket/"+deskId;
            // var url = "ws://localhost:8080/websocket/1234";
            socket = new WebSocket(url);
        
            lockReconnect = false;
            init();
        } catch(e) {
            console.log('catch' + e);
            reconnect();
        }
    }
    function init() {
        //打开事件
        socket.onopen = function() {
            console.log("Socket 已打开");
        };
        //获得消息事件
        socket.onmessage = function(msg, flag) {
            console.log(msg)
            //发现消息进入    开始处理前端触发逻辑
            console.log("接受信息：" + msg.data.substring(0,100));
            console.log("我的阵营：" + com.my);

            if("连接成功" == msg.data){
                return;
            }else if("重新开始" == msg.data){
                play.isPlay=true ;
                play.init( play.depth,play.nowMap );
                return;
            }

            var messageOrder = msg.data.match(/^\d+::/);
            if(!messageOrder){
                l( "未知：" + msg.data);
                return;
            }

            if(syncing){
                if(!flag){
                    MESSAGE_ORDER_SUSPENDED = messageOrder;
                    console.log("追赶中，最新的MESSAGE_ORDER：" + MESSAGE_ORDER);
                    return;
                }
            }
            MESSAGE_ORDER_LAST = messageOrder;

            var message = msg.data.split("::", 2)[1];

            if(message.startsWith("消息")){
                l(message);
                return;
            }
            
            if(message.match(/^(-)?\d{5}$/)){
                var t=1;
                var pace=message.split("").slice(1);
                if("-" == message.split("").slice(0,1)){
                    t = -1;
                    pace = message.split("").slice(2);

                }

                var arr = pace;
                if(com.my==-1){
                    //对于黑方选手，需要变换坐标系
                    arr[0]=8-pace[0];
                    arr[1]=9-pace[1];
                    arr[2]=8-pace[2];
                    arr[3]=9-pace[3];
                }else{
                    arr[0]=pace[0]-0;
                    arr[1]=pace[1]-0;
                    arr[2]=pace[2]-0;
                    arr[3]=pace[3]-0;
                }
                
                /* 
                接受其他人走的棋，但是如果自己走过的棋，收到消息通知后，再次移动会导致错误，不会造成影响
                common.js:435 Uncaught TypeError: Cannot read properties of undefined (reading 'text')
                    at com.moveStep (common.js:435:10)
                    at play.AIPlay (play.js:282:8)
                    at socket.onmessage (socket.js:61:26)
                */
               console.log(arr)
                play.AIPlay(arr);
            }else{
                l( "未知：" + msg.data);
                return;
            }
        };
        //关闭事件
        socket.onclose = function() {
            // alert("Socket已关闭");
            reconnect();
        };
        //发生了错误事件
        socket.onerror = function() {
            // alert("Socket发生了错误");
            //此时可以尝试刷新页面
        };
    }

    function reconnect() {
        console.log("重新连接，本次是否禁止："+ lockReconnect)
        if(lockReconnect) {
            return;
        };
        lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多，  有定时任务 先取消再设置
        tt && clearTimeout(tt);
        tt = setTimeout(function () {
            createWebSocket();
            lockReconnect = false;
        }, 2000);
    }

    function send(message){
        socket.send(message);
    }

    function closeWebSocket() {
        console.log("关闭连接")
        try{
            // 防止断线重连
            lockReconnect = true;
            socket && socket.close();
        }catch(e){
            console.log(e)
        }
        console.log("模拟socket")
        socket = {
            send: function(msg){
                console.log("模拟发布消息:" + msg);
            },
            close: function(){
                console.log("模拟关闭socket");
            }

        }
    }
}

function subfun(){
    var name = "红方";
    if(com.my == -1){
        name = "黑方";
    }else if(com.my == 0){
        name = "观众";
    }
    var val = document.getElementById("message");

    if(val.innerHTML == ''){
        com.get('message').focus();
    }else{
        console.log(val.innerHTML)
        send("消息["+name+"]："+ val.innerHTML);
        val.innerHTML = ""
    }

    return false;
}



