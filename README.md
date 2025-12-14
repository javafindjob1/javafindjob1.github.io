## 技术

### github.io

#### 提交代码

git clone https://github.com/javafindjob1/javafindjob1.github.io
cd javafindjob1.github.io
echo "hello world" > index.html

git add --all
git commit -m "update"
git push origin main

#### 还原代码

git restore xx

#### 停止跟踪代码

```
#### 删除已提交的classes

git rm -r --cached Spring-Demo/target
git add .gitignore
git commit -m "untrack .idea+target"
git push
```



#### 设置代理

git config --global http.proxy http://localhost:10809
git config --global https.proxy http://localhost:10809

### turbo-frame

```
<!-- 主页 -->

  <script src="./js/turbo.es2017-umd.js" defer></script>

  <turbo-frame id="repo-content-turbo-frame" src="./flex/component/nav.html">
    <p>加载中...</p>
  </turbo-frame>

<!-- 导航页 -->
  <turbo-frame id="repo-content-turbo-frame">
    <style>
    </style>
    导航页
  </turbo-frame>

```

#### 禁止跳转

```
<!-- 禁止跳转 -->
<a href="" data-turbo="false"></a>
```

### js正则表达式

#### js正则表达式
```
const str = "|cffbeedc7狂战神：根据无畏跳斩的技能等级提高自身物理伤害。|r|cffbeedc7ABC"

const pat = /(\|cff\w{3,6})(.*?)(?=((\|cff)|$))/gi
const mat = str.matchAll(pat)

for (const match of mat) {
  console.log("Full match:", match[0]);
  console.log("Group 1:", match[1]);
  console.log("Group 2:", match[2]);
}
```



### vscode

#### vscode对比文件差异

ctrl + shift+g 打开源代码管理

#### live server配置项目根目录

1. vscode【设置】 
2. 搜【live server】
3. 修改 live server:settings.json
4. 重启vscode

#### 配置Java项目的JDK

```
JAVA PROJECTS 视图可以改变jdk
```



### 样式

#### 排查下面代码，超过屏幕宽度出现滚动条

width: 100%;
padding: 20px;

#### 滚动条样式

```
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar {
    position: absolute;
    right: 0;
    top: 0;
}
::-webkit-scrollbar-thumb {
    background: #b59758;
    border-radius: 5px;
}
::-webkit-scrollbar-track {
    background: 0 0;
}
```



#### transform对fixed影响

```
tranform之后，fixed 不再相对于视口
```

```
<style>
    .outer {
      width: 300px;
      height: 300px;
      background-color: gray;
      padding: 10px;
      border: 1px solid black;
      transform: scale(0.5);
    }
    .box{
      width: 90px;
      height: 90px;
    }

    .box1{
      background-color: aqua;
    }
    .box2{
      background-color: red;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .box3{
      background-color: green;
    }

    
  </style>
  <div class="outer">
    <div class="box box1">1</div>
    <div class=" box2" style="z-index:2">2</div>
    <div class=" box2">2222</div>
    <div class="box box3">3</div>
  </div>
```

#### 背景图缩小

background-size: cover | contain | 100px 100px;

```
`background: url('${this.heroPanelImg}') no-repeat -${offsetx * rate}px -${offsety * rate}px / ${this.heroPanelImgWidth * rate}px ${this.heroPanelImgHeight * rate}px`

```

#### 嵌套选择器

```
.hello {
	width: 100px;
	height: 100px;
	border: 1px solid black;
	&:before{
		content:'abc',
		display:block
	}
}
```



### aidlux

web http://192.168.2.124:8000/

shell http://192.168.2.124:9022/

#### 解决ailux被杀

```
adb 历史版本下载
https://blog.csdn.net/hyfand1/article/details/138718492

建立连接
adb devices

修复aidlux被杀的问题
adb shell "/system/bin/device_config put activity_manager max_phantom_processes 2147483647"
adb shell "/system/bin/device_config set_sync_disabled_for_tests persistent"
```



#### nginx

安装

```
nginx依赖包提前安装
sudo apt-get update
sudo apt-get install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev

nginx 安装


https://www.bilibili.com/opus/862749347993878545?from=search&spm_id_from=333.337.0.0

./configure  --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.45
```

nginx https签名

```
openssl req -newkey rsa:4096 -nodes -sha256 -keyout ca.key -x509 -days 3650 -out ca.crt
openssl req -newkey rsa:4096 -nodes -sha256 -keyout www.test.com.key -out www.test.com.csr
openssl  x509 -req -days 3650 -in www.test.com.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out www.test.com.crt
cat www.test.com.crt ca.crt > www.test.com.pem

```

#### nginx 跨域

```
    server {                                                                                            
        listen       8182 ssl;                                                                          
        server_name  localhost www.test.com;                                  
                                                                              
        ssl_certificate /usr/local/webserver/nginx/ssl/www.test.com.pem;      
        ssl_certificate_key /usr/local/webserver/nginx/ssl/www.test.com.key;   
        ssl_session_cache shared:sslcache:20m;                                                          
        ssl_session_timeout 10m;                                              
                                                                              
                                                                              
        error_page 500 502 503 504  /error.html;                              
        location = /error.html {                                              
            root /home/aidlux/javafindjob1.github.io;                         
        }                                                                     
        error_page 497  https://$http_host$uri?$args;                         
        #charset koi8-r;                                                                            
                                                                                                    
        #access_log  logs/host.access.log  main;                            
                                                                            
        location / {                                                           
            add_header 'Access-Control-Allow-Origin' '*';                                               
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';                             
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';
                                                                                                    
            if ($request_method = 'OPTIONS') {                                                      
                add_header 'Access-Control-Allow-Origin' '*';                                       
                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';                         
                add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';
                add_header 'Access-Control-Max-Age' 1728000;                                            
                add_header 'Content-Type' 'text/plain charset=UTF-8';                                   
                add_header 'Content-Length' 0;                                                          
                return 204;                                                                             
            }                                                                                           
            root   /home/aidlux/javafindjob1.github.io;                                                 
        } 
        
   }
```



#### tree

```
安装tree
apt-get install tree
tree乱码问题
echo 'export LANG=en_US.UTF-8' >> ~/.bashrc
source ~/.bashrc
```

### netty

#### websocket

传送大文本（base64图片）时，只读128Kb的问题。导致图片缺失

#### 多线程数据如何保持一致

### canvas

### 工程化

webpack

nodejs

## 建站优化

### 大图片外链

### 使用webp格式减少图片体积
```
<repositories>
  <repository>
      <id>central</id>
      <url>https://repo.maven.apache.org/maven2</url>
  </repository>
</repositories>
<!-- webp-imageio 依赖 -->
<dependency>
    <groupId>org.sejda.imageio</groupId>
    <artifactId>webp-imageio</artifactId>
    <version>0.1.6</version>
</dependency>

ImageIO.read ImageIo.write
```



### 使用 UglifyJS压缩js文件
npm install -g uglify-js
uglifyjs input.js -o output.min.js







## 功能

### 在线象棋对弈

### 梦批添加声带

#### 选择英雄时

#### 查看技能时

### 英雄列表
war3map.j
找到所有英雄皮肤额外的技能数据
找到所有英雄的变量map
找到所有英雄大招
找到所有英雄天赋
找到所有英雄简介
  红翼天使 E021
"|cffffcc00红翼天使【布莱恩】|r

单体打击能力|cffff0303★★★☆|r
群体打击能力|cffff0303★★★★|r
战场生存能力|cffff0303★★★★|r
战技战术能力|cffff0303★★★☆|r

|cffffcc00英雄技能|r
赤霞羽刃，夕影之舞，炎之理，神族护盾，|cffff0000神凰朝宗|r

|cffffcc00英雄介绍|r
神界九大持翼天使之一，使用炽热的火焰软剑扫荡敌人，神界两任圣十字天使都与她有密切关系。"


<p><span style="color:### ffcc00">红翼天使【布莱恩】</span></p>
<br>
<p>单体打击能力<span style="color:### ff0303">★★★☆</span></p>
<p>群体打击能力<span style="color:### ff0303">★★★★</span></p>
<p>战场生存能力<span style="color:### ff0303">★★★★</span></p>
<p>战技战术能力<span style="color:### ff0303">★★★☆</span></p>
<br>
<p><span style="color:### ffcc00">英雄技能</span></p>
<p>赤霞羽刃，夕影之舞，炎之理，神族护盾，<span style="color:### ff0000">神凰朝宗</span></p>
<br>
<p><span style="color:### ffcc00">英雄介绍</span></p>
<p>神界九大持翼天使之一，使用炽热的火焰软剑扫荡敌人，神界两任圣十字天使都与她有密切关系。</p>

var data = {
  E018:{
    原皮:{
      Q:{
        img:"",
        desc: ""
      },
      W:{
        img:"",
        desc: ""
      },
      E:{
        img:"",
        desc: ""
      },
      R:{
        img:"",
        desc: ""
      },
      T:{
        img:"",
        desc: ""
      },
    },
    皮肤1:{
      Q:{
        img:"",
        desc: ""
      },
      W:{
        img:"",
        desc: ""
      },
      E:{
        img:"",
        desc: ""
      },
      R:{
        img:"",
        desc: ""
      },
      T:{
        img:"",
        desc: ""
      },
    },
    皮肤2:{
      Q:{
        img:"",
        desc: ""
      },
      W:{
        img:"",
        desc: ""
      },
      E:{
        img:"",
        desc: ""
      },
      R:{
        img:"",
        desc: ""
      },
      T:{
        img:"",
        desc: ""
      },
    }，
    天赋:{
      img:"",
      desc: ""
    },
    英雄介绍:"desc"
  },
}


items:[
  {
    img:"",
    desc: "",
    index:1,
  }, {
    img:"",
    desc: "",
    index:2,
  }
],
皮肤:[
  {
    img:"",
    desc:"",
    uid:"",
    index:1,
  },{
    img:"",
    desc:"",
    uid:"",
    index:2,
  },{
    img:"",
    desc:"",
    uid:"",
    index:3,
  }
]
ability:[
  {
    img:"",
    desc:"",
    index:6,
  },
  {
    img:"",
    desc:"",
    index:7,
  },
  {
    img:"",
    desc:"",
    index:9,
  },
  {
    img:"",
    desc:"",
    index:10,
  },
  {
    img:"",
    desc:"",
    index:11,
  },
  {
    img:"",
    desc:"",
    index:12,
  }
],
intro:"desc"


unit.ini
找到所有英雄的基础属性
找到所有英雄的护甲
ability.ini
找到所有英雄的技能描述、图标
  heroAbilList = "A05Z,A0EW,A0EZ,A0F0"
  E
  12 = "|cffccffff类型：|r|cffffcc99物理伤害、分身|n|r|cffccffff属性：|r|cffffcc99攻击力|n|r|cffccffff|n红翼天使在附近敌人身上创造|r|cffffce00分身|r|cffccffff进行攻击，分身拥有本体|r|cffffce0078%攻击力，|r|cffccffff额外|r|cffffce0060%攻击速度，|r|cffccffff且无法控制，但也不会受到伤害。最多制造|r|cffffcc002个|r|cffccffff分身|n|r|cffffce00持续5秒|r",
  W
  12 = "|cffccffff类型：|r|cffffcc99魔法伤害|n|r|cffccffff属性：|r|cffffcc99敏捷|r|n|n|cffccffff红翼天使向四周敌人发射火焰箭矢，造成|r|cffffce002400+敏捷x26|r|cffccffff的伤害，满足以下条件则会追加发动一次，追加后伤害会有所减弱。|n|r|cffff99001.附近只有一个敌人|n2.自身生命值低于20%|n3.附近存在暗属性BOSS或精英怪|r",
  R
  12 = "|cffccffff类型：|r|cffffcc99增益、魔法伤害（被动）|n|r|cffccffff属性：|r|cffffcc99敏捷|n|r|n|cffccffff红翼天使普通攻击有|r|cffffce0020%|r|cffccffff几率造成|r|cffffce001200+敏捷x14|r|cffccffff的火焰效果，并且夕影之舞的幻象也能触发火焰效果。|r",
  F
  12 = "|cffccffff类型：|r|cffffcc99护盾（被动）|n|r|cffccffff|n红翼天使发动技能时，可形成一个|r|cffffce002500点|r|cffccffff生命值的护盾，护盾可完全抵御伤害。以下情况可增加护盾强度：|n|r|cffffcc991.追加的赤霞羽刃，每次增加20%护盾强度|n2.本体或幻象打出的炎之理，增加10%护盾强度|r",


<p><span style="color:### ccffff">类型：</span><span style="color:### ffcc99">物理伤害、分身<span></p>
<p><span style="color:### ccffff">属性：</span><span style="color:### ffcc99">攻击力</span></p>
<br>
<p><span style="color:### ccffff">红翼天使在附近敌人身上创造</span><span style="color:### ffce00">分身</span><span style="color:### ccffff">进行攻击，分身拥有本体</span><span style="color:### ffce00">78%攻击力，</span><span style="color:### ccffff">额外</span><span style="color:### ffce00">60%攻击速度，</span><span style="color:### ccffff">且无法控制，但也不会受到伤害。最多制造</span><span style="color:### ffcc00">2个</span><span style="color:### ccffff">分身</span></p>
<p><span style="color:### ffce00">持续5秒<span></p>

### 控制台面版

#### 技能介绍

ability.ini 技能

#### 皮肤介绍

unit.ini  单位

#### 面板介绍

table/misc.ini 游戏平衡常数

map/war3mapextra.txt 面板图标路径

#### 头像

游戏内截图

### 物品列表

item.ini
所有物品的描述、图标、类型

### 地图更新日志

https://map-api.kkdzpt.com/api/v3/map/changelogs?mapId=193337&start=0&limit=5
https://kk.kkdzpt.com/map/193337/detail

```
// 发送网络请求并解析 JSON 数据
function fetchData(url, handle) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // 处理 JSON 数据
      handle(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
```



### 羁绊系统

[岩之巨人:[猫灵、雷魂]]
[]

### 往世记忆 >5

将需求当做p1



### 英雄详情转冰球帖子

在技能栏

单独开一个窗口

### LOL资料中心
攻略中心

最佳双排
英雄列表
  位置 上单 打野 中路 下路  辅助
  定位 战士 法师 刺客 坦克 射手 辅助
  列表图文


  英雄详情
    总览 大神攻略 英雄克制 装备推荐 符文推荐 数据曲线 皮肤详情
   法师


   辅助
   技能描述
   难度
   胜率
   搬率 
   登场率
   最佳双排

   符文推荐  
   出门装推荐
   核心装推荐
   鞋子推荐
   其余装备
   登场率趋势 
   胜率随版本趋势
   胜率随时间趋势
   胜率随所玩局数

   召唤师技能
   推荐技能加点

   优势对线 劣势对线


装备列表  品质（普通史诗传说） 类型（防具武器鞋子）
          更新提示 
     焦点事件 详情 合成路径 调整内容
     点击事件
     
趣味数据 上单 打野 中路 下路 辅助  日周月 玩家等级



## 西7

处理幸运女神
1. unit.ini
    复制H01H 为H02H
2. ability.ini 
    PASBTNHero_MSY.blp -> PASBTNHero_MSY2.blp
3. 新增一个war3imported/PASBTNHero_MSY2.blp
