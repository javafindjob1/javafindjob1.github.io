class Play {
	constructor(depth = 3, map = Man.initMap, my = 1, pace=[], com) {
		this.depth = depth;			//搜索深度
		this.nowMap = map;
		this.my = my;				//玩家方
		this.com = com
		this.com.my = my;
		this.com.play = this;
		this.com.bylaw = com.bylaw || new Bylaw(com)

		this.map = Com.arr2Clone(map);		//初始化棋盘
		this.nowManKey = false;			//现在要操作的棋子
		this.pace = pace;				//记录每一步
		this.isPlay = true;			//是否能走棋

		this.isOffensive = true;			//是否先手
		this.isFoul = false;			//是否犯规长将

		var lastPace = pace.at(-1)
		if(lastPace){
			// 如果重新加载棋盘，则显示最后一手棋
			var lastArr = lastPace.split("")
			var lastKey = map[lastArr[3]][lastArr[2]]
			this.com.repaint(this.map, lastKey, lastArr[0], lastArr[1])
		}else{
			this.com.repaint(this.map)
		}
		this.mans = this.com.mans

		this.AI = new AI(this.com)
	}

	// 点击棋子事件
	click(e) {
		if (!this.isPlay) return false;
		var key = this.getClickMan(e);
		var point = this.getClickPoint(e);

		var x = point.x;
		var y = point.y;

		if (key) {
			this.clickMan(key, x, y);
		} else {
			this.clickPoint(x, y);
		}
		this.isFoul = this.checkFoul();//检测是不是长将
	}

	//悔棋
	regret(step = 2) {
		step = Math.min(step, this.pace.length)
		for (var i = 0; i < step; i++) {
			var pace = this.pace.pop();
			console.log("退回", pace)
			var arr = pace.split("")

			var key = this.map[arr[3]][arr[2]]
			this.map[arr[1]][arr[0]] = this.map[arr[3]][arr[2]]
			this.mans[key].move(arr[0], arr[1])
			if (pace.length > 4) {
				var eatedMan = pace.substring(4)
				this.map[arr[3]][arr[2]] = eatedMan
				this.mans[eatedMan].isShow = true
			} else {
				delete this.map[arr[3]][arr[2]]
			}
		}

		// 显示最后一手棋
		var lastPace = this.pace.at(-1)
		if (lastPace) {
			var lastArr = lastPace.split("")
			var lastKey = this.map[lastArr[3]][lastArr[2]]
			this.com.pane.showMove(this.mans[lastKey])
		} else {
			this.com.pane.showMove(null)
		}

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

				this.moveMan(nowMan, x, y)
				this.com.log(nowMan.moveStep())
				
				this.nowManKey = false;
				this.isPlay = false
				this.com.pane.showMove(nowMan)
				this.com.dot.dots = [];
				this.com.show()
				document.querySelector("#clickAudio").play();

				this.sendPace()

				if (key == "j0") this.showWin(-1);
				if (key == "J0") this.showWin(1);
			}
		} else {
			// 选中棋子
			console.log(this.my + "玩家选中棋子：" + man.my + man.text, man)
			if (man.my === this.my) {
				// if (nowMan) nowMan.alpha = 1;
				this.nowManKey = key;
				this.com.mans[key].ps = this.com.mans[key].bl(); //获得所有能着点
				this.com.dot.dots = this.com.mans[key].ps
				this.com.pane.showSelect(man);

				this.com.show();
				//this.com.get("selectAudio").start(0);
				document.querySelector("#selectAudio").play();
			}
		}
	}

	//点击着点
	clickPoint(x, y) {
		var key = this.nowManKey;
		if (key) {
			var man = this.com.mans[key];
			if (this.indexOfPs(man.ps, [x, y])) {

				this.moveMan(man, x, y)
				
				this.com.log(man.moveStep())
				this.nowManKey = false;
				this.com.dot.dots = [];
				this.com.pane.showMove(man)
				this.com.show();
				document.querySelector("#clickAudio").play();

				this.sendPace()
			} else {
				//alert("不能这么走哦！")
			}
		}

	}

	
	//把坐标生成着法
	moveMan(man, newX, newY) {
		const {x, y} = man
		// 单纯移动棋子，eatedMan为空
		var eatedMan = this.map[newY][newX]
		console.log("吃掉了", eatedMan)
		this.pace.push("" + x + y + newX + newY + (eatedMan?eatedMan:""));

		man.move(newX, newY)
		this.map[newY][newX] = man.key;
		delete this.map[y][x];
	}


	sendPace() {
		if (this.com.board.id === 'board1') {
			var that = this
			setTimeout(() => {
				that.AIPlay()
			}, 500);
			return
		}

		const paceS = this.pace.at(-1)
		const pace = paceS.split("")
		if (this.my == -1) {
			//对于黑方选手，需要变换坐标系
			var arr = [];
			arr[0] = 8 - pace[0];
			arr[1] = 9 - pace[1];
			arr[2] = 8 - pace[2];
			arr[3] = 9 - pace[3];
			const eatedMan = paceS.substring(4)
			window._self.wsFinal.send(JSON.stringify({
				type: "pace",
				deskId: this.com.board.getAttribute('id'),
				my: this.my,
				player: window._self.channelId,
				index: this.pace.length,
				pace: arr.join("") + eatedMan
			}))
		} else {
			window._self.wsFinal.send(JSON.stringify({
				type: "pace",
				deskId: this.com.board.getAttribute('id'),
				my: this.my,
				player: window._self.channelId,
				index: this.pace.length,
				pace: paceS
			}))
		}
	}

	//Ai自动走棋 p代表网络走棋
	AIPlay(p) {
		if (!p && this.com.board.id !== 'board1') {
			return
		}

		//return
		var pace = p || this.AI.init(this.pace.join(""))

		console.log("执行命令：" + pace)
		if (!pace) {
			this.showWin(1);
			return;
		}

		if (!p) {
			// 机器人走棋需要补充吃掉的子
			var eatedMan = this.map[pace[3]][pace[2]]
			pace.push(eatedMan)
		}

		this.pace.push(pace.join(""));
		var key = this.map[pace[1]][pace[0]]
		this.nowManKey = key;

		var key = this.map[pace[3]][pace[2]];
		if (key) {
			this.AIclickMan(key, pace[2], pace[3]);
		} else {
			this.AIclickPoint(pace[2], pace[3]);
		}

		const man = this.com.mans[this.nowManKey]
		this.com.pane.showMove(man)
		// todo 记录招式
		this.com.log(man.moveStep())
		this.nowManKey = false;
		this.com.show()
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
			man.move(x, y)
		}
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
