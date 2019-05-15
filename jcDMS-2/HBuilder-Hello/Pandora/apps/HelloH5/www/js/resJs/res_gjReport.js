var se_finalStatus = 1;
var se_loadStatus = 0;
var clearBtn = null;
var newSelects = [{
	id: 'oemCusSource',
	title: '车系',
	onChange: 'insertData'
}];
var topBarH = null;
var tipDivH = null;
var screenBoxH = null;
// 页面加载完成后执行
window.onload = function() {
	// 判断有无新消息提醒，来确定列表滑动高度
	topBarH = $('.xf-res-topBar').height();
	tipDivH = $('.xf-res-tip').height();
	screenBoxH = $('.screen-box').height();
	
}
