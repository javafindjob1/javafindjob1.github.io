var x7skin = {
  InfoPanelIconArmorFort: 3,
  InfoPanelIconArmorHero: 4,
  InfoPanelIconArmorLarge: 5,
  InfoPanelIconArmorMedium: 6,
  InfoPanelIconArmorNone: 7,
  InfoPanelIconArmorSmall: 8,
  InfoPanelIconDamageChaos: 9,
  InfoPanelIconDamageHero: 10,
  InfoPanelIconDamageMagic: 11,
  InfoPanelIconDamageMelee: 12,
  InfoPanelIconDamageNormal: 13,
  InfoPanelIconDamagePierce: 14,
  InfoPanelIconDamageSiege: 15,

  InfoPanelIconHeroIcon0: 0,
  InfoPanelIconHeroIcon1: 1,
  InfoPanelIconHeroIcon2: 2,

  ARMORTIP_FORT: "|cffffffcc光属性护甲受到风水火地属性攻击伤害较少。|r|n|n|cff80ff80风属性攻击 - 80%|n水属性攻击 - 80%|n火属性攻击 - 80%|n地属性攻击 - 80%|n光属性攻击 - 80%|r|n|cffff0000暗属性攻击  - 130%",
  ARMORTIP_HERO: "|cffcc99ff暗属性护甲会受到光属性攻击的极大伤害。|r|n|n风属性攻击 - 100%|n水属性攻击 - 100%|n火属性攻击 - 100%|n地属性攻击 - 100%|n|cffff0000光属性攻击 - 160%|n暗属性攻击 - 130%",
  ARMORTIP_LARGE: "|cffffcc00地属性护甲受到水属性攻击伤害较少，但会受到风属性攻击的额外伤害。|r|n|n|cffff0000风属性攻击 - 130%|r|n|cff80ff80水属性攻击 - 70%|r|n火属性攻击 - 100%|n地属性攻击 - 100%",
  ARMORTIP_MEDIUM: "|cffffcc00风属性护甲受地属性攻击伤害较少，但会受到火属性攻击的额外伤害。|r|n|n风属性攻击 - 100%|n水属性攻击 - 100%|n|cffff0000火属性攻击 - 130%|r|n|cff80ff80地属性攻击 - 70%",
  ARMORTIP_NONE: "|cffffcc00水属性护甲受到火属性攻击伤害较少，但会受到地属性攻击的额外伤害。|r|n|n风属性攻击 - 100%|n水属性攻击 - 100%|n|cff80ff80火属性攻击 - 70%|r|n|cffff0000地属性攻击 - 130%|r",
  ARMORTIP_NORMAL: "|cffffcc00风属性护甲受地属性攻击伤害较少，但会受到火属性攻击的额外伤害。|r|n|n风属性攻击 - 100%|n水属性攻击 - 100%|n|cffff0000火属性攻击 - 130%|r|n|cff80ff80地属性攻击 - 70%",
  ARMORTIP_SMALL: "|cffffcc00火属性护甲受到风属性攻击伤害较少，但会受到水属性攻击的额外伤害。|r|n|n|cff80ff80风属性攻击 - 70%|r|n|cffff0000水属性攻击 - 130%|r|n火属性攻击 - 100%|n地属性攻击 - 100%",
  ARMOR_FORT: "种类： |Cffffffcc光属性护甲|R",
  ARMOR_HERO: "种类： |Cffcc99ff暗属性护甲|R",
  ARMOR_LARGE: "种类： |Cffff9900地属性护甲|R",
  ARMOR_MEDIUM: "种类： |Cff99cc00风属性护甲|R",
  ARMOR_NONE: "种类： |Cff00ffff水属性护甲|R",
  ARMOR_SMALL: "种类： |Cffff0000火属性护甲|R",
  DAMAGETIP_CHAOS: "|cffffcc00火属性攻击对风属性护甲造成额外伤害，但对水属性护甲则会降低伤害。|r|n|n|cff80ff80风属性护甲 - 130%|r|n|cffff0000水属性护甲 - 70%|r|n火属性护甲 - 100%|n地属性护甲 - 100%",
  DAMAGETIP_HERO: "|cffcc99ff暗属性攻击对所有属性护甲都会造成额外伤害。|r|n|n|cff80ff80风属性护甲 - 130%|n水属性护甲 - 130%|n火属性护甲 - 130%|n地属性护甲 - 130%|n光属性护甲 - 130%|n暗属性护甲 - 130%|n",
  DAMAGETIP_MAGIC: "|cffffffcc光属性攻击对暗属性护甲造成极大的伤害。|r|n|n风属性护甲 - 100%|n水属性护甲 - 100%|n火属性护甲 - 100%|n地属性护甲 - 100%|n光属性护甲 - 100%|n|cff80ff80暗属性护甲 - 160%|r",
  DAMAGETIP_MELEE: "|cffffcc00水属性攻击对火属性护甲造成额外伤害，但对地属性护甲则会降低伤害。|r|n|n风属性护甲 - 100%|n水属性护甲 - 100%|n|cff80ff80火属性护甲 - 130%|r|n|cffff0000地属性护甲 - 70%|r",
  DAMAGETIP_NORMAL: "|cffffcc00水属性攻击对火属性护甲造成额外伤害，但对地属性护甲则会降低伤害。|r|n|n风属性护甲 - 100%|n水属性护甲 - 100%|n|cff80ff80火属性护甲 - 130%|r|n|cffff0000地属性护甲 - 70%|r",
  DAMAGETIP_PIERCE: "|cffffcc00风属性攻击对地属性护甲造成额外伤害，但对火属性护甲则会降低伤害。|r|n|n风属性护甲 - 100%|n水属性护甲 - 100%|n|cffff0000火属性护甲 - 70%|r|n|cff80ff80地属性护甲 - 130%|r",
  DAMAGETIP_SIEGE: "|cffffcc00地属性攻击对水属性护甲造成额外伤害，但对风属性护甲则会降低伤害。|r|n|n|cffff0000风属性护甲 - 70%|r|n|cff80ff80水属性护甲 - 130%|r|n火属性护甲 - 100%|r|n地属性护甲 - 100%",
  DAMAGE_CHAOS: "种类： |Cffff0000火属性攻击|r",
  DAMAGE_HERO: "种类： |Cffcc99ff暗属性攻击|r",
  DAMAGE_MAGIC: "种类： |Cffffffcc光属性攻击|r",
  DAMAGE_MELEE: "种类： |Cff00ffff水属性攻击|r",
  DAMAGE_NORMAL: "种类： |Cff00ffff水属性攻击|r",
  DAMAGE_PIERCE: "种类： |Cff99cc00风属性攻击|r",
  DAMAGE_SIEGE: "种类： |Cffff9900地属性攻击|R",

  INFOPANEL_LEVEL_CLASS: "等级|r %u %s",
  PRIMARY_ATTRIBUTE: "|cfffcd211 - 主属性|r|n - 每点增加2的攻击力|n",
  COLON_DAMAGE: "|cfffcd211攻击力：|r",
  COLON_ARMOR: "|cfffcd211护甲：|r",
  COLON_HERO_ATTRIBUTES: "|cfffcd211英雄属性|r",
  COLON_STRENGTH: "|cfffcd211力量：|r",
  COLON_AGILITY: "|cfffcd211敏捷：|r",
  COLON_INTELLECT: "|cfffcd211智力：|r",
  COLON_STATUS: "状态：|r",

  str: " - 每点增加17的生命值|n - 每3点增加1的生命值恢复速度",
  agi: " - 每16点增加1点的护甲|n - 每5点增加1%攻击速度",
  int: " - 每点增加11的魔法值|n - 每20点增加1的魔法恢复速度",
  view: "1600",
  DefenseArmor: "0.03",
  locArr: [
    [0, 1903],
    [0, 263, 416, 545, 717,  893, 1026,  1207, 1400, 1517, 1723, 1903],
    [0, 179, 351, 529, 717,  893, 1050,  1207, 1405, 1554, 1757, 1903],
    [0,  77, 323, 488, 717,  893, 1057,  1257, 1467, 1620, 1820, 1903],

    [0, 240, 420, 717, 913,  1065, 1303, 1620, 1903],
    [0, 1903],
  ],

  heroArr: [
    [''],
    ['', 'H00X', 'H00F', 'H003', 'H00D', 'E006', 'O005', 'H002', 'O001', 'O000', ''],
    ['', 'U000', 'E003', 'E00Y', 'O003', 'H001', 'O002', 'N006', 'H005', 'H00E', ''],
    ['', 'U001', 'H000', 'O00J', 'H006', 'E021', 'H00G', 'E00T', 'E00C', 'E029', ''],
    ['', "O01C", "O010", "H01H", "", "E03O", "O018", ''],
    [''],
  ],

  mdx: '/x7/x7-mdx/',
  heightArr: [0, 40, 216, 377, 567, 744, 1000],
  heroImg: ['https://p3-sign.toutiaoimg.com/tos-cn-i-eyfl5e3fp8/9e9c7094d35440d6ac2092dd60b4a0c3~tplv-obj.image?lk3s=993df49e&traceid=20250206202129BB6FE2AF1EA380C848B2&x-expires=2147483647&x-signature=yh6Aa350aKPffw%2BTsdxeEw0k9QA%3D',
    '/x7/x7-heros.webp',
  ],
  heroPanelImg: ['https://p3-sign.toutiaoimg.com/tos-cn-i-eyfl5e3fp8/272d50b453c1477eba951d36789e2356~tplv-obj.image?lk3s=993df49e&traceid=20250301094027679819EB2DA79E897A30&x-expires=2147483647&x-signature=tVaZc4ckKEpiS%2Beu11TWmWBjFJI%3D',
    '/x7/x7-imgs/out.webp',
  ],
  heroPanelImgWidth: 5133,
  heroPanelImgHeight: 2584,
  mapId: 193337,
  // 英雄的坐标位置
  i: 0,
  j: 0,
  calcAbility(unitId, p1, p2, i2, j2, rate) {
    let { i, j } = this
    const basex = 145 + 70 * 6 + 6
    const basey = 70 * 3

    if (p1 != null && p1.unitId === unitId) {

      console.log("定位头像位置：皮1")
      offsetx = (j - 1) * basex
      offsety = ((i - 1) * 3 + 1) * basey
    } else if (p2 != null && p2.unitId === unitId) {
      console.log("定位头像位置：皮2")
      offsetx = (j - 1) * basex
      offsety = ((i - 1) * 3 + 2) * basey
    } else {
      console.log("定位头像位置：原皮")
      offsetx = (j - 1) * basex
      offsety = (i - 1) * 3 * basey
    }

    offsetx = offsetx + 145 + 6 + i2 * 70
    offsety = offsety + j2 * 70
    rate = rate || 0.84
    return `background: url('${this.heroPanelImg}') no-repeat -${offsetx * rate}px -${offsety * rate}px / ${this.heroPanelImgWidth * rate}px ${this.heroPanelImgHeight * rate}px`

  },
  calcHead(unitId, p1, p2) {
    let { i, j } = this
    const basex = (145 + 70 * 6 + 6) * -0.7
    const basey = (70 * 3) * -0.7
    if (p1 != null && p1.unitId === unitId) {

      console.log("定位头像位置：皮1")
      offsetx = (j - 1) * basex
      offsety = ((i - 1) * 3 + 1) * basey
    } else if (p2 != null && p2.unitId === unitId) {
      console.log("定位头像位置：皮2")
      offsetx = (j - 1) * basex
      offsety = ((i - 1) * 3 + 2) * basey
    } else {
      console.log("定位头像位置：原皮")
      offsetx = (j - 1) * basex
      offsety = (i - 1) * 3 * basey
    }

    return `background: url('${this.heroPanelImg}') no-repeat ${offsetx}px ${offsety}px / ${this.heroPanelImgWidth * 0.7}px ${this.heroPanelImgHeight * 0.7}px`
  },
  calcDef(defType) {
    const name = "InfoPanelIconArmor" + defType.substring(0, 1).toUpperCase() + defType.substring(1)
    const i = this[name]
    return this.calcStyle(i)
  },
  calcProp(propType) {
    const name = "InfoPanelIconHeroIcon" + propType
    const i = this[name]
    return this.calcStyle(i)
  },
  calcAttack(attackType) {
    const name = "InfoPanelIconDamage" + attackType.substring(0, 1).toUpperCase() + attackType.substring(1)
    const i = this[name]
    return this.calcStyle(i)
  },
  calcStyle(i) {
    const rate = 0.5
    return `background: url('${this.heroPanelImg}') no-repeat -${i * 70 * rate}px -${(this.heroPanelImgHeight - 64) * rate}px / ${this.heroPanelImgWidth * rate}px ${this.heroPanelImgHeight * rate}px`
  },

}
