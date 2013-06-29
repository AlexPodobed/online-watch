(function(){
	'use strict';
	function fixEvent(e) {
		// получить объект событие для IE
		e = e || window.event;

		// добавить pageX/pageY для IE
		if (e.pageX == null && e.clientX != null) {
			var html = document.documentElement;
			var body = document.body;
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		}

		// добавить which для IE
		if (!e.which && e.button) {
			e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
		}

		return e;
	}

	function getCoords(elem) {
		// (1)
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		// (2)
		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		// (3)
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		// (4)
		var top = box.top + scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		// (5)
		return {
			top: Math.round(top),
			left: Math.round(left)
		};
	}

	function dragNdrop(e) {
		var 	self,
			coords,
			shiftX,
			shiftY;

		self = this;
		coords = getCoords(this);
		shiftX = e.pageX - coords.left;
		shiftY = e.pageY - coords.top;

		this.style.position = 'absolute';

		function moveAt(e) {
			self.style.left = e.pageX - shiftX + 'px';
			self.style.top = e.pageY - shiftY + 'px';
		}

		document.onmousemove = function(e) {
			e = fixEvent(e);
			moveAt(e);
		};
		this.onmouseup = function() {
			document.onmousemove = self.onmouseup = null;
		};
	}

	function Clock() {
		var 	wrapper,
				clock_block,
				date, now,
				timer_id,
				flag;

		clock_block = document.querySelector('.clock-block');
		wrapper = document.querySelector('.wrapper');
		flag = true;

		function beautifyTime(time) {
			return (time < 10) ? time = "0" + time : time;
		}

		function getTime() {
			date = new Date();
			return {
				year: date.getFullYear(),
				month: beautifyTime(date.getMonth() + 1),
				date: beautifyTime(date.getDate()),
				day: date.getDay(),
				hour: beautifyTime(date.getHours()),
				minute: beautifyTime(date.getMinutes()),
				second: beautifyTime(date.getSeconds())
			};
		}

		now = getTime();

		function insertFullTime(state) {
			clock_block.innerHTML = (state) ? now.hour + ":" + now.minute + ":" + now.second : now.hour + " : " + now.minute;
		}

		function insertDate() {
			clock_block.innerHTML = now.date + "." + now.month + "." + now.year;
		}

		function repeat(state) {
			timer_id = setInterval(function() {
				now = getTime();
				insertFullTime(state);
			}, 100);
		}

		function changeDisplay(state) {
			clearInterval(timer_id);
			setTimeout(function(){document.querySelector('.wrapper h2').innerHTML = "Time now:";},100);
			repeat(state);
			flag = state;
		}

		clock_block.onclick = function() {
			flag ? changeDisplay(false) : changeDisplay(true);
		};

		clock_block.oncontextmenu = function(e) {
			e.preventDefault();
			clearInterval(timer_id);
			document.querySelector('.wrapper h2').innerHTML = "Date now:";
			insertDate();
			flag = false;
		};

		wrapper.onmousedown = dragNdrop;

		repeat(true);
		return insertFullTime(true);

	}

	window.onload = function() {
		Clock();
	};

})();