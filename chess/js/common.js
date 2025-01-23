class Com {
	static stype = {
		stype1: {
			width: 325,		//画布宽度
			height: 402, 		//画布高度
			spaceX: 35,		//着点X跨度
			spaceY: 36,		//着点Y跨度
			pointStartX: 5,		//第一个着点X坐标;
			pointStartY: 19,		//第一个着点Y坐标;
			page: "stype_1"	//图片目录
		},
		stype2: {
			width: 523,		//画布宽度
			height: 580, 		//画布高度
			spaceX: 57,		//着点X跨度
			spaceY: 57,		//着点Y跨度
			pointStartX: 3,		//第一个着点X坐标;
			pointStartY: 5,		//第一个着点Y坐标;
			page: "stype_2"	//图片目录
		},
		stype3: {
			width: 530,		//画布宽度
			height: 567, 		//画布高度
			spaceX: 57,		//着点X跨度
			spaceY: 57,		//着点Y跨度
			pointStartX: -2,		//第一个着点X坐标;
			pointStartY: 0,		//第一个着点Y坐标;
			page: "stype_3"	//图片目录
		}
	}
	static gambit
	static clasli
	constructor(stypestr, boardId) {
		this.nowStype = stypestr || Com.getCookie("stype") || "stype2";
		var stype = Com.stype[this.nowStype];
		this.width = stype.width;		//画布宽度
		this.height = stype.height; 		//画布高度
		this.spaceX = stype.spaceX;		//着点X跨度
		this.spaceY = stype.spaceY;		//着点Y跨度
		this.pointStartX = stype.pointStartX;	//第一个着点X坐标;
		this.pointStartY = stype.pointStartY;	//第一个着点Y坐标;
		this.page = stype.page;			//图片目录

		this.board = document.querySelector(boardId);
		this.canvas = this.get("canvas"); //画布
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");

		this.my = 0		                 // 默认选择红方
	}

	repaint(map, mankey, oldX, oldY) {
		document.querySelector(".chess-box").style.background = "url(/chess/img/" + this.page + "/bg.jpg)";
		this.bg = new Bg(this)
		this.dot = new Dot(this);
		this.pane = new Pane(this);

		this.childList = [this.bg, this.dot, this.pane];
		this.mans = {}
		this.createMans(map)
		if (mankey) {
			// 标注最后一手棋
			this.mans[mankey].oldX = oldX
			this.mans[mankey].oldY = oldY
			mankey && this.pane.showMove(this.mans[mankey])
		}
		this.loadAllImages().then(() => {
			this.show();
		});

	}

	get(cssSelector) {
		return this.board.querySelector(cssSelector);
	}
	// 加载所有图片
	loadAllImages() {
		const images = [
			this.bg.promise,
			this.dot.promise,
			this.pane.promise,
			...Object.values(this.mans).map(man => man.promise)
		];

		return Promise.all(images);
	}
	//生成map里面有的棋子
	createMans(map) {
		for (var i = 0; i < map.length; i++) {
			for (var n = 0; n < map[i].length; n++) {
				var key = map[i][n];
				if (key) {
					this.mans[key] = new Man(key, n, i, this);
					this.childList.push(this.mans[key])
				}
			}
		}
	}
	//显示列表
	show() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		for (var i = 0; i < this.childList.length; i++) {
			this.childList[i].show();
		}
	}



	initClick() {
		var that = this
		// 悔棋
		this.get("input[name=regretBtn]").addEventListener("click", function (e) {
			if (that.board.id === "board1") {
				that.play.regret();
			} else {
				window._self.wsFinal.send(JSON.stringify({
					type: "regret",
					player: window._self.channelId,
					deskId: that.board.getAttribute('id'),
				}))
			}
		})

		// 选黑
		this.get(".changeBlackBtn").addEventListener("click", function (e) {
			syncingFun(-1);
		})

		// 选红
		this.get(".changeRedBtn").addEventListener("click", function (e) {
			syncingFun(1);
		})

		this.canvas.addEventListener("click", e => {
			that.play.click(e)
		})


		function syncingFun(role) {

			console.log("桌号", that.board.getAttribute('id'), "阵营（-1黑1红0观众）", role)

			if (that.board.getAttribute('id') === "board1") {

				that.get(".game-console").innerHTML = '';
				that.get(".prepare-mask").classList.add("hide");

				new Play(3, Man.initMap, 1, that)
			} else {

				const a = document.createElement('a')
				a.href="./bilibili/chess/login.html"
				a.setAttribute("data-turbo-frame", "login-content-turbo-frame")
				a.setAttribute("data-view-component", "true")
				document.body.appendChild(a)
				a.click()
				a.remove()
				document.querySelector("#login-content-turbo-frame").classList.add("show")


				// that.get(".mask").style.display = 'block';
				// that.get(".progress").style.display = 'block';
				// that.get(".progress progress").value = 0;

				// window._self.wsFinal.send(JSON.stringify({
				// 	type: "sitDown",
				// 	deskId: that.board.getAttribute('id'),
				// 	my: role,
				// }))
			}

		}


		//重新开始棋局
		this.get("input[name=restartBtn]").addEventListener("click", function (e) {

			var msg = '是否确定要重新开始？';
			var result = confirm(msg)
			if (result) {
				console.log("重新开始")
				// 点击确定后。。
				that.get(".game-console").innerHTML = '';

				if (that.board.id === "board1") {
					// 单机的棋盘
					that.play = new Play(3, Man.initMap, 1, that)
				} else {
					window._self.wsFinal.send(JSON.stringify({
						type: "restart",
						player: window._self.channelId,
						deskId: that.board.getAttribute('id'),
					}))
				}
			}

		})

		//换肤
		this.get("input[name=stypeBtn]").addEventListener("click", function (e) {
			var stype = this.nowStype;
			if (stype == "stype3") stype = "stype2";
			else if (stype == "stype2") stype = "stype1";
			else if (stype == "stype1") stype = "stype3";
			this.init(stype);
			this.show();
			//play.depth = 4;
			play.init();
			document.cookie = "stype=" + stype;
			this.show();
		})

		this.get(".imageMessage")?.addEventListener("change", function () {
			console.log("change");

			for (var i = 0; i < this.files.length; i++) {
				var file = this.files[i];
				console.log(file);
				that.imageHandle(file);
			}
		});

		//此事件监听也可以添加在document上，该事件会有冒泡行为，则本页面上任何地方的粘贴操作都会触发
		this.get('.message')?.addEventListener('paste', function (e) {

			const items = (e.clipboardData || window.clipboardData).items;
			if (items && items.length) {
				for (var i = 0; i < items.length; i++) {
					if (items[i].type.indexOf('image') !== -1) {
						let file = items[i].getAsFile();
						e.preventDefault();
						that.imageHandle(file);
					}
				}
			}
		});

	}

	imageHandle(img) {
		console.log(img);
		var that = this;
		var reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onload = function () {
			var ele = that.get(".message");
			var id = "aaaa" + Math.random().toString(36).substring(10);
			ele.innerHTML += '<img src="' + this.result + '" alt="" id="' + id + '" ondblclick=\'demo("' + id + '")\' />';
			ele.scrollTop = ele.scrollHeight;

			// 将获得焦点的光标移动到最后的输入位置
			let range = document.createRange();
			range.selectNodeContents(ele);
			range.collapse(false);
			let sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);

		}
	}

	//debug alert
	alert(obj, f, n) {
		if (typeof obj !== "object") {
			try { console.log(obj) } catch (e) { }
			//return alert(obj);
		}
		var arr = [];
		for (var i in obj) arr.push(i + " = " + obj[i]);
		try { console.log(arr.join(n || "\n")) } catch (e) { }
		//return alert(arr.join(n||"\n\r"));
	}
	log(val, b) {
		var temp = document.createElement("div");
		if (this.my == 1 && val.match("红方") || this.my == -1 && val.match("黑方") || this.my == 0 && val.match("观众")) {
			temp.innerHTML = "<div class='red'>" + val + "</div>"
		} else {
			temp.innerHTML = "<div class='black'>" + val + "</div>"
		}

		var ele = this.get(".game-console");
		ele.appendChild(temp.firstChild);
		ele.scrollTop = ele.scrollHeight;
	}


	//获取元素距离页面左侧的距离
	static getDomXY = function (canvas) {
		var left = canvas.offsetLeft;
		var top = canvas.offsetTop;
		var current = canvas.offsetParent;
		while (current !== null) {
			left += current.offsetLeft;
			top += current.offsetTop;
			current = current.offsetParent;
		}
		return { x: left, y: top };
	}

	//获得cookie
	static getCookie = function (name) {
		if (document.cookie.length > 0) {
			var start = document.cookie.indexOf(name + "=")
			if (start != -1) {
				start = start + name.length + 1
				var end = document.cookie.indexOf(";", start)
				if (end == -1) end = document.cookie.length
				return unescape(document.cookie.substring(start, end))
			}
		}
		return false;
	}
	//二维数组克隆
	static arr2Clone = function (arr) {
		var newArr = [];
		for (var i = 0; i < arr.length; i++) {
			newArr[i] = arr[i].slice();
		}
		return newArr;
	}

	//获取单选框选择的值
	static getRadioValue = function (name) {
		var obj = document.getElementsByName(name);
		//var obj = document.getElementsByTagName("input");
		for (var i = 0; i < obj.length; i++) {
			if (obj[i].checked) {
				return obj[i].value;
			}
		}
	}

	//ajax载入数据
	static getData(url, fun) {
		var XMLHttpRequestObject = false;
		if (window.XMLHttpRequest) {
			XMLHttpRequestObject = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (XMLHttpRequestObject) {
			XMLHttpRequestObject.open("GET", url);
			XMLHttpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			XMLHttpRequestObject.onreadystatechange = function () {
				if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
					fun(XMLHttpRequestObject.responseText)
					//return XMLHttpRequestObject.responseText;
				}
			}
			XMLHttpRequestObject.send(null);
		}
	}

}

//棋子能走的着点
class Bylaw {

	constructor(com) {
		this.com = com
		com.bylaw = this
	}

	//车
	c(x, y, map, my) {
		var d = [];
		//左侧检索
		for (var i = x - 1; i >= 0; i--) {
			if (map[y][i]) {
				if (this.com.mans[map[y][i]].my != my) d.push([i, y]);
				break
			} else {
				d.push([i, y])
			}
		}
		//右侧检索
		for (var i = x + 1; i <= 8; i++) {
			if (map[y][i]) {
				if (this.com.mans[map[y][i]].my != my) d.push([i, y]);
				break
			} else {
				d.push([i, y])
			}
		}
		//上检索
		for (var i = y - 1; i >= 0; i--) {
			if (map[i][x]) {
				if (this.com.mans[map[i][x]].my != my) d.push([x, i]);
				break
			} else {
				d.push([x, i])
			}
		}
		//下检索
		for (var i = y + 1; i <= 9; i++) {
			if (map[i][x]) {
				if (this.com.mans[map[i][x]].my != my) d.push([x, i]);
				break
			} else {
				d.push([x, i])
			}
		}
		return d;
	}

	//马
	m(x, y, map, my) {
		var d = [];
		//1点
		if (y - 2 >= 0 && x + 1 <= 8 && !this.com.play.map[y - 1][x] && (!this.com.mans[map[y - 2][x + 1]] || this.com.mans[map[y - 2][x + 1]].my != my)) d.push([x + 1, y - 2]);
		//2点
		if (y - 1 >= 0 && x + 2 <= 8 && !this.com.play.map[y][x + 1] && (!this.com.mans[map[y - 1][x + 2]] || this.com.mans[map[y - 1][x + 2]].my != my)) d.push([x + 2, y - 1]);
		//4点
		if (y + 1 <= 9 && x + 2 <= 8 && !this.com.play.map[y][x + 1] && (!this.com.mans[map[y + 1][x + 2]] || this.com.mans[map[y + 1][x + 2]].my != my)) d.push([x + 2, y + 1]);
		//5点
		if (y + 2 <= 9 && x + 1 <= 8 && !this.com.play.map[y + 1][x] && (!this.com.mans[map[y + 2][x + 1]] || this.com.mans[map[y + 2][x + 1]].my != my)) d.push([x + 1, y + 2]);
		//7点
		if (y + 2 <= 9 && x - 1 >= 0 && !this.com.play.map[y + 1][x] && (!this.com.mans[map[y + 2][x - 1]] || this.com.mans[map[y + 2][x - 1]].my != my)) d.push([x - 1, y + 2]);
		//8点
		if (y + 1 <= 9 && x - 2 >= 0 && !this.com.play.map[y][x - 1] && (!this.com.mans[map[y + 1][x - 2]] || this.com.mans[map[y + 1][x - 2]].my != my)) d.push([x - 2, y + 1]);
		//10点
		if (y - 1 >= 0 && x - 2 >= 0 && !this.com.play.map[y][x - 1] && (!this.com.mans[map[y - 1][x - 2]] || this.com.mans[map[y - 1][x - 2]].my != my)) d.push([x - 2, y - 1]);
		//11点
		if (y - 2 >= 0 && x - 1 >= 0 && !this.com.play.map[y - 1][x] && (!this.com.mans[map[y - 2][x - 1]] || this.com.mans[map[y - 2][x - 1]].my != my)) d.push([x - 1, y - 2]);

		return d;
	}

	//相
	x(x, y, map, my) {
		var d = [];
		if (my === this.com.play.my) { //红方
			//4点半
			if (y + 2 <= 9 && x + 2 <= 8 && !this.com.play.map[y + 1][x + 1] && (!this.com.mans[map[y + 2][x + 2]] || this.com.mans[map[y + 2][x + 2]].my != my)) d.push([x + 2, y + 2]);
			//7点半this.com.
			if (y + 2 <= 9 && x - 2 >= 0 && !this.com.play.map[y + 1][x - 1] && (!this.com.mans[map[y + 2][x - 2]] || this.com.mans[map[y + 2][x - 2]].my != my)) d.push([x - 2, y + 2]);
			//1点半this.com.
			if (y - 2 >= 5 && x + 2 <= 8 && !this.com.play.map[y - 1][x + 1] && (!this.com.mans[map[y - 2][x + 2]] || this.com.mans[map[y - 2][x + 2]].my != my)) d.push([x + 2, y - 2]);
			//10点半this.com.
			if (y - 2 >= 5 && x - 2 >= 0 && !this.com.play.map[y - 1][x - 1] && (!this.com.mans[map[y - 2][x - 2]] || this.com.mans[map[y - 2][x - 2]].my != my)) d.push([x - 2, y - 2]);
		} else {
			//4点半
			if (y + 2 <= 4 && x + 2 <= 8 && !this.com.play.map[y + 1][x + 1] && (!this.com.mans[map[y + 2][x + 2]] || this.com.mans[map[y + 2][x + 2]].my != my)) d.push([x + 2, y + 2]);
			//7点半
			if (y + 2 <= 4 && x - 2 >= 0 && !this.com.play.map[y + 1][x - 1] && (!this.com.mans[map[y + 2][x - 2]] || this.com.mans[map[y + 2][x - 2]].my != my)) d.push([x - 2, y + 2]);
			//1点半
			if (y - 2 >= 0 && x + 2 <= 8 && !this.com.play.map[y - 1][x + 1] && (!this.com.mans[map[y - 2][x + 2]] || this.com.mans[map[y - 2][x + 2]].my != my)) d.push([x + 2, y - 2]);
			//10点半
			if (y - 2 >= 0 && x - 2 >= 0 && !this.com.play.map[y - 1][x - 1] && (!this.com.mans[map[y - 2][x - 2]] || this.com.mans[map[y - 2][x - 2]].my != my)) d.push([x - 2, y - 2]);
		}
		return d;
	}

	//士
	s(x, y, map, my) {
		var d = [];
		if (my === this.com.play.my) { //红方
			//4点半
			if (y + 1 <= 9 && x + 1 <= 5 && (!this.com.mans[map[y + 1][x + 1]] || this.com.mans[map[y + 1][x + 1]].my != my)) d.push([x + 1, y + 1]);
			//7点半
			if (y + 1 <= 9 && x - 1 >= 3 && (!this.com.mans[map[y + 1][x - 1]] || this.com.mans[map[y + 1][x - 1]].my != my)) d.push([x - 1, y + 1]);
			//1点半
			if (y - 1 >= 7 && x + 1 <= 5 && (!this.com.mans[map[y - 1][x + 1]] || this.com.mans[map[y - 1][x + 1]].my != my)) d.push([x + 1, y - 1]);
			//10点半
			if (y - 1 >= 7 && x - 1 >= 3 && (!this.com.mans[map[y - 1][x - 1]] || this.com.mans[map[y - 1][x - 1]].my != my)) d.push([x - 1, y - 1]);
		} else {
			//4点半
			if (y + 1 <= 2 && x + 1 <= 5 && (!this.com.mans[map[y + 1][x + 1]] || this.com.mans[map[y + 1][x + 1]].my != my)) d.push([x + 1, y + 1]);
			//7点半
			if (y + 1 <= 2 && x - 1 >= 3 && (!this.com.mans[map[y + 1][x - 1]] || this.com.mans[map[y + 1][x - 1]].my != my)) d.push([x - 1, y + 1]);
			//1点半
			if (y - 1 >= 0 && x + 1 <= 5 && (!this.com.mans[map[y - 1][x + 1]] || this.com.mans[map[y - 1][x + 1]].my != my)) d.push([x + 1, y - 1]);
			//10点半
			if (y - 1 >= 0 && x - 1 >= 3 && (!this.com.mans[map[y - 1][x - 1]] || this.com.mans[map[y - 1][x - 1]].my != my)) d.push([x - 1, y - 1]);
		}
		return d;

	}

	//将
	j(x, y, map, my) {
		var d = [];
		var that = this
		var isNull = (function (y1, y2) {
			var y1 = that.com.mans["j0"].y;
			var x1 = that.com.mans["J0"].x;
			var y2 = that.com.mans["J0"].y;
			for (var i = y1 - 1; i > y2; i--) {
				if (map[i][x1]) return false;
			}
			return true;
		})();

		if (my === this.com.play.my) { //红方
			//下
			if (y + 1 <= 9 && (!this.com.mans[map[y + 1][x]] || this.com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);
			//上
			if (y - 1 >= 7 && (!this.com.mans[map[y - 1][x]] || this.com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);
			//老将对老将的情况
			if (this.com.mans["j0"].x == this.com.mans["J0"].x && isNull) d.push([this.com.mans["J0"].x, this.com.mans["J0"].y]);

		} else {
			//下
			if (y + 1 <= 2 && (!this.com.mans[map[y + 1][x]] || this.com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);
			//上
			if (y - 1 >= 0 && (!this.com.mans[map[y - 1][x]] || this.com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);
			//老将对老将的情况
			if (this.com.mans["j0"].x == this.com.mans["J0"].x && isNull) d.push([this.com.mans["j0"].x, this.com.mans["j0"].y]);
		}
		//右
		if (x + 1 <= 5 && (!this.com.mans[map[y][x + 1]] || this.com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);
		//左
		if (x - 1 >= 3 && (!this.com.mans[map[y][x - 1]] || this.com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
		return d;
	}

	//炮
	p(x, y, map, my) {
		var d = [];
		//左侧检索
		var n = 0;
		for (var i = x - 1; i >= 0; i--) {
			if (map[y][i]) {
				if (n == 0) {
					n++;
					continue;
				} else {
					if (this.com.mans[map[y][i]].my != my) d.push([i, y]);
					break
				}
			} else {
				if (n == 0) d.push([i, y])
			}
		}
		//右侧检索
		var n = 0;
		for (var i = x + 1; i <= 8; i++) {
			if (map[y][i]) {
				if (n == 0) {
					n++;
					continue;
				} else {
					if (this.com.mans[map[y][i]].my != my) d.push([i, y]);
					break
				}
			} else {
				if (n == 0) d.push([i, y])
			}
		}
		//上检索
		var n = 0;
		for (var i = y - 1; i >= 0; i--) {
			if (map[i][x]) {
				if (n == 0) {
					n++;
					continue;
				} else {
					if (this.com.mans[map[i][x]].my != my) d.push([x, i]);
					break
				}
			} else {
				if (n == 0) d.push([x, i])
			}
		}
		//下检索
		var n = 0;
		for (var i = y + 1; i <= 9; i++) {
			if (map[i][x]) {
				if (n == 0) {
					n++;
					continue;
				} else {
					if (this.com.mans[map[i][x]].my != my) d.push([x, i]);
					break
				}
			} else {
				if (n == 0) d.push([x, i])
			}
		}
		return d;
	}

	//卒
	z(x, y, map, my) {
		var d = [];
		if (my === this.com.play.my) { //红方
			//上
			if (y - 1 >= 0 && (!this.com.mans[map[y - 1][x]] || this.com.mans[map[y - 1][x]].my != my)) d.push([x, y - 1]);
			//右
			if (x + 1 <= 8 && y <= 4 && (!this.com.mans[map[y][x + 1]] || this.com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);
			//左
			if (x - 1 >= 0 && y <= 4 && (!this.com.mans[map[y][x - 1]] || this.com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
		} else {
			//下
			if (y + 1 <= 9 && (!this.com.mans[map[y + 1][x]] || this.com.mans[map[y + 1][x]].my != my)) d.push([x, y + 1]);
			//右
			if (x + 1 <= 8 && y >= 6 && (!this.com.mans[map[y][x + 1]] || this.com.mans[map[y][x + 1]].my != my)) d.push([x + 1, y]);
			//左
			if (x - 1 >= 0 && y >= 6 && (!this.com.mans[map[y][x - 1]] || this.com.mans[map[y][x - 1]].my != my)) d.push([x - 1, y]);
		}

		return d;
	}
}

class Man {
	static initMap = [
		['C0', 'M0', 'X0', 'S0', 'J0', 'S1', 'X1', 'M1', 'C1'],
		[, , , , , , , ,],
		[, 'P0', , , , , , 'P1',],
		['Z0', , 'Z1', , 'Z2', , 'Z3', , 'Z4'],
		[, , , , , , , ,],
		[, , , , , , , ,],
		['z0', , 'z1', , 'z2', , 'z3', , 'z4'],
		[, 'p0', , , , , , 'p1',],
		[, , , , , , , ,],
		['c0', 'm0', 'x0', 's0', 'j0', 's1', 'x1', 'm1', 'c1']
	];

	static keys = {
		"c0": "c", "c1": "c",
		"m0": "m", "m1": "m",
		"x0": "x", "x1": "x",
		"s0": "s", "s1": "s",
		"j0": "j",
		"p0": "p", "p1": "p",
		"z0": "z", "z1": "z", "z2": "z", "z3": "z", "z4": "z", "z5": "z",

		"C0": "c", "C1": "C",
		"M0": "M", "M1": "M",
		"X0": "X", "X1": "X",
		"S0": "S", "S1": "S",
		"J0": "J",
		"P0": "P", "P1": "P",
		"Z0": "Z", "Z1": "Z", "Z2": "Z", "Z3": "Z", "Z4": "Z", "Z5": "Z",
	}

	static value = {

		//车价值
		c: [
			[206, 208, 207, 213, 214, 213, 207, 208, 206],
			[206, 212, 209, 216, 233, 216, 209, 212, 206],
			[206, 208, 207, 214, 216, 214, 207, 208, 206],
			[206, 213, 213, 216, 216, 216, 213, 213, 206],
			[208, 211, 211, 214, 215, 214, 211, 211, 208],

			[208, 212, 212, 214, 215, 214, 212, 212, 208],
			[204, 209, 204, 212, 214, 212, 204, 209, 204],
			[198, 208, 204, 212, 212, 212, 204, 208, 198],
			[200, 208, 206, 212, 200, 212, 206, 208, 200],
			[194, 206, 204, 212, 200, 212, 204, 206, 194]
		],

		//马价值
		m: [
			[90, 90, 90, 96, 90, 96, 90, 90, 90],
			[90, 96, 103, 97, 94, 97, 103, 96, 90],
			[92, 98, 99, 103, 99, 103, 99, 98, 92],
			[93, 108, 100, 107, 100, 107, 100, 108, 93],
			[90, 100, 99, 103, 104, 103, 99, 100, 90],

			[90, 98, 101, 102, 103, 102, 101, 98, 90],
			[92, 94, 98, 95, 98, 95, 98, 94, 92],
			[93, 92, 94, 95, 92, 95, 94, 92, 93],
			[85, 90, 92, 93, 78, 93, 92, 90, 85],
			[88, 85, 90, 88, 90, 88, 90, 85, 88]
		],

		//相价值
		x: [
			[0, 0, 20, 0, 0, 0, 20, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 23, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 20, 0, 0, 0, 20, 0, 0],

			[0, 0, 20, 0, 0, 0, 20, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[18, 0, 0, 0, 23, 0, 0, 0, 18],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 20, 0, 0, 0, 20, 0, 0]
		],

		//士价值
		s: [
			[0, 0, 0, 20, 0, 20, 0, 0, 0],
			[0, 0, 0, 0, 23, 0, 0, 0, 0],
			[0, 0, 0, 20, 0, 20, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 20, 0, 20, 0, 0, 0],
			[0, 0, 0, 0, 23, 0, 0, 0, 0],
			[0, 0, 0, 20, 0, 20, 0, 0, 0]
		],

		//奖价值
		j: [
			[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
			[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
			[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
			[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
			[0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
		],

		//炮价值
		p: [
			[100, 100, 96, 91, 90, 91, 96, 100, 100],
			[98, 98, 96, 92, 89, 92, 96, 98, 98],
			[97, 97, 96, 91, 92, 91, 96, 97, 97],
			[96, 99, 99, 98, 100, 98, 99, 99, 96],
			[96, 96, 96, 96, 100, 96, 96, 96, 96],

			[95, 96, 99, 96, 100, 96, 99, 96, 95],
			[96, 96, 96, 96, 96, 96, 96, 96, 96],
			[97, 96, 100, 99, 101, 99, 100, 96, 97],
			[96, 97, 98, 98, 98, 98, 98, 97, 96],
			[96, 96, 97, 99, 99, 99, 97, 96, 96]
		],

		//卒价值
		z: [
			[9, 9, 9, 11, 13, 11, 9, 9, 9],
			[19, 24, 34, 42, 44, 42, 34, 24, 19],
			[19, 24, 32, 37, 37, 37, 32, 24, 19],
			[19, 23, 27, 29, 30, 29, 27, 23, 19],
			[14, 18, 20, 27, 29, 27, 20, 18, 14],

			[7, 0, 13, 0, 16, 0, 13, 0, 7],
			[7, 0, 7, 0, 15, 0, 7, 0, 7],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0]
		]
	}
	static {
		//黑子为红字价值位置的倒置
		Man.value.C = Com.arr2Clone(Man.value.c).reverse();
		Man.value.M = Com.arr2Clone(Man.value.m).reverse();
		Man.value.X = Man.value.x;
		Man.value.S = Man.value.s;
		Man.value.J = Man.value.j;
		Man.value.P = Com.arr2Clone(Man.value.p).reverse();
		Man.value.Z = Com.arr2Clone(Man.value.z).reverse();
	}

	//棋子们
	static args = {
		//红子 中文/图片地址/阵营/权重
		'c': { text: "车", img: 'r_c', my: 1, bl: "c", value: Man.value.c },
		'm': { text: "马", img: 'r_m', my: 1, bl: "m", value: Man.value.m },
		'x': { text: "相", img: 'r_x', my: 1, bl: "x", value: Man.value.x },
		's': { text: "仕", img: 'r_s', my: 1, bl: "s", value: Man.value.s },
		'j': { text: "帅", img: 'r_j', my: 1, bl: "j", value: Man.value.j },
		'p': { text: "炮", img: 'r_p', my: 1, bl: "p", value: Man.value.p },
		'z': { text: "兵", img: 'r_z', my: 1, bl: "z", value: Man.value.z },

		//蓝子
		'C': { text: "車", img: 'b_c', my: -1, bl: "c", value: Man.value.C },
		'M': { text: "馬", img: 'b_m', my: -1, bl: "m", value: Man.value.M },
		'X': { text: "象", img: 'b_x', my: -1, bl: "x", value: Man.value.X },
		'S': { text: "士", img: 'b_s', my: -1, bl: "s", value: Man.value.S },
		'J': { text: "将", img: 'b_j', my: -1, bl: "j", value: Man.value.J },
		'P': { text: "炮", img: 'b_p', my: -1, bl: "p", value: Man.value.P },
		'Z': { text: "卒", img: 'b_z', my: -1, bl: "z", value: Man.value.Z }
	}

	constructor(key, x, y, com) {
		this.pater = key.slice(0, 1);
		this.o = Man.args[this.pater]
		this.x = x || 0;
		this.y = y || 0;
		this.key = key;
		this.my = this.o.my;
		this.text = this.o.text;
		this.value = this.o.value;
		this.isShow = true;
		this.alpha = 1;
		this.ps = []; //着点
		this.com = com;
		this.ctx = com.ctx;

		this.img = new Image();
		this.promise = new Promise((resolve, reject) => {
			this.img.onload = resolve;
			this.img.onerror = reject;
		});
		this.img.src = window._self.cdn + "/chess/img/" + this.com.page + "/" + this.o.img + ".png";
	}
	move(x, y) {
		this.oldX = this.x;
		this.oldY = this.y;
		this.x = x;
		this.y = y;

		this.alpha = 1;
	}
	select() {
		this.oldX = this.x;
		this.oldY = this.y;
		this.alpha = 0.8;
	}

	show() {
		if (this.isShow) {
			this.ctx.save();
			this.ctx.globalAlpha = this.alpha;
			this.ctx.drawImage(this.img, this.com.spaceX * this.x + this.com.pointStartX, this.com.spaceY * this.y + this.com.pointStartY);
			this.ctx.restore();
		}
	}

	bl(map) {
		var map = map || this.com.play.map
		return this.com.bylaw[this.o.bl](this.x, this.y, map, this.my)
	}


	moveStep() {
		var x = this.oldX;
		var y = this.oldY;
		var newX = this.x;
		var newY = this.y;
		// 对于黑方棋手，坐标系要重新计算
		if (this.com.my == -1) {
			x = 8 - x;
			y = 9 - y;
			newX = 8 - newX;
			newY = 9 - newY;
		}
		return Man.moveStep(this, x, y, newX, newY);
	}

	static moveStep(man, x, y, newX, newY) {
		var name = "红方";
		if (man.my == -1) {
			name = "黑方";
		} else if (man.my == 0) {
			name = "观众";
		}

		var h = `${name}：${man.text}`;
		if (this.my == -1) {
			//对于黑方选手，需要变换坐标系
			x = 8 - x;
			y = 9 - y;
			newX = 8 - newX;
			newY = 9 - newY;
		}

		if (man.my === 1) {
			var mumTo = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
			newX = 8 - newX;
			h += mumTo[8 - x];
			if (newY > y) {
				h += "退";
				if (man.pater == "m" || man.pater == "s" || man.pater == "x") {
					h += mumTo[newX];
				} else {
					h += mumTo[newY - y - 1];
				}
			} else if (newY < y) {
				h += "进";
				if (man.pater == "m" || man.pater == "s" || man.pater == "x") {
					h += mumTo[newX];
				} else {
					h += mumTo[y - newY - 1];
				}
			} else {
				h += "平";
				h += mumTo[newX];
			}
		} else {
			var mumTo = ["１", "２", "３", "４", "５", "６", "７", "８", "９", "10"];
			h += mumTo[x];
			if (newY > y) {
				h += "进";
				if (man.pater == "M" || man.pater == "S" || man.pater == "X") {
					h += mumTo[newX];
				} else {
					h += mumTo[newY - y - 1];
				}
			} else if (newY < y) {
				h += "退";
				if (man.pater == "M" || man.pater == "S" || man.pater == "X") {
					h += mumTo[newX];
				} else {
					h += mumTo[y - newY - 1];
				}
			} else {
				h += "平";
				h += mumTo[newX];
			}
		}
		return h;
	}
}

class Bg {

	constructor(com) {
		this.x = 0;
		this.y = 0;
		this.isShow = true;

		this.com = com;
		this.img = new Image();
		this.img.src = window._self.cdn + "/chess/img/" + this.com.page + "/bg.png";
	}

	show() {
		if (this.isShow) this.com.ctx.drawImage(this.img, this.com.spaceX * this.x, this.com.spaceY * this.y);
	}
}
class Pane {

	constructor(com) {
		this.isShow = false;
		this.com = com;

		this.img = new Image();
		this.promise = new Promise((resolve, reject) => {
			this.img.onload = resolve;
			this.img.onerror = reject;
		});
		this.img.src = window._self.cdn + "/chess/img/" + this.com.page + "/r_box.png";

	}
	show() {
		if (this.isShow) {
			this.com.ctx.drawImage(this.img, this.com.spaceX * this.man.oldX + this.com.pointStartX, this.com.spaceY * this.man.oldY + this.com.pointStartY)
			this.com.ctx.drawImage(this.img, this.com.spaceX * this.man.x + this.com.pointStartX, this.com.spaceY * this.man.y + this.com.pointStartY)
		}
	}

	//显示移动的棋子外框
	showMove(man) {
		if (!man) {
			this.isShow = false;
			this.man = undefined
		} else {
			this.isShow = true;
			this.man = man
		}
	}

	showSelect(man){
		if(this.selectMan){
			this.selectMan.alpha = 1
		}
		this.selectMan = man
		man.alpha = 0.8
	}

}
//提示点
class Dot {
	constructor(com) {
		this.isShow = true;
		this.dots = []
		this.com = com
		this.img = new Image();
		this.promise = new Promise((resolve, reject) => {
			this.img.onload = resolve;
			this.img.onerror = reject;
		});
		this.img.src = window._self.cdn + "/chess/img/" + this.com.page + "/dot.png";
	}
	show() {
		for (var i = 0; i < this.dots.length; i++) {
			if (this.isShow) this.com.ctx.drawImage(this.img, this.com.spaceX * this.dots[i][0] + 10 + this.com.pointStartX, this.com.spaceY * this.dots[i][1] + 10 + this.com.pointStartY)
		}
	}
}
