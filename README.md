
#步骤
git clone https://github.com/javafindjob1/javafindjob1.github.io
cd javafindjob1.github.io
echo "hello world" > index.html

git add --all
git commit -m "update"
git push origin main

git config --global http.proxy http://localhost:10809
git config --global https.proxy http://localhost:10809

#turbo-frame使用
<!-- 主页 -->
  <script src="./js/turbo.es2017-umd.js" defer></script>
  
  <turbo-frame id="repo-content-turbo-frame" src="./flex/component/nav.html">
    <p>加载中...</p>
  </turbo-frame>

<!-- 导航页 -->
  <turbo-frame id="repo-content-turbo-frame">
    <style>
    </style>
    导航页
  </turbo-frame>