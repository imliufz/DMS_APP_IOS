var topRm = null;
var filterPopHeader = null;
var filterPopMask = null;
var filterPopWrap = null;
var filterPop = null;
var marginLeft = 30; // 左边距

var itemData = null;
//tcCode加载状态
var finalStatus = 2;
var loadStatus = 0;

var _filterQuery = function(){
	$("#paramDiv").find("input").val("");
	hidePop();
	// 遍历查询条件中的值
	eachChooseItem(s_chooseLabelItem);
	queryPt();
};

var common_sidebar =
	"<div class='common-sidebar-box'>\
		<div class='common-sidebar-header flex-box align-items-center'>\
			<div class='cell-1'>\
				<span class='back-arrow'></span>\
			</div>\
			<div class='cell-3'>\
				<span class='header-title'>查询</span>\
			</div>\
			<div class='cell-1'></div>\
		</div>\
		<div class='common-sidebar-body' id='commonSidebarBody-main'>\
			\
		</div>\
		<div class='common-sidebar-footer'>\
			<div class='flex-box align-items-center'>\
				<div class='cell-1'>\
					<button class='clear-btn'>清除查询</button>\
				</div>\
				<div class='cell-1'>\
					<button class='confirm-btn'>查询</button>\
				</div>\
			</div>\
		</div>\
	</div>\
	<div class='common-sidebar-mask' style='display:none'></div>";
// 插入侧边栏 - 查询 主HTML片段
document.write(common_sidebar);

// DOM 对象
var commonSidebar = null;        // 查询框
var commonSidebarHeader = null;	 // 查询框header
var commonSidebarBody = null;	 // 查询框body 滑动内容区
var commonSidebarFooter = null;  // 查询框footer
var commonSidebarMask = null;    // 查询框遮罩
var s_backArrow = null;    		 // 返回icon
var s_chooseLabelItem = null;    // 所有单选item
var s_chooseDate = null;         // 所有的时间选择框
var s_inputVal = null;           // 所有的输入框
var s_confirmBtn = null;           // 确定按钮
var s_clearBtn = null;             // 清除按钮

/**
 * creatComponentsItem 【创建单选组件】
 * @param {Array}：data 数据源
 */
function creatComponentsItem(data){
	if( data == null || data.length == 0 ){
		return;
	}
	// 1.创建DOM
	var creat_Item_list = '';
	// 一级循环 - 遍历标题
	$.each(data,function(index,item){
		if(typeof(item.items) == undefined || item.items == null || item.items.length < 1){
			return;
		}
		if(!IsNull(item.id)){
			creat_Item_list += 	"<div id='"+item.id+"' class='sidebar-cell sidebar-choose ' ";
		}else{
			creat_Item_list += 	"<div class='sidebar-cell sidebar-choose ' ";
		}
		if( index == data.length-1 ){
			creat_Item_list += 	" style='margin-bottom:44px;'";
		}
		if(item.isHide){
			creat_Item_list += 	" style='display:none'>";
		}else{
			creat_Item_list += 	" >";
		}
		creat_Item_list += 		"<div class='sidebar-cell-header'>";
		creat_Item_list += 			"<div key='"+ index +"'>"+item.title+"<span class='icon-down-arrow pull-right'></span></div>";
		creat_Item_list += 		"</div>";
		creat_Item_list += 		"<div class='sidebar-cell-body'>";
		creat_Item_list += 			"<ul class='choose-label list-inline' to_input='"+item.to_input+"'>";
		// 二级循环 - 遍历选项
		$.each(item.items,function(index2,item2){
			if(item.isMultiple){
				creat_Item_list += "	<li class='choose-label-item isMultiple";
			}else{
				creat_Item_list += "	<li class='choose-label-item";
			}
			if(item.fiexdW){
				creat_Item_list += " fiexd-w";
			}
			if(item2.isDefault){
				creat_Item_list += " active";
			}
			if(!IsNull(item.onClick)){
				creat_Item_list +=  "' code='"+ item2.code +"' onclick='"+item.onClick+"'>"+ item2.value +"</li>";
			}else{
				creat_Item_list +=  "' code='"+ item2.code +"'>"+ item2.value +"</li>";
			}
		})
		creat_Item_list +=      	"</ul>";
		creat_Item_list += 		"</div>";
		creat_Item_list += 	"</div>";
		
	})
	// 2.插入DOM
	commonSidebarBody.append(creat_Item_list)
	// 3.获取DOM 对象 
	s_chooseLabelItem = $('.common-sidebar-body').find('li.choose-label-item');
	// 4.并绑定事件 
	s_chooseLabelItem.on('tap',chooseItemTap)
	// 5.防止点击穿透
	preventDefaultObj(s_chooseLabelItem)
}

function chooseItemTap(){
	var toogleType = toogleClassData($(this)) // 样式，数据切换
	var onclick = $(this).attr("onclick");
	var code = $(this).attr("code");
	if(toogleType == 1){
		code = "";
	}
	if(!IsNull(onclick)){
		eval(onclick+"('"+code+"')");
	}
}

// DOM结构加载完成后 执行
$(document).ready(function() {
	getItemData();
	// 创建查询按钮
	topRm = $('#_dt_right_menu');
	topRm.html('查询');
	topRm.css('padding-top', '8px');
	topRm.show();
	topRm.on('tap', showPop)
	// 获取DOM节点
	commonSidebar = $('.common-sidebar-box');
	commonSidebarHeader = $('.common-sidebar-header');
	commonSidebarBody = $('.common-sidebar-body');
	commonSidebarFooter = $('.common-sidebar-footer');
	commonSidebarMask = $('.common-sidebar-mask');
	s_backArrow = $('.common-sidebar-header .back-arrow')
	var backArrow_css = {
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
	s_backArrow.css(backArrow_css);
	
	s_confirmBtn = $('.common-sidebar-footer button.confirm-btn')
	s_clearBtn = $('.common-sidebar-footer button.clear-btn')
	
	// 1.遮罩事件绑定
	commonSidebarMask.on('tap',function(){
		hidePop();
	})
	
	// 2.绑定返回事件
	s_backArrow.on('tap',function(){
		hidePop();
	})
	
	// 3.确定按钮 事件绑定
	s_confirmBtn.on('tap',_filterQuery)
	
	// 4.清除按钮 事件绑定
	s_clearBtn.on('tap',_clearAll);
	
	// 查询框中，绑定过 tap 事件的元素 需要防止点击穿透处理
	preventDefaultObj(commonSidebarMask)
	preventDefaultObj(s_backArrow)
	preventDefaultObj(s_confirmBtn)
	preventDefaultObj(s_clearBtn)
})

/**
 * preventDefault 阻止冒泡 防止点击穿透
 * @param {Object}：select  绑定点击事件的元素 接受jq选择器对象
 */
function preventDefaultObj(select) {
	if(0 == select.length ) return;
	select.on("touchend", function(event) {
		event.preventDefault();
	})
}

/**
 * toogleClassData  样式，选中值处理
 * 已激活项，再次点击则为取消
 * @param {Object}：select  切换class的元素  接受jq选择器对象
 */
function toogleClassData(select){
	if(0 == select.length ) return;
	if( select.hasClass('active') ){
		// 已选中逻辑，再次点击 移除激活样式 清除已选值
		select.removeClass("active");
		select.find('i').remove();
		return 1;
	}else{
		var isMultiple = select.hasClass('isMultiple');
		if(isMultiple){
			// 多选
			select.addClass("active");
		}else{
			// 单选 未选中逻辑，切换激活样式 切换已选值
			select.addClass("active").siblings().removeClass("active");
		}
		select.append('<i></i>');
		return 2;
	}	
}

// ----------------确定操作------------------
/**
 * eachChooseItem  遍历指定元素的选中值
 * @param {Object}：select  接受jq选择器对象
 */
function eachChooseItem(select){
	if( select == null || select.size() == 0 ){
		return;
	}
	var to_input = "";
	var inputValues = "";
	select.each(function(index, item){
		var current_input = $(this).parent().attr("to_input");
		if( to_input == ""){
			to_input = current_input;
		}
		if( current_input != to_input){
			if(!IsNull(inputValues)){
				inputValues = inputValues.substring(0,inputValues.length-1);
			}
			$("#"+to_input).val(inputValues);
			to_input = current_input
			inputValues = "";
		}
		if($(this).hasClass('active')){
			if(to_input == "salesConsultant"){
				inputValues += "'"+$(this).attr("code")+"',";
			}else{
				inputValues += $(this).attr("code")+",";
			}
		}
		if( index == select.size()-1 ){
			if(!IsNull(inputValues)){
				inputValues = inputValues.substring(0,inputValues.length-1);
			}
			$("#"+to_input).val(inputValues);
		}
	});
}

/**
 * resChooseItem  清除指定元素的选中值
 * @param {Object}：select  接受jq选择器对象
 */
function resChooseItem(select){
	if( select == null || select.size() == 0 ){
		return;
	}
	select.each(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active')
		}
	})	
}

/**
 * getUrl 获取项目绝对路径
 */
function getUrl(url){
	var n = url.lastIndexOf("\/");
	return url.substring(0,n); // 返回项目路径
}
// 显示查询条件弹框
function showPop() {
	commonSidebar.show();
	commonSidebarMask.show();
	noScroll();
	commonSidebar.width((screen.width - 30) + 'px');
	commonSidebarBody.height(screen.height - commonSidebarHeader.height() - commonSidebarFooter.outerHeight())
	commonSidebar.css("left","30px");
}

// 隐藏查询条件弹框
function hidePop() {
	commonSidebar.hide();
	commonSidebarMask.hide();
	commonSidebar.css("left","100%");
	openScroll();
}
// 禁止背景滚动
function noScroll(){
	$('html,body').addClass('no-scroll')
}
// 允许背景滚动
function openScroll(){
	$('html,body').removeClass('no-scroll')
}

function getItemData(){
	itemData = 
	[
		{title:'是否OEM来源',fiexdW:true,onClick:'changeCustomer',to_input:'isOem',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
		]},
		{title:'OEM客户来源',fiexdW:false,isHide:true,id:'oemCusSource_data',to_input:'oemCusSource'},
		{title:'客户来源',fiexdW:false,isHide:true,id:'cusSource_data',to_input:'cusSource'},
		{title:'意向级别',fiexdW:true,to_input:'INTENT_LEVEL',items:[
			{code:'13101001',value:'H级'},
			{code:'13101002',value:'A级'},
			{code:'13101003',value:'B级'},
			{code:'13101004',value:'C级'},
			{code:'13101005',value:'N级'},
			{code:'13101007',value:'F级'},
			{code:'13101006',value:'F0级'},
			{code:'13101008',value:'O级'},
			{code:'13101009',value:'D级'}
		]},
		{title:'车系',fiexdW:false,to_input:'INTENT_SERIES'}
	]
	_loadTcCodeAndCallBack_new([{code:4,index:4},{code:3031,index:1},{code:1311,index:2}]);
}

//获取页面TC_CODE并调用查询条件初始化方法
function _loadTcCodeAndCallBack_new(itemCodes){
	var itemLength = itemCodes.length;
    var codeTypes = "";
    var isHaveIntentSeries = false;
    var seriesIndex = 0;
    if( itemCodes != null && itemLength > 0 ){
    	for (var i = 0; i < itemLength; i++) {
    		if( itemCodes[i].code == 4){
    			isHaveIntentSeries = true;
    			seriesIndex = itemCodes[i].index;
    		}else{
    			if(i == itemLength - 1){
	    			codeTypes = codeTypes + itemCodes[i].code;
		    	} else {
		    		codeTypes = codeTypes + itemCodes[i].code+",";
		    	}
    		}
    	}
    }
    if(isHaveIntentSeries){//意向车系
    	_loadSeries_new(seriesIndex);
    }
	var url = httpUrlHead+"PotcusAchieveService/queryTcCode.json?codeTypes="+codeTypes+"&"+httpUrlEnd;
	makeFormCall(url,function(json){
		loadStatus += 1;
		if(json.RESULT.maps != null && json.RESULT.maps.length > 0) {
			for ( var x = 0; x < itemLength; x++) {
				var codes = null;
				for (var key in json.RESULT.maps[0]) {
					if ("T"+itemCodes[x].code == key) {
						codes = json.RESULT.maps[0][key];
						break;
					}
				}
				if(codes != null && codes.length > 0) {
					var objItemData = new Array(codes.length);
					for(var i = 0;i < codes.length;i++){
						objItemData[i] = {code:codes[i].CODE_ID,value:codes[i].CODE_DESC};
					}
					itemData[itemCodes[x].index].items = objItemData;
				}
			}
		}
		checkFinal()
	},"fm");
}

//加载所有意向车系数据
function _loadSeries_new(itemIndex){
	var url = httpUrlHead+"PotcusAchieveService/querySMPC.json?codeType=4&"+httpUrlEnd;
	makeFormCall(url, function(json){
		loadStatus += 1;
		if(json.RESULT.funcStatus == "1") {
			var list = json.list;
			if(list != null && list.length > 0) {
				var objItemData = new Array(list.length);
				for(var i = 0;i < list.length;i++) {
					var gCode = list[i].GROUP_CODE;
					var name = list[i].GROUP_NAME;
					objItemData[i] = {code:gCode,value:name};
				}
				itemData[itemIndex].items = objItemData;
			}
		} else {
			MuiAlert("加载数据失败!");
		}
		checkFinal()
	}, "fm");
}

function checkFinal(){
	if( finalStatus == loadStatus ){
		creatComponentsItem(itemData);
		_filterQuery();
	}
}

function _clearAll(){
	resChooseItem(s_chooseLabelItem);
}
function resChooseItem(select){
	if( select == null || select.size() == 0 ){
		return;
	}
	select.each(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active')
		}
	})	
}
function changeCustomer(code){
	if(code ==""){
		$("#oemCusSource_data").hide();
		$("#cusSource_data").hide();
		$("#oemCusSource_data").find("li.active").removeClass('active');
		$("#cusSource_data").find("li.active").removeClass('active');
	}else if(code =="10041001"){
		$("#oemCusSource_data").show();
		$("#cusSource_data").hide();
		$("#cusSource_data").find("li.active").removeClass('active');
	}else if(code =="10041002"){
		$("#oemCusSource_data").hide();
		$("#cusSource_data").show();
		$("#oemCusSource_data").find("li.active").removeClass('active');
	}
}