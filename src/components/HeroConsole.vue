<script setup lang="ts">
import type { AbilIntro, HeroData, PifuIntro, Skin, ClickHero } from '@/types'
import { inject, computed, ref } from 'vue';
import MdxModal from './MdxModal.vue';
const props = defineProps<{
  skin: Skin
  clickHero: ClickHero
}>()

const skin = props.skin
const clickHero = props.clickHero
// 英雄数据
const data = inject<{ [key: string]: HeroData }>('data')

const hero = computed(() => {
  return data?.[clickHero.heroId] as HeroData
})


function jump(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.dataset.heroId) {
    clickHero.changeHero(target.dataset.heroId)
  }
}

// 计算英雄头像位置
function calc() {
  for (let i = 0; i < skin.heroArr.length; i++) {
    const hi = skin.heroArr[i] as string[]
    for (let j = 0; j < hi.length; j++) {
      if (hi[j] === hero.value.baseUnitId) {
        console.log("定位头像位置：", { i, j })
        skin.i = i
        skin.j = j
        return;
      }
    }
  }
}

const heroIntro = computed(() => {
  calc()
  // 英雄介绍
  if (hero.value.intro !== null && hero.value.intro !== undefined) {
    return {
      html: formatHtmlString(hero.value.intro),
      active: ['active']
    }
  }
  return {
    html: '',
    active: []
  }
})

interface AbilList {
  index: number
  heroId?: string
  html: string
  style: string
}
const abilIntro = computed(() => {
  // skin["heroPanelImg"] = src
  const abilList: AbilList[] = Array.from({ length: 18 }, (_, i) => {
    return {
      index: i,
      html: '',
      style: ''
    }
  })
  handleAbility(abilList)
  return abilList
})

const panelIntro = computed(() => {
  // 面板
  // "prop":"2,68,25,38",
  // "attack":"262 - 383,140,1.6",
  // "armor":"15,320",
  return handlePanel(hero.value)

})

const headIntro = computed(() => {
  return handleHead(hero.value)
})

function handleAbility(abilList: AbilList[]) {


  function addAbility(ele: number, viewData: AbilIntro | undefined, unitId: string, p1: PifuIntro | undefined, p2: PifuIntro | undefined, i: number, j: number, rate?: number) {
    if (viewData) {
      // ele.innerHTML += `<div class="console-info">${formatHtmlString(viewData.desc)}</div>`
      // ele.style = skin.calcAbility(unitId, p1, p2, i, j)

      abilList[ele] = {
        index: ele,
        html: formatHtmlString(viewData.desc),
        style: skin.calcAbility(unitId, p1, p2, i, j, rate)
      }
    }
  }
  function addPifu(ele: number, viewData: PifuIntro | undefined, unitId: string, p1: PifuIntro | undefined, p2: PifuIntro | undefined, i: number, j: number) {
    if (viewData) {
      abilList[ele] = {
        index: ele,
        heroId: viewData.unitId,
        html: formatHtmlString(viewData.desc),
        style: skin.calcAbility(unitId, p1, p2, i, j)
      }
    }
  }
  // 技能
  addPifu(0, hero.value.p1, hero.value.unitId, hero.value.p1, hero.value.p2, 0, 0)
  addPifu(1, hero.value.p2, hero.value.unitId, hero.value.p1, hero.value.p2, 1, 0)
  // 梦的第2排技能
  addAbility(4, hero.value.core, hero.value.unitId, hero.value.p1, hero.value.p2, 0, 1)
  addAbility(5, hero.value.d2, hero.value.unitId, hero.value.p1, hero.value.p2, 1, 1)
  addAbility(7, hero.value.t2, hero.value.unitId, hero.value.p1, hero.value.p2, 3, 1)

  // x7的第2排技能
  addAbility(6, hero.value.t, hero.value.unitId, hero.value.p1, hero.value.p2, 2, 1)
  addAbility(7, hero.value.d, hero.value.unitId, hero.value.p1, hero.value.p2, 3, 1)

  addAbility(8, hero.value.q, hero.value.unitId, hero.value.p1, hero.value.p2, 0, 2)
  addAbility(9, hero.value.w, hero.value.unitId, hero.value.p1, hero.value.p2, 1, 2)
  addAbility(10, hero.value.e, hero.value.unitId, hero.value.p1, hero.value.p2, 2, 2)
  addAbility(11, hero.value.r, hero.value.unitId, hero.value.p1, hero.value.p2, 3, 2)

  // // 物品
  if (hero.value.items != null) {
    for (let i = 0; i < hero.value.items.length; i++) {
      addAbility(12 + i, hero.value.items[i], hero.value.unitId, hero.value.p1, hero.value.p2, i % 2 + 4, Math.floor(i / 2), 0.68)
    }
  }
}


interface formatObj {
  str: string,
  buf: string,
  lastColor: string
}
function formatHtmlString(desc: string) {
  const strs: string[] = desc.split("|n")
  let obj: formatObj = {
    str: '',
    buf: '',
    lastColor: '|cfffff'
  }
  for (const p of strs) {
    obj.str = p
    obj = handle(obj)
  }
  return obj.buf
}


function handle({ str, buf, lastColor }: formatObj) {

  str = str.replaceAll("/\|r\|cff/gi", "|cff")
  str = str.replaceAll("|r", "|cfffff")
  str = str.replaceAll("|R", "|cfffff")

  if (!str.startsWith("|cff")) {
    str = lastColor + str
  }

  buf += "<p>"

  const pat = /(\|cff(\w{3,6}))(.*?)(?=((\|cff)|$))/gi
  const mat = str.matchAll(pat)
  for (const match of mat) {
    lastColor = match[1] as string
    const color = match[2]
    const text = match[3]
    buf += `<span style="color:#${color}">${text}</span>`
  }

  buf += "</p>"
  return { str, buf, lastColor }
}

interface HeadIntro {
  headStyle: string,
  hpArr: string[],
}
function handleHead({ hp, baseUnitId, unitId, p1, p2 }: HeroData): HeadIntro {
  if (hp === null || hp === undefined) {
    throw 'hp is null or undefined'
  }

  console.log("设置头像", { hp, baseUnitId, unitId, p1, p2 })
  const hpArr = hp.split(",")

  return {
    hpArr,
    headStyle: skin.calcHead(unitId, p1, p2)
  }
}

interface PanelInfo {
  propernames: string,
  infopanel_level_class: string,
  primary_attribute: string,
  colon_damage: string,
  colon_armor: string,
  colon_hero_attributes: string,
  colon_strength: string,
  colon_agility: string,
  colon_intellect: string,
  colon_status: string,
  propStyle: string,
  propInfo: string,
  attackPropStyle: string,
  attackInfo: string,
  defPropStyle: string,
  defInfo: string,
  propArr: string[],
  attackArr: string[],
  armorArr: string[],
}

function handlePanel({ prop, attack, armor, name, propernames }: HeroData): PanelInfo {
  if (prop === null || prop === undefined) {
    throw 'prop is null or undefined'
  }

  const propArr = prop.split(",")
  const attackArr = attack.split(",") as string[]
  const armorArr = armor.split(",")

  console.log("1234", attackArr)
  const propIconKey = "InfoPanelIconHeroIcon" + propArr[0] as keyof Skin
  const propIcon = skin[propIconKey]
  const attackIconKey = "InfoPanelIconDamage" + (attackArr[0] as string).substring(0, 1).toUpperCase() + (attackArr[0] as string).substring(1) as keyof Skin
  const attackIcon = skin[attackIconKey]
  const armorIconKey = "InfoPanelIconArmor" + (armorArr[0] as string).substring(0, 1).toUpperCase() + (armorArr[0] as string).substring(1) as keyof Skin
  const armorIcon = skin[armorIconKey]

  propernames = formatHtmlString(propernames)
  const infopanel_level_class = formatHtmlString(skin["INFOPANEL_LEVEL_CLASS"].replace("%u", '1').replace("%s", name))
  const primary_attribute = formatHtmlString(skin["PRIMARY_ATTRIBUTE"])
  const colon_damage = formatHtmlString(skin["COLON_DAMAGE"])
  const colon_armor = formatHtmlString(skin["COLON_ARMOR"])
  const colon_hero_attributes = formatHtmlString(skin["COLON_HERO_ATTRIBUTES"])
  const colon_strength = formatHtmlString(skin["COLON_STRENGTH"])
  const colon_agility = formatHtmlString(skin["COLON_AGILITY"])
  const colon_intellect = formatHtmlString(skin["COLON_INTELLECT"])
  const colon_status = formatHtmlString(skin["COLON_STATUS"])

  // 拼接攻击护甲属性等描述字符串
  const propInfoDesc = `${skin["COLON_HERO_ATTRIBUTES"]}|n${skin["COLON_STRENGTH"]}|n${propArr[0] === '0' ? skin["PRIMARY_ATTRIBUTE"] : ""}${skin["str"]}|n${skin["COLON_AGILITY"]}|n ${propArr[0] === '1' ? skin["PRIMARY_ATTRIBUTE"] : ""}${skin["agi"]}|n${skin["COLON_INTELLECT"]}|n${propArr[0] === '2' ? skin["PRIMARY_ATTRIBUTE"] : ""}${skin["int"]}`
  const propInfo = formatHtmlString(propInfoDesc)
  const attackInfoDesc = `${skin["COLON_DAMAGE"]} ${attackArr[1]}|n${skin[("DAMAGE_" + (attackArr[0] as string).toUpperCase()) as keyof Skin]}|r|n范围： ${attackArr[2]}|n速度： |cff00ff00${((100 + Number(propArr[2]) / 5) / (100 * Number(attackArr[3]))).toFixed(3)}/sec|r|n攻击间隔： |cff00ff00${attackArr[3]} |r|n|n${skin[("DAMAGETIP_" + (attackArr[0] as string).toUpperCase()) as keyof Skin]}`
  const attackInfo = formatHtmlString(attackInfoDesc)
  const defInfoDesc = `${skin["COLON_ARMOR"]} ${armorArr[1]}|n${skin[("ARMOR_" + (armorArr[0] as string).toUpperCase()) as keyof Skin]}|r|n伤害减少：${((Number(armorArr[1]) * skin["DefenseArmor"]) * 100 / (1 + Number(armorArr[1]) * skin["DefenseArmor"])).toFixed(0)}%|r|n移动速度：${armorArr[2]}|r|n视野：${skin["view"]}|r|n|n${skin[("ARMORTIP_" + (armorArr[0] as string).toUpperCase()) as keyof Skin]}`
  const defInfo = formatHtmlString(defInfoDesc)

  return {
    propernames,
    infopanel_level_class,
    primary_attribute,
    colon_damage,
    colon_armor,
    colon_hero_attributes,
    colon_strength,
    colon_agility,
    colon_intellect,
    colon_status,
    propStyle: skin.calcProp(propArr[0] as string),
    propInfo,
    attackPropStyle: skin.calcAttack(attackArr[0] as string),
    attackInfo,
    defPropStyle: skin.calcDef(armorArr[0] as string),
    defInfo,
    propArr,
    attackArr,
    armorArr,
  }
}

const mdx = ref({
  hide: true,
  hideModal(flag: boolean) {
    this.hide = flag
  }
})
</script>
<template>
  <div class="console">
    <div class="info" :class="heroIntro.active" v-html="heroIntro.html">
    </div>
    <div class="console-head">
      <MdxModal :mdx="mdx" :skin="skin" :clickHero="clickHero" />
      <div class="head-img" :style="headIntro.headStyle" @click="mdx.hide = false">
      </div>
      <div class="head-text">
        <p class="red"><span class="left-text">{{ headIntro.hpArr[0] }}</span><span class="split-text">/</span><span
            class="right-text">{{ headIntro.hpArr[0] }}</span></p>
        <p class="blue"><span class="left-text">{{ headIntro.hpArr[1] }}</span><span class="split-text">/</span><span
            class="right-text">{{ headIntro.hpArr[1] }}</span></p>
      </div>

      <!-- <div class="head-img" style="background: url('/bilibili/hero/headimg.png') no-repeat center center / cover;">
    </div>
    <div class="head-text">
      <p class="red"><span class="left-text">744</span><span class="split-text">/</span><span
          class="right-text">744</span></p>
      <p class="blue"><span class="left-text">456</span><span class="split-text">/</span><span
          class="right-text">456</span></p>
    </div> -->
    </div>
    <div class="console-base">
      <div class="hero-propsname" v-html="panelIntro.propernames"></div>
      <div class="hero-level-name" v-html="panelIntro.infopanel_level_class"></div>
      <div class="hero-base clearfix">
        <div class="hero-prop rightfix">
          <div class="hero-prop-img" :style="panelIntro.propStyle">
            <div class="console-info" v-html="panelIntro.propInfo">
            </div>
          </div>
          <div class="hero-prop-text">
            <div v-html="panelIntro.colon_strength"></div>
            <div><span class="white">{{ panelIntro.propArr[1] }}</span><span class="green"></span></div>
            <div v-html="panelIntro.colon_agility"></div>
            <div><span class="white">{{ panelIntro.propArr[2] }}</span><span class="green"></span></div>
            <div v-html="panelIntro.colon_intellect"></div>
            <div><span class="white">{{ panelIntro.propArr[3] }}</span><span class="green"></span></div>
          </div>
        </div>
        <div class="hero-prop leftfix">
          <div class="hero-prop-img" :style="panelIntro.attackPropStyle">
            <div class="console-info" v-html="panelIntro.attackInfo">
            </div>
          </div>
          <div class="hero-prop-text">
            <div v-html="panelIntro.colon_damage"></div>
            <div><span class="white">{{ panelIntro.attackArr[1] }}</span><span class="green"></span></div>
          </div>
        </div>
        <div class="hero-prop leftfix">
          <div class="hero-prop-img" :style="panelIntro.defPropStyle">
            <div class="console-info" v-html="panelIntro.defInfo">
            </div>
          </div>
          <div class="hero-prop-text">
            <div v-html="panelIntro.colon_armor"></div>
            <div><span class="white">{{ panelIntro.armorArr[1] }}</span><span class="green"></span></div>
          </div>
        </div>
      </div>
      <div class="hero-status" v-html="panelIntro.colon_status"></div>

      <!-- <p class="hero-propsname">￥</p>
    <p class="hero-level-name"><span>等级 1 </span><span class="name">红翼天使</span></p>
    <div class="hero-base clearfix">
      <div class="hero-prop rightfix">
        <div class="hero-prop-img" style="background: url('/bilibili/hero/agi.png') no-repeat center center/contain;">
        </div>
        <div class="hero-prop-text">
          <p class="orange">力量：</p>
          <p><span class="white">32</span><span class="green"></span></p>
          <p class="orange">敏捷：</p>
          <p><span class="white">21</span><span class="green"></span></p>
          <p class="orange">智力：</p>
          <p><span class="white">14</span><span class="green"></span></p>
        </div>
      </div>
      <div class="hero-prop leftfix">
        <div class="hero-prop-img"
          style="background: url('/bilibili/hero/attack.png') no-repeat center center/contain;"></div>
        <div class="hero-prop-text">
          <p class="orange">攻击力：</p>
          <p><span class="white">81 - 103</span><span class="green"></span></p>
        </div>
      </div>
      <div class="hero-prop leftfix">
        <div class="hero-prop-img" style="background: url('/bilibili/hero/def.png') no-repeat center center/contain;">
          <div class="console-info">
          </div>
        </div>
        <div class="hero-prop-text">
          <p class="orange">护甲：</p>
          <p><span class="white">7</span><span class="green"></span></p>
        </div>
      </div>
    </div>
    <div class="hero-status">状态：</div> -->
    </div>
    <div class="console-item">
      <div :class="'console-item-' + i" v-for="i of 6" :style="abilIntro[i + 11]?.style" :key="i">
        <div class="console-info" v-html="abilIntro[i + 11]?.html"></div>
      </div>
    </div>
    <div class="console-ability" @click.prevent="jump">
      <div :class="'console-ability-' + i" v-for="i of 12" :style="abilIntro[i - 1]?.style" :key="i">
        <a v-if="abilIntro[i - 1]?.heroId" href="#" :data-hero-id="abilIntro[i - 1]?.heroId"></a>
        <div class="console-info" v-html="abilIntro[i - 1]?.html"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.loading-text {
  animation: loading 1.2s 1s linear infinite;
  font-size: 20px;
  line-height: 1em;
  color: white;
  text-align: center;

  i::before {
    content: '.';
    opacity: 0;
    animation: loading 0.3s linear infinite alternate;
  }

  i:nth-of-type(1)::before {
    animation-delay: 0s;
  }

  i:nth-of-type(2)::before {
    animation-delay: 0.3s;
  }

  i:nth-of-type(3)::before {
    animation-delay: 0.6s;
  }
}

@keyframes loading {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.console {
  position: absolute;
  right: 0;
  bottom: 0;
  /* 控制台宽高 */
  width: 1350px;

  /* transform: scale(0.9); */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  /* background-color: gray; */
  /* box-sizing: border-box;
      border: 1px solid black; */
}

/* #region 提示信息 */

.info {
  position: absolute;
  right: calc(675px * 0.7);
  bottom: calc(500px * 0.7);
  width: calc(1094px * 0.7);
  color: white;
  font-size: calc(22px * 0.7);
  line-height: 1.2em;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
}

.info p {
  height: 1em;
}

.info.active {
  opacity: 1;
}

/* #endregion */


/*  #region控制台提示信息 */
.console-info {
  position: absolute;
  right: calc(278px * 0.7);
  bottom: calc(270px * 0.7);
  width: calc(515px * 0.7);
  color: white;
  font-size: calc(22px * 0.7);
  line-height: 1.2em;
  ;
  background-color: #0d1b26;
  border: 2px solid #d2c075;
  border-radius: 5px;
  line-break: anywhere;
  padding: 10px;
  opacity: 1;
  visibility: hidden;
  z-index: 1;

  p {
    min-height: 16px;
    /* word-wrap: break-word; */
  }

  p:first-child {
    margin-bottom: 8px;
  }

  &.active {
    opacity: 1;
  }
}

/* #endregion */

/* #region物品栏 */
.console-item {
  width: calc(153px * .7);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  justify-content: center;
  padding-bottom: 1px;
  /* background-color: red; */
}

.console-item div[class^="console-item"] {
  width: calc(63px * .7);
  height: calc(61px * .7);
  /* background-color: #ccffff; */
  margin: 1px 2px;
}

.console-item div[class^="console-item-"]:hover .console-info {
  visibility: visible;
}

/* #endregion */

/* #region技能栏 */
.console-ability {
  width: calc(350px * 0.7);
  display: flex;
  flex-wrap: wrap;
  margin-right: calc(258px * 0.7);
  margin-bottom: 3px;
  justify-content: flex-end;
  align-content: flex-end;
  box-sizing: border-box;
  /* border: 1px solid green; */
  /* background-color: blue; */
}

.console-ability div[class^="console-ability-"] {
  width: 55px;
  height: 52px;
  /* background-color: #ccffff; */
  /* margin: 1px; */
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding: 1px 1px;
}

.console-ability div[class="console-ability-1"] {
  padding-top: 2px;
}

.console-ability div[class^="console-ability-"]:hover .console-info {
  visibility: visible;
}

.console .console-ability a:before {
  content: '';
  display: block;
  height: 100%;
}

/* #endregion */

/* #region 英雄基础面板 */

.console-head {
  width: 106px;
  height: 140px;
  /* background-color: yellowgreen; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.console-head .head-img {
  width: 95px;
  height: 95px;
  border-top-left-radius: 72px 45px;
  border-top-right-radius: 72px 45px;
  cursor: pointer;
}

.console-head .head-text {
  font-size: 12px;
  line-height: 17px;
  white-space: nowrap;
  user-select: none;
}

.console-head .head-text .left-text {
  text-align: right;
}

.console-head .head-text .split-text {
  display: inline-block;
  padding: 0 5px;
}

.console-head .head-text .right-text {
  text-align: left;
}

.console-head .head-text .red {
  color: red;
}

.console-head .head-text .blue {
  color: blue;
}


.console-base {
  width: 264px;
  height: 136px;
  padding: 0 15px;
  box-sizing: border-box;
  user-select: none;
  /* background-color: yellowgreen; */
}

.console-base .hero-propsname {
  color: white;
  font-size: 16px;
  text-align: center;
}

.console-base .hero-level-name {
  color: white;
  font-size: 12px;
  line-height: 1.5em;
  height: 1.5em;
  text-align: center;
  border: 1px solid orange;
  border-radius: 5px;
  transform: scale(0.96);
}

.hero-base {}

.hero-prop {
  width: 110px;
  line-height: 1em;
  margin-bottom: -3px;
}

.hero-prop::nth-child(3) {
  margin-top: 5px;
}

.hero-prop-img {
  width: 35px;
  height: 35px;
  display: inline-block;
  vertical-align: middle;
  margin: 2px;
}

.hero-prop-text {
  width: 50px;
  font-size: 12px;
  display: inline-block;
  vertical-align: top;
  color: whitesmoke;
  white-space: nowrap;
  margin-left: -6px;
  transform: scale(0.95);
}

.hero-prop:first-child .hero-prop-img,
.hero-prop:first-child .hero-prop-text {
  vertical-align: middle;
}

.hero-prop:not(:first-child) .hero-prop-text {
  padding-top: 5px;
}

.hero-prop-text p:nth-child(2n+3) {
  padding-top: 5px;
}

.hero-prop-text .green {
  color: green;
}

.hero-prop-text span[class]::before,
.hero-status span[class]::before {
  content: '';
  display: inline-block;
  width: 5px;
}

.hero-status {
  color: whitesmoke;
  font-size: 12px;
}

.hero-prop:hover .console-info {
  visibility: visible;
}

/* #endregion */
</style>
