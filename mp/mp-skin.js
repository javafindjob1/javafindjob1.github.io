
var mpskin = {

  InfoPanelTextFont: "Fonts\\\\ZITI1.ttf",
  InfoPanelIconHeroIcon0: "ATTshuxing-str.webp",
  InfoPanelIconHeroIcon1: "ATTshuxing-agi.webp",
  InfoPanelIconHeroIcon2: "ATTshuxing-int.webp",

  InfoPanelIconArmorDivine: "TYPElightdef.webp",
  InfoPanelIconArmorHero: "TYPEdarkdef.webp",
  InfoPanelIconArmorLarge: "TYPEwaterdef.webp",
  InfoPanelIconArmorMedium: "TYPEfiredef.webp",
  InfoPanelIconArmorNone: "TYPEstonedef.webp",
  InfoPanelIconArmorSmall: "TYPEwinddef.webp",
  InfoPanelIconDamageChaos: "TYPEwateratk.webp",
  InfoPanelIconDamageHero: "TYPEdarkatk.webp",
  InfoPanelIconDamageMagic: "TYPElightatk.webp",
  InfoPanelIconDamageMelee: "TYPEstoneatk.webp",
  InfoPanelIconDamageNormal: "TYPEstoneatk.webp",
  InfoPanelIconDamagePierce: "TYPEwindatk.webp",
  InfoPanelIconDamageSiege: "TYPEfireatk.webp",


  ARMORTIP_DIVINE: "|cfffcd211法术抗性+20%|r|n来自其他类型攻击的伤害降低为|cff00f00080%|r|n来自|cffc552e6暗属性攻击|r的伤害提高为|cfff40000130%|r",
  ARMORTIP_HERO: "|cfffcd211法术抗性+5%|r|n来自|cfff7f295光属性攻击|r的伤害提高为|cfff40000130%|r|n来自其他类型攻击的伤害为100%",
  ARMORTIP_LARGE: "|cfffcd211法术抗性+15%|r|n来自|cffda400c火属性攻击|r的伤害降低为|cff00f00080%|r|n来自|cffea9f03土属性攻击|r和|cffc552e6暗属性攻击|r的伤害提高为|cfff40000120%|r|n来自其他类型攻击的伤害为100%",
  ARMORTIP_MEDIUM: "|cfffcd211法术抗性+15%|r|n来自|cff78b58c风属性攻击|r的伤害降低为|cff00f00080%|r|n来自|cff73b4ea水属性攻击|r和|cffc552e6暗属性攻击|r的伤害提高为|cfff40000120%|r|n来自其他类型攻击的伤害为100%",
  ARMORTIP_NONE: "|cfffcd211法术抗性+15%|r|n来自|cff73b4ea水属性攻击|r的伤害降低为|cff00f00080%|r|n来自|cff78b58c风属性攻击|r和|cffc552e6暗属性攻击|r的伤害提高为|cfff40000120%|r|n来自其他类型攻击的伤害为100%",
  ARMORTIP_SMALL: "|cfffcd211法术抗性+15%|r|n来自|cffea9f03土属性攻击|r的伤害降低为|cff00f00080%|r|n来自|cffda400c火属性攻击|r和|cffc552e6暗属性攻击|r的伤害提高为|cfff40000120%|r|n来自其他类型攻击的伤害为100%",
  ARMOR_DIVINE: "种类： |cfff7f295光属性护甲|r",
  ARMOR_HERO: "种类： |cffc552e6暗属性护甲|r",
  ARMOR_LARGE: "种类： |cff73b4ea水属性护甲|r",
  ARMOR_MEDIUM: "种类： |cffda400c火属性护甲|r",
  ARMOR_NONE: "种类： |cffea9f03土属性护甲|r",
  ARMOR_SMALL: "种类： |cff78b58c风属性护甲|r",


  DAMAGETIP_CHAOS: "对|cffda400c火属性护甲|r造成|cff00f000120%|r伤害|n对|cffea9f03土属性护甲|r和|cfff7f295光属性护甲|r造成|cfff4000080%|r伤害|n对其他类型护甲造成100%伤害",
  DAMAGETIP_HERO: "对|cfff7f295光属性护甲|r造成|cff00f000130%|r伤害，对|cffc552e6暗属性护甲|r造成100%伤害，对其他类型护甲造成|cff00f000120%|r伤害",
  DAMAGETIP_MAGIC: "对|cffc552e6暗属性护甲|r造成|cff00f000130%|r伤害|n对其他类型护甲造成100%伤害|n|cfff40000无法攻击魔法免疫的单位|r",
  DAMAGETIP_MELEE: "对|cff73b4ea水属性护甲|r造成|cff00f000120%|r伤害|n对|cff78b58c风属性护甲|r和|cfff7f295光属性护甲|r造成|cfff4000080%|r伤害|n对其他类型护甲造成100%伤害",
  DAMAGETIP_PIERCE: "对|cffea9f03土属性护甲|r造成|cff00f000120%|r伤害|n对|cffda400c火属性护甲|r和|cfff7f295光属性护甲|r造成|cfff4000080%|r伤害|n对其他类型护甲造成100%伤害",
  DAMAGETIP_SIEGE: "对|cff78b58c风属性护甲|r造成|cff00f000120%|r伤害|n对|cff73b4ea水属性护甲|r和|cfff7f295光属性护甲|r造成|cfff4000080%|r伤害|n对其他类型护甲造成100%伤害",
  DAMAGE_CHAOS: "种类： |cff73b4ea水属性攻击|r",
  DAMAGE_HERO: "种类： |cffc552e6暗属性攻击|r",
  DAMAGE_MAGIC: "种类： |cfff7f295光属性攻击|r",
  DAMAGE_MELEE: "种类： |cffea9f03土属性攻击|r",
  DAMAGE_NORMAL: "种类： |cff929292土属性攻击|r",
  DAMAGE_PIERCE: "种类： |cff78b58c风属性攻击|r",
  DAMAGE_SIEGE: "种类： |cffda400c火属性攻击|r",

  INFOPANEL_LEVEL_CLASS: "|cfffcd211等级|r %u %s",
  PRIMARY_ATTRIBUTE: "|cfffcd211 - 主属性|r|n - 每点增加2的攻击力|n",
  COLON_DAMAGE: "|cfffcd211攻击力：|r",
  COLON_ARMOR: "|cfffcd211护甲：|r",
  COLON_HERO_ATTRIBUTES: "|cfffcd211英雄属性|r",
  COLON_STRENGTH: "|cfff4606c力量：|r",
  COLON_AGILITY: "|cff19caad敏捷：|r",
  COLON_INTELLECT: "|cffbee7e9智力：|r",
  COLON_STATUS: "|cfffcd211状态：|r",

  str: " - 每点增加16的生命值|n - 每5点增加1的生命值恢复速度",
  agi: " - 每20点增加1点的护甲|n - 每10点增加2%攻击速度",
  int: " - 每点增加12的魔法值|n - 主属性为智力时，每100点提高0.4%法术穿透",
  view: "视野：1500",
  DefenseArmor: "0.02",


  locArr: [
    [0, 1903],
    [0, 413, 585, 757, 956, 1159, 1347, 1523, 1903],
    [0, 360, 545, 757, 956, 1159, 1347, 1583, 1903],
    [0, 280, 545, 757, 956, 1159, 1407, 1623, 1903],
    [0, 250, 495, 757, 956, 1159, 1437, 1693, 1903],
    [0, 1903],
  ],

  heroArr: [
    [''],
    ['', 'O000', 'E011', 'E004', 'E008', 'E016', 'H00S', ''],
    ['', 'O001', 'O003', 'E015', 'H006', 'H007', 'H00H', ''],
    ['', 'O004', 'E01H', 'O00M', 'N06G', 'E014', 'H005', ''],
    ['', 'N02D', '', '', 'O002', 'H00B', 'H00U', ''],
    [''],
  ],

  heightArr: [0, 50, 201, 362, 552, 721, 1000],

  heroImg: 'https://p3-sign.toutiaoimg.com/tos-cn-i-6w9my0ksvp/c97723ed8c8043e480d6790975363a61~tplv-tt-origin-web:gif.jpeg?_iz=58558&from=article.pc_detail&lk3s=953192f4&x-expires=1736609776&x-signature=MWDHPhmPkKRr03CnMKYgGJKUCZA%3D',
  heroHeadImg: 'https://p3-sign.toutiaoimg.com/tos-cn-i-6w9my0ksvp/6b9aa6ae43454c2c9900ce22449ba447~tplv-obj.image?lk3s=993df49e&traceid=20250109212707F243562175C39FD419E1&x-expires=2147483647&x-signature=6ozQcOajxiJT0OpTGtdzmfrR1dw%3D',
  imgSize: '730px 995px',
  mapId: 192822,
  calc(i,j,unitId, p1, p2 ){
    const basex = 172 * -0.7
    const basey = 179 * -0.7
    if (p1 != null && p1.unitId === unitId) {

      console.log("定位头像位置：皮1")
      offsetx = (j - 1) * basex
      offsety = ((i - 1) * 2 + 1) * basey
    } else if (p2 != null && p2.unitId === unitId) {
      console.log("定位头像位置：皮2")
      offsetx = (j - 1) * basex
      offsety = ((i - 1) * 2 + 2) * basey
    } else {
      console.log("定位头像位置：原皮")
      offsetx = (j - 1) * basex
      offsety = (i - 1) * 2 * basey
    }

    return {offsetx, offsety}
  }
}