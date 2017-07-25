/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-07-24 22:52:20
 * @version $Id$
 */
function sameSign (a, b) {
  return (a ^ b) >= 0
}


function vector (a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}
function vectorProduct (v1, v2) {
  return v1.x * v2.y - v2.x * v1.y
}

function isPointInTrangle (p, a, b, c) { // p是鼠标当前的位置，a是鼠标上一次的位置,b是sub左上角坐标,c是sub左下角坐标
  var pa = vector(p, a)
  var pb = vector(p, b)
  var pc = vector(p, c)

  var t1 = vectorProduct(pa, pb)
  var t2 = vectorProduct(pb, pc)
  var t3 = vectorProduct(pc, pa)
  // t1 t2 t3 符号相同时点在三角形内
  return sameSign(t1, t2) && sameSign(t2, t3)
}

function needDelay(elem,leftCorner,currMousePos){
	var offset = elem.offset();
	// console.log(offset.left);
	var topLeft = {
		x: offset.left,
		y: offset.top
	}

	var bottomLeft = {
		x: offset.left,
		y: offset.top + elem.height()
	}

	return isPointInTrangle(currMousePos,leftCorner,topLeft,bottomLeft);
}