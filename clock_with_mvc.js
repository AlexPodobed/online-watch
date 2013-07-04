function dragNdrop_Model() {

	this.getCoords = function (element) {
		var box = element.getBoundingClientRect();
		return {
			left: box.left,
			top: box.top
		}
	};

}

function dragNdrop_Controller () {
	var dNd_model = new dragNdrop_Model(),
		elements = {},
		shift = {};
	
	function getShift(e) {
		var coors = dNd_model.getCoords(elements.wrapper);

		return {
			X: e.pageX - coors.left,
			Y: e.pageY - coors.top
		}
	}
	
	function moveAt (e) {
		elements.wrapper.style.left = e.pageX - shift.X - 10 + "px";
		elements.wrapper.style.top = e.pageY - shift.Y - 10 + "px";

	}

	function move(e){
		shift = getShift(e);
		elements.wrapper.style.position = 'absolute';

		document.onmousemove = function(e){
			moveAt(e);
		};

		elements.wrapper.onmouseup = function(){
			document.onmousemove = null;
		};
	}

	this.init = function  () {
		elements = {
			wrapper: document.querySelector('.wrapper')
		}

		elements.wrapper.onmousedown = function(e) {
			move(e);
		};
	}
}


var dNd_controller = new dragNdrop_Controller();

window.onload = function() {

	dNd_controller.init();
}