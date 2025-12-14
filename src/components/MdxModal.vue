<script lang="ts" setup>
import type { Skin,ClickHero } from '@/types';
import { onMounted, ref, watch } from 'vue';

import type MdxModel from 'mdx-m3-viewer/dist/cjs/viewer/handlers/mdx/model';
import { setupCamera, } from '@/assets/js/camera.js';

interface MdxModal {
  hide: boolean
  hideModal: (hide: boolean) => void
}
const { mdx, skin, clickHero } = defineProps<{ mdx: MdxModal, skin: Skin, clickHero: ClickHero }>()
window.hive = new Set<string>()
const canvasmdx = ref()
const canvas = ref()
let loadModel: (name: string) => void;
onMounted(() => {
  loadModel = initModelViewer(canvas.value, skin.mdx)
  loadModel(clickHero.heroId + '.mdx')
})
watch(() => clickHero.heroId, (newValue) => {
  loadModel(newValue + '.mdx')
})


const offsetStyle = ref({
  left: '50%',
  top: '50%'
})

let offsetX: number, offsetY: number = 0;
function moveStart(e: MouseEvent) {
  offsetX = e.clientX - canvasmdx.value.offsetLeft;
  offsetY = e.clientY - canvasmdx.value.offsetTop;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e: MouseEvent) {
  offsetStyle.value.left = (e.clientX - offsetX) + 'px';
  offsetStyle.value.top = (e.clientY - offsetY) + 'px';
}

function onMouseUp() {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

function initModelViewer(canvas: HTMLCanvasElement, path: string = 'clients/example/resources') {
  const handlers = window.ModelViewer.viewer.handlers;

  const viewer = new window.ModelViewer.viewer.ModelViewer(canvas);
  viewer.enableAudio();
  viewer.on('error', (e: Error) => console.log('error', e));
  viewer.addHandler(handlers.mdx, pathSolver, true);
  // Add the BLP handler.
  viewer.addHandler(handlers.blp);
  viewer.addHandler(handlers.dds);
  viewer.addHandler(handlers.tga);
  viewer.addHandler(handlers.m3);

  ; (function step() {
    requestAnimationFrame(step);

    viewer.updateAndRender();
  })();
  function pathSolver(src: unknown): unknown {
    src = (src as string).toLowerCase();
    const local = `${window.location.origin}/${path}/${src}`;
    const hive = `https://www.hiveworkshop.com/assets/wc3/war3.w3mod/${src}`;
    // const hive = `https://www.hiveworkshop.com/casc-contents?path=${src}`;
    // const hive = `${window.location.origin}/mdx/${src}`

    const hiveController = new AbortController();
    const promise1 = fetch(local).then((res) => {
      if (res.ok) {
        console.log('local', res.bytes(), local)
        hiveController.abort()
        return local;
      } else {
        return Promise.reject(new Error('Not found'));
      }
    }).catch((err) => {
      return Promise.reject(err)
    });
    const promise2 = fetch(hive, { signal: hiveController.signal }).then((res) => {
      if (res.ok) {
        window.hive.add(hive)
        return hive;
      } else {
        return Promise.reject(new Error('Not found'));
      }
    }).catch((err) => {
      return Promise.reject(err)
    });
    const res = (async () => {
      return await Promise.any([promise1, promise2])
    })()
    console.log("res", res)
    return res;
  }


  return function loadModel(name: string) {
    viewer.clear()
    const scene = viewer.addScene();
    // Check camera.js!
    setupCamera(scene);

    // Load our MDX model!
    // export declare type PathSolver = (src: unknown, params?: SolverParams) => unknown;

    const modelPromise = viewer.load(name, pathSolver);
    modelPromise.then((model2) => {
      // The promise can return undefined if something went wrong!
      if (model2) {
        // Create an instance of this model.
        const model = model2 as MdxModel;
        const instance = model.addInstance();
        console.log("model", name, model, instance)
        let sequences: number[] = [1, 0, 2]
        if (name.toLowerCase() === "e03r.mdx") {
          sequences = [14, 15, 13]
        }
        // Set the instance's scene.
        // Equivalent to scene.addInstance(instance)
        instance.setScene(scene);

        // Want to run the second animation.
        // 0 is the first animation, and -1 is no animation.
        instance.setSequence(sequences[0] as number);

        // Tell the instance to loop animations forever.
        // This overrides the setting in the model itself.
        instance.setSequenceLoopMode(2);
        instance.move([0, 0, 0]);

        // Let's create another instance and do other stuff with it.
        const instance2 = model.addInstance();
        instance2.setScene(scene);
        instance2.setSequence(sequences[1] as number);
        instance2.setSequenceLoopMode(2);
        instance2.move([100, 100, 0]);
        instance2.uniformScale(0.5);
        console.log("instance2", instance2)

        // And a third one.
        const instance3 = model.addInstance();
        instance3.setScene(scene);
        instance3.setSequence(sequences[2] as number);
        instance3.setSequenceLoopMode(2);
        instance3.move([-100, -100, 0]);
      }
    });
  }

}














</script>
<template>
  <Teleport to="body">
    <div class="canvas-mdx" ref="canvasmdx" :class="{ hide: mdx.hide }" :style="offsetStyle">
      <div class="drag-head" @mousedown="moveStart">
        <p>模型展示</p>
      </div>
      <canvas ref="canvas"></canvas>
      <div class="close" @click="mdx.hideModal(true)">×</div>
    </div>
  </Teleport>
</template>
<style scoped>
/* #region mdx */
.canvas-mdx {
  position: fixed;
  width: 800px;
  height: 497px;
  color: white;
  transform: translate(-50%, -50%);
}

.drag-head {
  position: absolute;
  z-index: 2;
  background-color: white;
  height: 20px;
  width: 100%;
  cursor: move;
  top: 0;
  right: 0;
  color: red;
  text-align: center;
}

.canvas-mdx canvas {
  width: 100%;
  height: 100%;
}

.canvas-mdx.hide {
  top: -2000px !important;
}

.close {
  position: absolute;
  top: 0px;
  right: -30px;
  color: white;
  font-size: 30px;
  line-height: 30px;
  padding-right: 2px;
  cursor: pointer;
  user-select: none;
}

/* #endregion */
</style>
