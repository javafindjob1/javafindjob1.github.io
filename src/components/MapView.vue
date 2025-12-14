<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter() // 访问路由实例
const mapSrc = ref('/header/西7.webp')
const arr = ref(['active', '', ''])
let catchMapSrc = mapSrc.value
function jump(url: string, index: number, e: MouseEvent) {
  router.push(url); // 编程式导航

  const target = e.target as HTMLElement
  const img = target.dataset.img as string
  mapSrc.value = img
  catchMapSrc = img
  arr.value.fill('')
  arr.value[index] = 'active'
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
  <header class="page-header " >
    <div class="type ">
      <img :src="mapSrc" alt="">
    </div>
    <div class="subnav " @mouseover="showMap" @mouseout="outMap">
      <ul>
        <li><a href="/x7" @click.prevent="jump('/x7', 0, $event)" :class="arr[0]"
            data-img="/header/西7.webp">西方世界的劫难7</a></li>
        <li><a href="/mp" @click.prevent="jump('/mp', 1, $event)" :class="arr[1]" data-img="/header/mp.webp">梦想愿景</a>
        </li>
        <li><a href="/chess" @click.prevent="jump('/chess', 2, $event)" :class="arr[2]"
            data-img="/header/chess.webp">中国象棋</a></li>
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
.page-header:hover{
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
