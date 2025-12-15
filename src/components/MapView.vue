<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter() // 访问路由实例
const route = useRoute() // 访问路由实例
console.log('route', route.fullPath)

interface Data {
  name: string,
  img: string,
  url: string,
  active: boolean
}
const datas = ref<Data[]>([
  {
    name: '西方世界的劫难7',
    img: '/header/西7.webp',
    url: '/x7',
    active: false,
  },
  {
    name: '梦想愿景',
    img: '/header/mp.webp',
    url: '/mp',
    active: false,
  },
  {
    name: '中国象棋',
    img: '/header/chess.webp',
    url: '/chess',
    active: false,
  }
])

const mapSrc = ref('')
let catchMapSrc = mapSrc.value
watch(() => route.fullPath, () => {
  for (let i = 0; i < datas.value.length; i++) {
    const map = datas.value[i] as Data
    if (map.url == route.fullPath) {
      map.active = true
      mapSrc.value = map.img
      catchMapSrc = map.img
    } else {
      map.active = false
    }
  }
})


function jump(index: number) {
  const map = datas.value[index] as Data
  router.push(map.url); // 编程式导航
}

function showMap(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.tagName == 'A') {
    const img = target.dataset.img as string
    mapSrc.value = img
  }
}

function outMap() {
  mapSrc.value = catchMapSrc
}


</script>
<template>
  <header class="page-header ">
    <div class="type ">
      <img :src="mapSrc" alt="">
    </div>
    <div class="subnav " @mouseover="showMap" @mouseout="outMap">
      <ul>
        <li v-for="m, index of datas" :key="m.url">
          <a :href="m.url" @click.prevent="jump(index)" :class="{ active: m.active }" :data-img="m.img">
            {{ m.name }}
          </a>
        </li>
      </ul>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
/* #region 顶部  */
.page-header {
  height: 70px;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.7);
}

.page-header .type {
  margin-top: -12px;
  padding-bottom: 12px;
  width: 54px;
  height: 54px;
}

.page-header .type img {
  width: 100%;
}

.page-header .subnav {
  opacity: 0;
  box-sizing: border-box;
  padding: 0px 20px;
  /* background: rgba(0, 0, 0, 0.7); */
  position: absolute;
}

.page-header:hover {
  height: 140px;
}

.page-header:hover .subnav {
  /* visibility: visible; */
  opacity: 1;
}

.page-header .subnav a {
  color: white;
  font-size: 14px;
}

.page-header .subnav a:hover {
  color: red;
}

.page-header .subnav a.active {
  color: orange;
}


/* #endregion 顶部 */
</style>
