<script setup lang="ts">
import type { Skin } from '@/types';
import { ref } from 'vue';


const props = defineProps<{ skin: Skin }>();
const mapId = props.skin.mapId
const currentVersion = props.skin.currentVersion

const showModal = ref({ show: false })

function changeTabno(e: MouseEvent) {
  const ele = e.target as HTMLElement
  if (ele.classList.contains('tabno')) {
    const tabno = ele.dataset.tabno
    for (const v of updateDatas.value) {
      v.active = ''
      if (v.mapVersion === tabno) {
        v.active = 'active'
      }
    }
  }
}

function showUpdate(flag: boolean) {
  fetchUpdate()
  showModal.value.show = Boolean(flag)
}

function fetchData(url: string, handle: (e) => void) {
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

interface UpdateData {
  mapVersion: string
  createTime: string
  content: string
  active: string
}
const updateDatas = ref<UpdateData[]>([])
function fetchUpdate() {
  updateDatas.value = []
  fetchData(`https://map-api.kkdzpt.com/api/v3/map/changelogs?mapId=${mapId}&start=0&limit=5`, (data) => {
    console.log("开始处理更新数据", data.data.rows)
    for (const v of data.data.rows) {
      const { mapVersion, createTime, content } = v

      updateDatas.value.push({ mapVersion, createTime, content, active: '' })
    }

    if (updateDatas.value.length > 0) {
      (updateDatas.value[0] as UpdateData).active = 'active'
    }

  })
}

fetchUpdate()
</script>
<template>
  <div>
    <div class="update">
      <p>
        <span>页面版本 {{ currentVersion }} 最新 {{ updateDatas[0]?.mapVersion }}</span>
        <a href="#" data-turbo="false" @click.prevent="showUpdate(true)">更新说明</a><i
          class="iconfont icon-refresh-v2"></i>
      </p>
    </div>
    <div ref="updateModal" id="updateModal" :class="showModal">
      <div class="inner modal">
        <header>更新说明</header>
        <div class="_sticky_top" style="position: relative; top: -1px; height: 1px;"></div>
        <ul class="tab" @click="changeTabno">
          <li v-for="v of updateDatas" :key="v.mapVersion">
            <span class="tabno" :class="{ active: v.active }" :data-tabno="v.mapVersion">{{ v.mapVersion }}</span>
          </li>
        </ul>
        <ul class="update-item">
          <li v-for="v of updateDatas" :key="v.mapVersion" class="update-detail" :class="{ active: v.active }"
            :data-tabno="v.mapVersion">
            <h3 class="meta">
              <span class="update-version">{{ v.mapVersion }}</span>
              <span class="updatetime">{{ v.createTime }}</span>
            </h3>
            <p v-html="v.content"></p>
          </li>
        </ul>
        <div class="close" @click.prevent="showUpdate(false)">×</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.update span {
  vertical-align: baseline;
}

.update i {
  color: #6bba17;
  vertical-align: middle;
}

.update a {
  text-decoration: underline;
  color: #6bba17;
  vertical-align: baseline;
}

.update a::before {
  display: inline;
}

#updateModal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000b3;

  z-index: 2;
  display: none;
}

#updateModal.show {
  display: flex;
}

#updateModal .inner {
  width: 70%;
  height: 80%;
  margin: auto;
  background-color: #1c232c;
  border-radius: 3px;
  position: relative;
}

#updateModal .inner header {
  width: 100%;
  height: 70px;
  font-weight: 700;
  font-size: 25px;
  color: rgb(226, 244, 255);
  background: url("@/kk/f29ff3.png") no-repeat;
  position: relative;
  line-height: 70px;
  padding-left: 14px;
  box-sizing: border-box;
}

#updateModal .inner header::before {
  content: '';
  width: 7px;
  height: 100%;
  position: absolute;
  left: 0px;
  background: linear-gradient(180deg, #0b9fff, #01ceff);
}

#updateModal .inner header::after {
  background: linear-gradient(90deg, #2fafff, #1c232c);
  content: "";
  height: 70px;
  left: 0;
  opacity: .2;
  position: absolute;
  top: 0;
  width: 100%;
}

#updateModal .inner ul.tab {
  height: 50px;
  background-color: #27323d;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#updateModal .inner ul.tab li {
  padding: 0px 10px;
  font-size: 16px;
}

.update-item {
  padding: 5px 20px;
  color: white;
  overflow-y: auto;
  height: calc(100% - 132px);
}

.update-item .update-detail {
  width: 100%;
  display: none;
}

.update-detail.active {
  display: list-item;
}

.update-detail .meta {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}

.update-version {
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding-left: 2px;
}

.update-detail .meta .updatetime {
  color: hsla(0, 0%, 100%, .47);
  font-style: italic;
  font-weight: 700;
  font-size: 16px;
  padding-right: 2px;
}


#updateModal .tab li {
  height: 50px;
}

#updateModal .tabno.active {
  border-bottom: 3px solid orange;
}

#updateModal .tabno {
  cursor: pointer;
  display: block;
  line-height: 50px;
  height: 50px;
  box-sizing: border-box;
  user-select: none;
}

#updateModal .close {
  position: absolute;
  top: 0px;
  right: 0px;
  color: white;
  font-size: 30px;
  line-height: 30px;
  padding-right: 2px;
  cursor: pointer;
  user-select: none;
}

/* #endregion */
</style>
