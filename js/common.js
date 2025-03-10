// 动态加载 JavaScript 文件
function loadScript(url, callback) {
  const script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.async = true; // 或 script.defer = true;

  script.onload = function () {
    if (callback) callback()
  }
  document.head.appendChild(script);
}

// 动态加载css文件
function loadCSS(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// 禁止所有元素被拖拽 防止a链接出现url
document.addEventListener('dragstart', function (e) {
  e.preventDefault();
});

// 发送网络请求并解析 JSON 数据
function fetchData(url, handle) {
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

/**
 * 多个地方加载图片，直到成功为止
 * @param {*} srcArr 
 * @param {*} resolve 
 * @param {*} reject 
 * @returns 
 */
function loadImg(srcArr, resolve, reject) {
  if (!Array.isArray(srcArr)) {
    return loadImg([srcArr], resolve, reject)
  }

  const img = new Image();
  img.src = srcArr[0];
  img.onload = function () {
    resolve && resolve(srcArr[0]);
  };
  img.onerror = function () {
    if (srcArr.length > 1) {
      loadImg(srcArr.slice(1), resolve, reject);
    } else {
      reject && reject();
    }
  };
}