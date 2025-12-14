export interface Skin {
  InfoPanelTextFont?: string
  InfoPanelIconArmorDivine?: number
  InfoPanelIconArmorFort: number
  InfoPanelIconArmorHero: number
  InfoPanelIconArmorLarge: number
  InfoPanelIconArmorMedium: number
  InfoPanelIconArmorNone: number
  InfoPanelIconArmorSmall: number
  InfoPanelIconDamageChaos: number
  InfoPanelIconDamageHero: number,
  InfoPanelIconDamageMagic: number,
  InfoPanelIconDamageMelee: number,
  InfoPanelIconDamageNormal: number,
  InfoPanelIconDamagePierce: number,
  InfoPanelIconDamageSiege: number,

  InfoPanelIconHeroIcon0: number
  InfoPanelIconHeroIcon1: number
  InfoPanelIconHeroIcon2: number

  ARMORTIP_DIVINE?: string
  ARMORTIP_FORT: string
  ARMORTIP_HERO: string
  ARMORTIP_LARGE: string
  ARMORTIP_MEDIUM: string
  ARMORTIP_NONE: string
  ARMORTIP_NORMAL: string
  ARMORTIP_SMALL: string
  ARMOR_FORT: string
  ARMOR_DIVINE?: string
  ARMOR_HERO: string
  ARMOR_LARGE: string
  ARMOR_MEDIUM: string
  ARMOR_NONE: string
  ARMOR_SMALL: string
  DAMAGETIP_CHAOS: string
  DAMAGETIP_HERO: string
  DAMAGETIP_MAGIC: string
  DAMAGETIP_MELEE: string
  DAMAGETIP_NORMAL: string
  DAMAGETIP_PIERCE: string
  DAMAGETIP_SIEGE: string
  DAMAGE_CHAOS: string
  DAMAGE_HERO: string
  DAMAGE_MAGIC: string
  DAMAGE_MELEE: string
  DAMAGE_NORMAL: string
  DAMAGE_PIERCE: string
  DAMAGE_SIEGE: string

  INFOPANEL_LEVEL_CLASS: string
  PRIMARY_ATTRIBUTE: string
  COLON_DAMAGE: string
  COLON_ARMOR: string
  COLON_HERO_ATTRIBUTES: string
  COLON_STRENGTH: string
  COLON_AGILITY: string
  COLON_INTELLECT: string
  COLON_STATUS: string

  str: string
  agi: string
  int: string
  view: string
  DefenseArmor: number
  locArr: Array<Array<number>>
  heroArr: Array<Array<string>>
  mdx: string
  heightArr: Array<number>
  heroImg: Array<string>
  heroPanelImg: Array<string>
  heroPanelImgWidth: number
  heroPanelImgHeight: number
  mapId: number
  currentVersion: string
  // 英雄的坐标位置
  i: number
  j: number
  calcAbility(unitId: string, p1: PifuIntro | undefined, p2: PifuIntro | undefined, i2: number, j2: number, rate?: number): string
  calcHead(unitId: string, p1: PifuIntro | undefined, p2: PifuIntro | undefined): string
  calcDef(defType: string): string
  calcProp(propType: string): string
  calcAttack(attackType: string): string
  calcStyle(i: number): string

}


export interface AbilIntro {
  desc: string
}

export interface PifuIntro extends AbilIntro {
  unitId: string
}

export interface HeroData {
  unitId: string
  name: string
  prop: string
  propernames: string
  baseUnitId: string
  armor: string
  attack: string
  hp: string
  intro: string
  p1?: PifuIntro
  p2?: PifuIntro
  core?: AbilIntro
  d?: AbilIntro
  t?: AbilIntro
  d2?: AbilIntro
  t2?: AbilIntro
  q?: AbilIntro
  w?: AbilIntro
  e?: AbilIntro
  r?: AbilIntro
  items?: AbilIntro[]
}

import ModelViewer from 'mdx-m3-viewer'
// 扩展 Window 接口
declare global {
  interface Window {
    ModelViewer: typeof ModelViewer
    hive: Set<string>
  }
}

export interface ClickHero {
  heroId: string
  changeHero: (heroId: string) => void
}
