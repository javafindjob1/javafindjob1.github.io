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
function fetchData(url, updateUpdateDetails) {
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
      updateUpdateDetails(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}