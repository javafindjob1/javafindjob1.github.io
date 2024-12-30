
#步骤
git clone https://github.com/javafindjob1/javafindjob1.github.io
cd javafindjob1.github.io
echo "hello world" > index.html

git add --all
git commit -m "update"
git push origin main

git config --global http.proxy http://localhost:10809
git config --global https.proxy http://localhost:10809


