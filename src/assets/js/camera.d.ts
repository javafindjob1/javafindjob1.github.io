// camera.d.ts
import { vec3 } from 'gl-matrix';
import Camera from 'mdx-m3-viewer/dist/cjs/viewer/camera';
import Scene from 'mdx-m3-viewer/dist/cjs/viewer/scene';
// 定义触摸模式常量
export const TOUCH_MODE_INVALID: -1;
export const TOUCH_MODE_ROTATE: 0;
export const TOUCH_MODE_ZOOM: 1;

// 定义相机选项接口
export interface CameraOptions {
  moveSpeed?: number;
  rotationSpeed?: number;
  zoomFactor?: number;
  horizontalAngle?: number;
  verticalAngle?: number;
  distance?: number;
  position?: vec3;
  target?: vec3;
  twist?: number;
  onManualChange?: () => void;
  fov?: number;
  nearClipPlane?: number;
  farClipPlane?: number;
}

// 鼠标状态接口
export interface MouseState {
  buttons: boolean[];
  x: number;
  y: number;
  x2: number;
  y2: number;
}
// 导出的SimpleOrbitCamera类
export class SimpleOrbitCamera {
  scene: Scene;
  canvas: HTMLCanvasElement;
  camera: Camera;
  moveSpeed: number;
  rotationSpeed: number;
  zoomFactor: number;
  horizontalAngle: number;
  verticalAngle: number;
  distance: number;
  position: vec3;
  target: vec3;
  twist: number;
  mouse: MouseState;
  touchMode: number;
  touches: Touch[];
  instance: Instance | null;
  onManualChange: (() => void) | null;
  fov: number;
  nearClipPlane: number;
  farClipPlane: number;

  constructor(scene: Scene, options?: CameraOptions);

  update(): void;
  move(x: number, y: number): void;
  rotate(x: number, y: number): void;
  zoom(factor: number): void;
  manualChange(): void;
  onResize(): void;
  moveToAndFace(position: vec3, target: vec3): void;
  updateInternalCamera(): void;
  applyInstanceCamera(instance: Instance): void;
}

// 导出的setupCamera函数
export function setupCamera(scene: Scene, options?: CameraOptions): SimpleOrbitCamera;
