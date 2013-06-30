;(function() {
	'use strict'

	function Clock() {
		this.clock_block = document.querySelector('.clock-block');
		this.wrapper = document.querySelector('.wrapper');
		this.title = document.querySelector('.wrapper h2');
		this.flag = true;
		this.date_obj = this.getTime();
		this.timer_id;

		this.init();
	}

	Clock.prototype.init = function() {
		var self = this;
		this.insertFullTime(true);
		this.refreshTime(true);

		this.clock_block.onclick = function() {
			self.showTime();
		};
		this.clock_block.oncontextmenu = function(e) {
			self.showDate(e);
		};

	};

	Clock.prototype.beautifyTime = function(time) {
		return (time < 10) ? time = "0" + time : time;
	};

	Clock.prototype.getTime = function() {
		var date = new Date();
		return {
			year: date.getFullYear(),
			month: this.beautifyTime(date.getMonth() + 1),
			date: this.beautifyTime(date.getDate()),
			day: date.getDay(),
			hour: this.beautifyTime(date.getHours()),
			minute: this.beautifyTime(date.getMinutes()),
			second: this.beautifyTime(date.getSeconds())
		};
	};

	Clock.prototype.insertFullTime = function(state) {
		this.clock_block.innerHTML = (state) ? this.date_obj.hour + ":" + this.date_obj.minute + ":" + this.date_obj.second : this.date_obj.hour + " : " + this.date_obj.minute;
	};


	Clock.prototype.insertDate = function() {
		this.clock_block.innerHTML = this.date_obj.date + "." + this.date_obj.month + "." + this.date_obj.year;
	};

	Clock.prototype.refreshTime = function(state) {
		var self = this;
		this.timer_id = setInterval(function() {
			self.date_obj = self.getTime();
			self.insertFullTime(state);
		}, 1000);
	};

	Clock.prototype.changeDisplay = function(state) {
		clearInterval(this.timer_id);
		this.insertFullTime(state);
		this.title.innerHTML = "Time now:";
		this.refreshTime(state);
		this.flag = state;
	};

	Clock.prototype.showTime = function() {
		this.flag ? this.changeDisplay(false) : this.changeDisplay(true);
	};

	Clock.prototype.showDate = function(e) {
		e.preventDefault();
		clearInterval(this.timer_id);
		this.title.innerHTML = "Date now:";
		this.insertDate();
		this.flag = false;
	};


	window.onload = function() {
		var clock = new Clock();
	};


})();