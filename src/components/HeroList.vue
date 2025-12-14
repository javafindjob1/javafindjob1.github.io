<script setup lang="ts">
import HeroConsole from './HeroConsole.vue';
import MapUpdate from './MapUpdate.vue';
import type { Skin,ClickHero } from '@/types';
import { ref, onMounted } from 'vue';

const { skin } = defineProps<{ skin: Skin }>();
const locArr = skin.locArr
const heroArr = skin.heroArr
const heightArr = skin.heightArr
const heroImg = skin.heroImg

const clickHero = ref<ClickHero>({
  heroId: '',
  changeHero(heroId: string) {
    this.heroId = heroId
  }
})

const ulstyle = ref('')
onMounted(() => {
  console.log('HeroList mounted');
  ulstyle.value = 'background-color: #d2c075;'
});


interface HeroItem {
  heroId: string
  style: string
  empty: boolean
}
const heroList = ref<HeroItem[]>([])

for (let i = 0; i < heroArr.length; i++) {
  const b2 = heightArr[i + 1] as number
  const b1 = heightArr[i] as number
  const height = (b2 - b1) * 0.7
  const offsety = b1 * -0.7

  const hi = heroArr[i] as string[]
  const loci = locArr[i] as number[]
  for (let j = 0; j < hi.length; j++) {
    const heroId = hi[j] as string

    const l2 = loci[j + 1] as number
    const l1 = loci[j] as number
    const width = (l2 - l1) * 0.7
    const offsetx = loci[j] as number * -0.7

    const style = `background: url('${heroImg[0]}') no-repeat left top / 1332px 700px;width: ${width}px;height: ${height}px;background-position: ${offsetx}px ${offsety}px;`
    heroList.value.push({
      heroId,
      style,
      empty: heroId === ''
    })
  }
}

</script>
<template>
  <div class="hero">
    <div class="container">
      <MapUpdate :skin="skin"></MapUpdate>
      <ul class="hero-list" :style="ulstyle">
        <li v-for="p, index of heroList" :hero="!p.empty" :style="p.style" :key="index">
          <a v-if="p.empty === false" @click.prevent="clickHero.heroId = p.heroId" href="/bilibili/hero/hero-console.html"
            :data-hero-id="p.heroId" class="no-drag" title=""></a>
        </li>
      </ul>
      <HeroConsole v-if="clickHero.heroId !== ''" :clickHero="clickHero" :skin="skin"></HeroConsole>
    </div>
  </div>
</template>
<style scoped>
.page-header .subnav {
  z-index: 1;
  min-width: 1332px;
}

body {
  min-width: 1332px;
}

.hero {
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
}

.hero .container {
  flex-shrink: 1;
  position: relative;
  transform: scale(0.999);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.hero-nav {
  flex-shrink: 1;
}

/* #region英雄列表 */
.hero ul.hero-list {
  position: relative;
  width: calc(1903px * 0.7);
  height: calc(1000px * 0.7);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  flex-shrink: 1;
  /* background-color: #d2c075; */
}

.hero .hero-list a {
  width: 100%;
  height: 100%;
  /* 防止文本被选中，避免拖动 */
  user-select: none;
}

.hero .hero-list a::before {
  content: '';
  display: block;
  height: 100%;

}

.hero .hero-list a p {
  color: white;
  font-size: 0px;
  text-align: center;
}

.hero .hero-list a:hover p {
  color: white;
  font-size: 16px;
}

.hero .hero-list li[hero=true]:hover {
  border-radius: 10px;
}

#version-update-turbo-frame {
  position: absolute;
  top: -20px;
  right: 0;
}

/* #endregion */
</style>
