class AI {
	static historyBill
	static {
		// Com.getData("/chess/js/gambit.all.js",
		// 	function (data) {
		// 		Com.gambit = data.split(" ");
		// 		AI.historyBill = Com.gambit
		// 	})
	}
	constructor(com) {
		this.historyTable = {};		//历史表
		this.com = com
		this.play = com.play
		AI.historyBill = Com.gambit
	}

	//人工智能初始化
	init(pace) {
		var bill = AI.historyBill || com.gambit; //开局库
		if (bill.length) {
			var len = pace.length;
			var arr = [];
			//先搜索棋谱
			for (var i = 0; i < bill.length; i++) {
				if (bill[i].slice(0, len) == pace) {
					arr.push(bill[i]);
				}
			}
			if (arr.length) {
				var inx = Math.floor(Math.random() * arr.length);
				AI.historyBill = arr;
				return arr[inx].slice(len, len + 4).split("");
			} else {
				AI.historyBill = [];
			}

		}
		//如果棋谱里面没有，人工智能开始运作
		var initTime = new Date().getTime();
		this.treeDepth = this.play.depth;
		//this.treeDepth=4;

		this.number = 0;
		this.setHistoryTable.lenght = 0

		var aiPlayer = -1;

		var val = this.getAlphaBeta(-99999, 99999, this.treeDepth, Com.arr2Clone(this.play.map), aiPlayer);
		//var val = this.iterativeSearch(Com.arr2Clone(this.play.map),aiPlayer)
		if (!val || val.value == -8888) {
			this.treeDepth = 2;
			val = this.getAlphaBeta(-99999, 99999, this.treeDepth, Com.arr2Clone(this.play.map), aiPlayer);
		}
		//var val = this.iterativeSearch(Com.arr2Clone(this.play.map),aiPlayer);
		if (val && val.value != -8888) {
			var man = this.play.mans[val.key];
			var nowTime = new Date().getTime();
			console.log('最佳着法：' +
				this.com.createMove(Com.arr2Clone(this.play.map), man.x, man.y, val.x, val.y) +
				' 搜索深度：' + this.treeDepth + ' 搜索分支：' +
				this.number + '个  最佳着法评估：' +
				val.value + '分' +
				' 搜索用时：' +
				(nowTime - initTime) + '毫秒')
			return [man.x, man.y, val.x, val.y]
		} else {
			return false;
		}
	}

	//迭代加深搜索着法
	iterativeSearch(map, my) {
		var timeOut = 100;
		var initDepth = 1;
		var maxDepth = 8;
		this.treeDepth = 0;
		var initTime = new Date().getTime();
		var val = {};
		for (var i = initDepth; i <= maxDepth; i++) {
			var nowTime = new Date().getTime();
			this.treeDepth = i;
			this.aotuDepth = i;
			var val = this.getAlphaBeta(-99999, 99999, AI.treeDepth, map, my)
			if (nowTime - initTime > timeOut) {
				return val;
			}
		}
		return false;
	}

	//取得棋盘上所有棋子
	getMapAllMan(map, my) {
		var mans = [];
		for (var i = 0; i < map.length; i++) {
			for (var n = 0; n < map[i].length; n++) {
				var key = map[i][n];
				if (key && this.play.mans[key].my == my) {
					this.play.mans[key].x = n;
					this.play.mans[key].y = i;
					mans.push(this.play.mans[key])
				}
			}
		}
		return mans;
	}

	//取得棋谱所有己方棋子的着法
	getMoves(map, my) {
		var manArr = this.getMapAllMan(map, my);
		var moves = [];
		var foul = this.play.isFoul;
		for (var i = 0; i < manArr.length; i++) {
			var man = manArr[i];
			var val = man.bl(map);

			for (var n = 0; n < val.length; n++) {
				var x = man.x;
				var y = man.y;
				var newX = val[n][0];
				var newY = val[n][1];
				//如果不是长将着法
				if (foul[0] != x || foul[1] != y || foul[2] != newX || foul[3] != newY) {
					moves.push([x, y, newX, newY, man.key])
				}
			}
		}
		return moves;
	}
	//A:当前棋手value/B:对手value/depth：层级
	getAlphaBeta(A, B, depth, map, my) {
		//var txtMap= map.join();
		//var history=AI.historyTable[txtMap];
		//	if (history && history.depth >= AI.treeDepth-depth+1){
		//		return 	history.value*my;
		//}
		if (depth == 0) {
			return { "value": this.evaluate(map, my) }; //局面评价函数;
		}
		var moves = this.getMoves(map, my); //生成全部走法;
		//这里排序以后会增加效率

		for (var i = 0; i < moves.length; i++) {
			//走这个走法;
			var move = moves[i];
			var key = move[4];
			var oldX = move[0];
			var oldY = move[1];
			var newX = move[2];
			var newY = move[3];
			var clearKey = map[newY][newX] || "";

			map[newY][newX] = key;
			delete map[oldY][oldX];
			this.play.mans[key].x = newX;
			this.play.mans[key].y = newY;

			if (clearKey == "j0" || clearKey == "J0") {//被吃老将,撤消这个走法;
				this.play.mans[key].x = oldX;
				this.play.mans[key].y = oldY;
				map[oldY][oldX] = key;
				delete map[newY][newX];
				if (clearKey) {
					map[newY][newX] = clearKey;
					// this.play.mans[ clearKey ].isShow = false;
				}

				return { "key": key, "x": newX, "y": newY, "value": 8888 };
				//return rootKey;
			} else {
				var val = -this.getAlphaBeta(-B, -A, depth - 1, map, -my).value;
				//val = val || val.value;

				//撤消这个走法;　
				this.play.mans[key].x = oldX;
				this.play.mans[key].y = oldY;
				map[oldY][oldX] = key;
				delete map[newY][newX];
				if (clearKey) {
					map[newY][newX] = clearKey;
					//this.play.mans[ clearKey ].isShow = true;
				}
				if (val >= B) {
					//将这个走法记录到历史表中;
					//AI.setHistoryTable(txtMap,AI.treeDepth-depth+1,B,my);
					return { "key": key, "x": newX, "y": newY, "value": B };
				}
				if (val > A) {
					A = val; //设置最佳走法;
					if (this.treeDepth == depth) var rootKey = { "key": key, "x": newX, "y": newY, "value": A };
				}
			}
		}
		//将这个走法记录到历史表中;
		//AI.setHistoryTable(txtMap,AI.treeDepth-depth+1,A,my);
		if (this.treeDepth == depth) {//已经递归回根了
			if (!rootKey) {
				//AI没有最佳走法，说明AI被将死了，返回false
				return false;
			} else {
				//这个就是最佳走法;
				return rootKey;
			}
		}
		return { "key": key, "x": newX, "y": newY, "value": A };
	}

	//奖着法记录到历史表
	setHistoryTable(txtMap, depth, value, my) {
		this.setHistoryTable.lenght++;
		this.historyTable[txtMap] = { depth: depth, value: value }
	}

	//评估棋局 取得棋盘双方棋子价值差
	evaluate(map, my) {
		var val = 0;
		for (var i = 0; i < map.length; i++) {
			for (var n = 0; n < map[i].length; n++) {
				var key = map[i][n];
				if (key) {
					val += this.play.mans[key].value[i][n] * this.play.mans[key].my;
				}
			}
		}
		//val+=Math.floor( Math.random() * 10);  //让AI走棋增加随机元素
		//com.show()
		//z(val*my)
		this.number++;
		return val * my;
	}

}
