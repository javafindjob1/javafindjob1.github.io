class Play {
	constructor(com) {
		this.com = com
	}

	init(depth, map) {
		var map = map || Man.initMap;
		var depth = depth || 3
		this.my = this.com.my;				//玩家方
		this.nowMap = map;
		this.map = Com.arr2Clone(map);		//初始化棋盘
		this.nowManKey = false;			//现在要操作的棋子
		this.pace = [];				//记录每一步
		this.isPlay = true;			//是否能走棋

		// this.bylaw = this.com.bylaw;
		// this.show = this.com.show;
		// this.showPane = this.com.showPane;
		this.isOffensive = true;			//是否先手
		this.depth = depth;			//搜索深度
		this.isFoul = false;			//是否犯规长将
		this.com.pane.isShow = false;			//隐藏方块

		//清除所有旗子
		this.mans = this.com.mans;
		//这么搞有点2，以后说不定出啥问题，先放着记着以后改
		this.com.childList.length = 3

		//初始化棋子
		this.com.createMans(map)		//生成棋子
		this.com.bg.show();
		this.com.show();

		this.AI = new AI(this.com)

		//绑定点击事件
		var that = this
		this.com.canvas.addEventListener("click", e => {
			if (!that.isPlay) return false;
			var key = that.getClickMan(e);
			var point = that.getClickPoint(e);

			var x = point.x;
			var y = point.y;

			if (key) {
				that.clickMan(key, x, y);
			} else {
				that.clickPoint(x, y);
			}
			that.isFoul = that.checkFoul();//检测是不是长将
		})

	}

	//悔棋
	regret() {
		var map = Com.arr2Clone(Man.initMap);
		//初始化所有棋子
		for (var i = 0; i < map.length; i++) {
			for (var n = 0; n < map[i].length; n++) {
				var key = map[i][n];
				if (key) {
					this.com.mans[key].x = n;
					this.com.mans[key].y = i;
					this.com.mans[key].isShow = true;
				}
			}
		}
		var pace = this.pace;
		pace.pop();
		pace.pop();

		for (var i = 0; i < pace.length; i++) {
			var p = pace[i].split("")
			var x = parseInt(p[0], 10);
			var y = parseInt(p[1], 10);
			var newX = parseInt(p[2], 10);
			var newY = parseInt(p[3], 10);
			var key = map[y][x];

			var cMan = map[newY][newX];
			if (cMan) this.com.mans[map[newY][newX]].isShow = false;
			this.com.mans[key].move(newX, newY)
			map[newY][newX] = key;
			delete map[y][x];
			if (i == pace.length - 1) {
				this.com.pane.setMan(this.com.mans[key])
			}
		}
		this.map = map;
		this.my = this.com.my;
		this.isPlay = true;
		this.com.dot.isShow = false;
		this.com.show();
	}

	//点击棋子，两种情况，选中或者吃子
	clickMan(key, x, y) {
		//man为选中的棋子
		var man = this.com.mans[key];
		var nowMan = this.com.mans[this.nowManKey]
		//吃子
		if (this.nowManKey && this.nowManKey != key && man.my != nowMan.my) {
			//man为被吃掉的棋子
			if (this.indexOfPs(nowMan.ps, [x, y])) {
				man.isShow = false;
				var pace = nowMan.x + "" + nowMan.y

				// todo 打印招式
				this.com.log(this.com.createMove(this.map, nowMan.x, nowMan.y, x, y))
				nowMan.move(x, y)
				this.com.pane.setMan(nowMan)

				this.pace.push(pace + x + y);

				if (this.my == -1) {
					//对于黑方选手，需要变换坐标系
					var arr = [];
					arr[0] = 8 - pace[0];
					arr[1] = 9 - pace[1];
					arr[2] = 8 - x;
					arr[3] = 9 - y;
					// send(this.my + arr.join(""));
				} else {
					// send(this.my + pace + x + y);
				}

				this.nowManKey = false;
				this.isPlay = false
				this.com.pane.isShow = false;
				this.com.dot.dots = [];
				this.com.show()
				document.querySelector("#clickAudio").play();
				var that = this
				setTimeout(()=>{
					that.AIPlay()
				}, 500);
				if (key == "j0") this.showWin(-1);
				if (key == "J0") this.showWin(1);
			}
		} else {
			// 选中棋子
			console.log(this.my + "玩家选中棋子：" + man.my + man.text)
			if (man.my === this.my) {
				if (nowMan) nowMan.alpha = 1;
				this.nowManKey = key;
				this.com.mans[key].ps = this.com.mans[key].bl(); //获得所有能着点
				this.com.dot.dots = this.com.mans[key].ps
				this.com.pane.setMan(man);
				man.alpha=0.8

				this.com.show();
				//this.com.get("selectAudio").start(0);
				document.querySelector("#selectAudio").play();
			}
		}
	}

	//点击着点
	clickPoint(x, y) {
		var key = this.nowManKey;
		var man = this.com.mans[key];
		if (key) {
			if (this.indexOfPs(this.com.mans[key].ps, [x, y])) {
				var pace = man.x + "" + man.y

				this.com.log(this.com.createMove(this.map, man.x, man.y, x, y))
				man.move(x,y)
				this.pace.push(pace + x + y);
				if (this.my == -1) {
					//对于黑方选手，需要变换坐标系
					var arr = [];
					arr[0] = 8 - pace[0];
					arr[1] = 9 - pace[1];
					arr[2] = 8 - x;
					arr[3] = 9 - y;
					// send(this.my + arr.join(""));
				} else {
					// send(this.my + pace + x + y);
				}
				
				this.nowManKey = false;
				this.com.dot.dots = [];
				this.com.pane.setMan(man)
				this.com.show();
				document.querySelector("#clickAudio").play();
				var that = this
				setTimeout(()=>{
					that.AIPlay()
				}, 500);
			} else {
				//alert("不能这么走哦！")
			}
		}

	}

	//Ai自动走棋
	AIPlay(p) {
		if (!p ) {
			// 大厅模式的话，不使用AI
			// return;
		}

		//return
		var pace = p || this.AI.init(this.pace.join(""))

		console.log("执行命令：" + pace)
		if (!pace) {
			this.showWin(1);
			return;
		}

		this.pace.push(pace.join(""));
		var key = this.map[pace[1]][pace[0]]
		this.nowManKey = key;

		// todo 记录招式
		this.com.log(this.com.moveStep(this.com.mans[key], pace[0], pace[1], pace[2], pace[3]))

		var key = this.map[pace[3]][pace[2]];
		if (key) {
			this.AIclickMan(key, pace[2], pace[3]);
		} else {
			this.AIclickPoint(pace[2], pace[3]);
		}
		
		this.isPlay = true;
		document.querySelector("#clickAudio").play();
	}

	//检查是否长将
	checkFoul() {
		var p = this.pace;
		var len = parseInt(p.length, 10);
		if (len > 11 && p[len - 1] == p[len - 5] && p[len - 5] == p[len - 9]) {
			return p[len - 4].split("");
		}
		return false;
	}

	AIclickMan(key, x, y) {
		// man为被吃的子
		var man = this.com.mans[key];
		man.isShow = false;
		var nowMan = this.com.mans[this.nowManKey]
		delete this.map[nowMan.y][nowMan.x];
		this.map[y][x] = this.nowManKey;
		nowMan.move(x, y)
		this.com.pane.setMan(nowMan)
		this.com.show()

		this.nowManKey = false;

		if (key == "j0") this.showWin(-1);
		if (key == "J0") this.showWin(1);
	}

	AIclickPoint(x, y) {
		var key = this.nowManKey;
		if (key) {
			var man = this.com.mans[key];
			var oldX = man.x
			var oldY = man.y
			delete this.map[oldY][oldX];
			this.map[y][x] = key;
			man.move(x,y)
			this.com.pane.setMan(man)

			this.nowManKey = false;

		}
		this.com.show();
	}


	indexOfPs(ps, xy) {
		for (var i = 0; i < ps.length; i++) {
			if (ps[i][0] == xy[0] && ps[i][1] == xy[1]) return true;
		}
		return false;

	}

	//获得点击的着点
	getClickPoint(e) {
		var domXY = Com.getDomXY(this.com.canvas);
		var x = Math.round((e.pageX - domXY.x - this.com.pointStartX - 20) / this.com.spaceX)
		var y = Math.round((e.pageY - domXY.y - this.com.pointStartY - 20) / this.com.spaceY)
		return { "x": x, "y": y }
	}

	//获得棋子
	getClickMan(e) {
		var clickXY = this.getClickPoint(e);
		var x = clickXY.x;
		var y = clickXY.y;
		if (x < 0 || x > 8 || y < 0 || y > 9) return false;
		return (this.map[y][x] && this.map[y][x] != "0") ? this.map[y][x] : false;
	}

	showWin(my) {
		this.isPlay = false;
		if (my === 1) {
			alert("恭喜你，你赢了！");
		} else {
			alert("很遗憾，你输了！");
		}
	}
}
