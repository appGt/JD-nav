/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-07-24 20:45:58
 * @version $Id$
 */
$(document).ready(function() {

	var sub = $('#sub');//指向二级菜单
	var activeRow;//当前激活的一级菜单
	var activeMenu;//当前激活的二级菜单
	var timer;//延迟器
	var mouseInSub = false;//鼠标是否在二级菜单中的flag
	var mouseTrack = [];//记录鼠标移动位置对象

	sub.on('mouseenter',function(e){
		mouseInSub = true;
	}).on('mouseleave', function(e) {
		mouseInSub = false;
	});


	var moveHandler = function(e) {
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		})

		if(mouseTrack.length > 3){
			mouseTrack.shift();
		}	
	}

	 $('#test li').on('mouseenter', function (e) {
    	sub.removeClass('none') // 把二级菜单显示出来
	}) 

	$('#test').on('mouseenter', function(e) {

		$(document).bind('mousemove',moveHandler);////////////

	}).on('mouseleave',function(e){
		//当鼠标从最高级容器离开时，把所有激活状态的元素清空
		sub.addClass('none');

		if(activeRow){
			activeRow.removeClass('active');
			activeRow = null;
		}

		if(activeMenu){
			activeMenu.addClass('none');
			activeMenu = null;
		}

		$(document).unbind('mousemove',moveHandler);
		//当鼠标从最高级容器#test移开时，对获取鼠标位置函数进行解绑

	}).on('mouseenter', 'li', function(e) {
		//这个if分支是当鼠标第一次移动到某个li时才会执行
		if(!activeRow) {
			activeRow = $(e.target).addClass('active');
			activeMenu = $('#'+activeRow.data('id'));
			activeMenu.removeClass('none');
			return;
		}
		/*如果当前已经有li处于激活状态，当再次触发该函数的情况就是从已激活的li
		*移动到其他li，则不会执行该if语句
		*/

		if(timer){
			clearTimeout(timer);
		}//debounce去抖关键，当某一事件重复触发时，只触发最后一次

		var currMousePos = mouseTrack[mouseTrack.length-1];
		var leftCorner = mouseTrack[mouseTrack.length-2];

		var delay = needDelay(sub, leftCorner, currMousePos);
		//delay是判断是否需要进行延迟，如果鼠标当前位置位于目标sub（二级菜单）的左上角和左下角以及上一个鼠标的位置三点形成的三角形内，
		//则需要延迟，否则直接切换。这就是用户行为预测，如果鼠标在三角形内就说明用户会移动到二级菜单，否则就是切换li(一级菜单)

		if(delay){
			timer = setTimeout(function(){
			if(mouseInSub){
				return;
			}
			//延迟，作用是当鼠标从li进入二级菜单时候,避免鼠标碰到其他li而切换二级菜单，
			//设置延时器

			activeRow.removeClass('active');
			activeMenu.addClass('none');

			activeRow = $(e.target);
			activeRow.addClass('active');
			activeMenu = $('#'+activeRow.data('id'));
			activeMenu.removeClass('none');
			timer = null;
			},300)
		} else {

			sub.addClass('none');

			var prevActiveRow = activeRow;
			var prevActiveMenu = activeMenu;

			activeRow = $(e.target);
			activeMenu = $('#'+activeRow.data('id'));

			prevActiveRow.removeClass('active');
			prevActiveMenu.addClass('none');

			activeRow.addClass('active');
			activeMenu.removeClass('none');

			sub.removeClass('none');
		}

	});

});
