/**
 * 2019-3-15 跟进邀约 
 * 查询条件 移动至 topNav 逻辑 
 * topRm 		    查询按钮
 * filterPopHeader	查询弹框标题
 * filterPopMask    查询弹框遮罩
 * filterPopWrap    查询弹框外层
 * filterPop        查询弹框内容
 */
console.log('------------------***********---------------------')
console.log("屏幕物理分辨率的高: " + window.screen.height);
console.log("屏幕物理分辨率的宽: " + window.screen.width);
console.log('------------------***********---------------------');

var topRm = null;
var filterPopHeader = null;
var filterPopMask = null;
var filterPopWrap = null;
var filterPop = null;
var marginLeft = 30; // 左边距
var clearBtn = null;
var tableMenu = null;

$(document).ready(function() {
	// 设置、获取DOME对象
	topRm = $('#_dt_right_menu');
	filterPopMask = $("<div class='filter-pop-mask'></div>");
	filterPopHeader = $("\
		<thead>\
			<tr class='filter-pop-header biaoge'>\
				<th><span class='back-arrow'></span><span class='padding-left'>查询</span></th>\
				<th></th>\
			</tr>\
		</thead>\
	")
	filterPopWrap = $('.round');
	filterPop = $('#tb_query');
	clearBtn = $("input[name='clearBtn']") 
	// ---------------------------

	// 创建查询按钮
	if( _getFilterQueryButton ){
		topRm.html('查询');
		topRm.css('padding-top', '8px');
		topRm.show();
		topRm.on('click', showPop)
	}
	// ---------------------------

	// 设置查询框外层 层级大于 header，否则会被遮挡
	filterPopWrap.css({'z-index': '1001'})
	// ---------------------------
	
	// 设置查询框高度 超出高度的内容可滚动
	filterPop.find('tbody').css({
		'height': (window.screen.height - 45),
        'overflow-y':'scroll',
		'overflow-x':'hidden',
        'display':'block'
	})
	// ---------------------------
	
	// 插入遮罩 到 查询框中
	filterPopWrap.append(filterPopMask)
	var filterPopMaskStyle = {
		'position': 'fixed',
		'z-index': '1001',
		'top': '0',
		'left': '0',
		"background-color": "rgba(0,0,0,0.5)",
		"width": window.screen.width,
		"height": window.screen.height,
		"display": 'none',
	}
	filterPopMask.css(filterPopMaskStyle);
	filterPopMask.on('click',hidePop);
	// ---------------------------

	// 插入弹框header
	filterPop.prepend(filterPopHeader);
	var filterPopHeaderStyle = {
		'background-color': '#FFFFFF',
		'height':'44px',
		'line-height':'44px'
	}
	filterPopHeader.css(filterPopHeaderStyle);
	// 	设置返回icon 与 header样式优化
	var backArrow = {
		'background': "url(./static/img/arrow3.png) no-repeat right 50%",
		'background-size': '15px 15px',
		'color': '#676767',
		"display": "inline-block",
		'width': '15px',
		'height': '15px',
		"-moz-transform": "rotate(180deg)",
		"-webkit-transform": "rotate(180deg)",
		"-o-transform": "rotate(180deg)",
		"transform": 'rotate(180deg)',
	}
	$('.back-arrow').css(backArrow);
	$('.back-arrow').on('click',hidePop);
	$('.filter-pop-header').find('td').css({'font-size':'17px'});
	$('.padding-left').css({"padding-left":"9rem",'font-size':'17px'});
	// ---------------------------

	// 设置查询条件弹框样式
	var filterPopStyle = {
		'position': 'fixed',
		'top': '0',
		'left': marginLeft + 'px',
		'width': (window.screen.width - marginLeft),
		'z-index': '1002',
		'background-color': '#FFFFFF',
	}
	filterPop.css(filterPopStyle);
	// ---------------------------
	
	// 替换清除按钮为icon
	clearBtn.addClass('icon-clear');
	clearBtn.css({'background-position':'70%'});
	clearBtn.val('');
	// ---------------------------
	
//	tableMenu = $(".table-menu ul li");
//	tableMenu.on("tap",function(){
//		
//	})
	
})
// 显示查询条件弹框
function showPop() {
	console.log('显示查询弹框')
	filterPopWrap.show();
	filterPop.show();
	filterPopMask.show();
	noScroll();
}

// 隐藏查询条件弹框
function hidePop() {
	console.log('隐藏查询弹框')
	filterPopWrap.hide();
	filterPop.hide();
	filterPopMask.hide();
	openScroll();
}
// 禁止背景滚动
function noScroll(){
	$('body').addClass('no-scroll')
}
// 允许背景滚动
function openScroll(){
	$('body').removeClass('no-scroll')
}

/**
 * 方法说明
 * @method setContipTop
 * @className {string} class类名
 * @top       {number} 提示气泡，顶部间距需要调整的值（这里用的是原来的顶部间距值 减去 给的指定top值）
 */
function setContipTop(className,top){
	var contipBox = $(className); // 获取页面 提示元素
	var boxNum; // 提示元素的序号
	var boxTop; // 提示元素的高度
	$(contipBox).each(function(){
		boxNum = $(this).index();
		boxTop = parseInt($(this)[0].offsetTop);
		console.log('第'+(boxNum+1)+'个提示元素的Top值：'+boxTop+' 减去 '+ top +' = '+ (boxTop-top));
		contipBox.eq(boxNum).css({'top':(boxTop-top)+'px'})
	})
}