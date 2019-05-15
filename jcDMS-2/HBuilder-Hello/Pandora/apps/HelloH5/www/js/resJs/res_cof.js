/**
 * 2019-3-15 圈子 
 */
console.log('------------------***********---------------------')
console.log("屏幕物理分辨率的高: " + window.screen.height);
console.log("屏幕物理分辨率的宽: " + window.screen.width);
console.log('------------------***********---------------------');
var topBarH = null;
var tipDivH = null;
var screenBoxH = null;
// 页面加载完成后执行
window.onload = function() {
	// 判断有无新消息提醒，来确定列表滑动高度
	topBarH = $('.xf-res-topBar').height();
	tipDivH = $('.xf-res-tip').height();
	screenBoxH = $('.screen-box').height();
	if($('#cofBody').length > 0){
		if($('.xf-res-tip').is(':hidden')){
			console.log('无新的回复')
			$('#cofBody').css({ 'height': window.screen.height - topBarH - screenBoxH })
		}else{
			console.log('有新的回复')
			$('#cofBody').css({ 'height': window.screen.height - topBarH - screenBoxH - tipDivH })
		}
	}
	// 新增点赞，评论icon，垂直对齐属性 
	$('.showLike').find('img').css({
		'vertical-align': 'middle'
	})
}
