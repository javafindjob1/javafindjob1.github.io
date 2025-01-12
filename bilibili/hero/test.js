function loadImg(src, callback) {
  const img = new Image()
  img.src = src
  img.onload = function () {
    console.log("onload")
  }
  img.onerror = function () {
    console.log("onerror")
    img.onerror = null
    img.onload = null
  }
}
loadImg("https://p3-sign.toutiaoimg.com/tos-cn-i-eyfl5e3fp8/f279df5e11f445a1b600196da7573238~tplv-obj.image?lk3s=993df49e&traceid=202501120839018944C39A56B6F348F6C8&x-expires=2147483641&x-signature=BXoYMyrCVp21GiPM71QlxF1H85Q%3D")


