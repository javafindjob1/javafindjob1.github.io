
#步骤
git clone https://github.com/javafindjob1/javafindjob1.github.io
cd javafindjob1.github.io
echo "hello world" > index.html

git add --all
git commit -m "update"
git push origin main

git config --global http.proxy http://localhost:10809
git config --global https.proxy http://localhost:10809

#turbo-frame使用
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


#英雄列表
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


<p><span style="color:#ffcc00">红翼天使【布莱恩】</span></p>
<br>
<p>单体打击能力<span style="color:#ff0303">★★★☆</span></p>
<p>群体打击能力<span style="color:#ff0303">★★★★</span></p>
<p>战场生存能力<span style="color:#ff0303">★★★★</span></p>
<p>战技战术能力<span style="color:#ff0303">★★★☆</span></p>
<br>
<p><span style="color:#ffcc00">英雄技能</span></p>
<p>赤霞羽刃，夕影之舞，炎之理，神族护盾，<span style="color:#ff0000">神凰朝宗</span></p>
<br>
<p><span style="color:#ffcc00">英雄介绍</span></p>
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


<p><span style="color:#ccffff">类型：</span><span style="color:#ffcc99">物理伤害、分身<span></p>
<p><span style="color:#ccffff">属性：</span><span style="color:#ffcc99">攻击力</span></p>
<br>
<p><span style="color:#ccffff">红翼天使在附近敌人身上创造</span><span style="color:#ffce00">分身</span><span style="color:#ccffff">进行攻击，分身拥有本体</span><span style="color:#ffce00">78%攻击力，</span><span style="color:#ccffff">额外</span><span style="color:#ffce00">60%攻击速度，</span><span style="color:#ccffff">且无法控制，但也不会受到伤害。最多制造</span><span style="color:#ffcc00">2个</span><span style="color:#ccffff">分身</span></p>
<p><span style="color:#ffce00">持续5秒<span></p>
  

#物品列表
item.ini
所有物品的描述、图标、类型



#LOL资料中心
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

