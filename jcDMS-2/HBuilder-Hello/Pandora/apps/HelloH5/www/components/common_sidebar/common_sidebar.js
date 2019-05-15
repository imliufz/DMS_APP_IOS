/**
 * 侧边栏 - 查询 
 * 为了演示 跟进邀约 的查询操作 被这个组件覆盖
 * 在跟进邀约 注释header 中本JS的引入 即可 看到之前的查询
 */

// 文件路径配置
var path = getUrl(location.href);// 获取项目 绝对路径
var curTablePath = '/components/common_sidebar/';
var cssPath = path + curTablePath+ 'common_sidebar.css';
var htmlPath = path + curTablePath+ 'common_sidebar.html';
/**
 * 引入单选组件CSS
 */
addCssLink(cssPath);
/**
 * 侧边栏 - 查询 主HTML片段
 */
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
		<div class='common-sidebar-body' style='display:none' id='commonSidebarBody-fp'>\
			\
		</div>\
		<div class='common-sidebar-footer'>\
			<div class='flex-box align-items-center'>\
				<div class='cell-1'>\
					<button class='clear-btn'>清除查询</button>\
				</div>\
				<div class='cell-1'>\
					<button class='confirm-btn'>确定</button>\
				</div>\
			</div>\
		</div>\
	</div>\
	<div class='common-sidebar-mask' style='display:none'></div>";
// --------------------------------
	
// 插入侧边栏 - 查询 主HTML片段
document.write(common_sidebar);
/**
 * 插入侧边栏 - 查询 内容HTML片段（暂不用load方法加载此页的HTML内容）
 * 为了该组件可重复利用
 * 已把组件内的三种子组件 【输入框、单选、时间选择】
 * 分别通过方法【creatComponentsInput、creatComponentsItem、creatComponentsDate】动态创建
 * 数据驱动视图
 */
// $("#commonSidebarBody").load(htmlPath,function(response,status,xhr){});

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
 * 初始化数据 前端展示用数据
 * 根据数据源长度，动态生成对应个数的组件
 * 数据驱动视图
 * @param {Array}：input  输入框组件 遍历数据
 * @param {Array}：item   单选组件 遍历数据
 * @param {Array}：date   时间区间框组件 遍历数据
 */ 
var set_data_option = {
	'input':[],			
	'item':[],
	'date':[]
}
// 查询条件 提交给后台的字段
var s_itemArr = [];             // 单选选中值的合集
var s_inputArr = [];            // 输入框输入值的合集
var s_dateArr = [];             // 时间区间选中的合集

// ----------------创建组件------------------
/**
 * creatComponentsInput 【创建输入框组件】
 * @param {Array}：data 数据源
 */
function creatComponentsInput(data){
	if( data == null || data.length == 0 ){
		return;
	}
	// 1.创建DOM
	var creat_Input_list = '';
	$.each(data,function(index,item){
		var input_id = "";
		if(typeof(item.id) != "undefined"){
			input_id = item.id;
		}
		creat_Input_list += "	<div class='sidebar-cell sidebar-input flex-box align-items-center '>";
		creat_Input_list += "		<div class='cell-1'>"+ item.title +"</div>";
		creat_Input_list += "		<div class='cell-2'>";
		creat_Input_list += "			<input type='text' value='' key='"+ index +"' placeholder='"+ item.placeholder +"' to_input='"+ item.to_input +"' id='"+ input_id +"'/>";
		creat_Input_list += "		</div>";
		creat_Input_list += "	</div>";
	})
	// 2.插入DOM
	commonSidebarBody.append(creat_Input_list);
	// 3.获取DOM 对象
	s_inputVal = $('.common-sidebar-body .sidebar-input input')

}
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
	s_chooseLabelItem = $('.common-sidebar-body').eq(0).find('li.choose-label-item');
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
/**
 * creatComponentsItem 【创建时间选择组件】
 * @param {Array}：data 数据源
 */
function creatComponentsDate(data){
	if( data == null || data.length == 0 ){
		return;
	}
	var creat_Input_list = '';
	$.each(data,function(index,item){
		// 一级循环 - 遍历标题
		creat_Input_list += "<div class='sidebar-cell sidebar-date'>";
		creat_Input_list += "	<div class='sidebar-cell-header'>";
		creat_Input_list += "		<div>"+item.title+"<span class='icon-down-arrow pull-right'></span></div>";
		creat_Input_list += "	</div>";
		creat_Input_list += "	<div class='sidebar-cell-body'>";
		creat_Input_list += "		<div class='choose-date'>";
		// 二级循环 - 遍历选项
		$.each(item.items,function(index2,item2){
			creat_Input_list += "		<input type='text' to_input='"+ item2.to_inputOne +"' class='"+ item2.classOne +"' value='"+item2.defaultValOne+"' placeholder='"+item2.placeholderOne+"' readonly='readonly' />"
			creat_Input_list +=  "		<span class='light-gray'>-</span>"
			creat_Input_list +=  "		<input type='text' to_input='"+ item2.to_inputTwo +"' class='"+item2.classTwo+"' value='"+item2.defaultValTwo+"' placeholder='"+item2.placeholderTwo+"' readonly='readonly' />"
		})
		creat_Input_list += "		</div>";
		creat_Input_list += "	</div>";
		creat_Input_list += "</div>";
	})
	// 插入DOM
	commonSidebarBody.append(creat_Input_list)
	// 获取DOM 对象
	s_chooseDate = $('.common-sidebar-body .sidebar-date input')
	s_chooseDate.on('tap',function(){
		showDtPicker($(this));
	})
}
			
// ----------------创建组件END------------------

// DOM结构加载完成后 执行
$(document).ready(function() {
	// 获取DOM节点
	commonSidebar = $('.common-sidebar-box').eq(0);
	commonSidebarHeader = $('.common-sidebar-header').eq(0);
	commonSidebarBody = $('.common-sidebar-body').eq(0);
	commonSidebarFooter = $('.common-sidebar-footer').eq(0);
	commonSidebarMask = $('.common-sidebar-mask').eq(0);
	s_backArrow = $('.common-sidebar-header .back-arrow').eq(0)
	
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

function _filterQuery(){
	console.log('**********查询操作**********')
	hidePop();
	// 遍历查询条件中的值
	eachInputVal(s_inputVal);
	eachChooseDate(s_chooseDate);
	eachChooseItem(s_chooseLabelItem);
	getListData(1);
}
function _clearAll(){
	console.log('**********清除操作**********');
	// 清除选中样式
	resInputVal(s_inputVal);
	resChooseDate(s_chooseDate);
	resChooseItem(s_chooseLabelItem);
}

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
 * eachInputVal  遍历指定元素输入框中的值
 * @param {Object}：select  接受jq选择器对象
 */
function eachInputVal(select){
	if( select == null || select.size() == 0 ){
		return;
	}
	select.each(function(){
		var to_input = $(this).attr("to_input");
		$("#"+to_input).val($(this).val());
	})
}

/**
 * eachChooseDate  遍历指定元素输入框中的值
 * @param {Object}：select  接受jq选择器对象
 */
function eachChooseDate(select){
	if( select == null || select.size() == 0 ){
		return;
	}
	select.each(function(){
		var to_input = $(this).attr("to_input");
	    $("#"+to_input).val($(this).val());
	})	
}
// ----------------确定操作END------------------
// ----------------清除操作------------------
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
 * resInputVal  清除指定元素输入框中的值
 * @param {Object}：select  接受jq选择器对象
 */
function resInputVal(select){
	select.each(function(){
		$(this).val('')
	})
}
/**
 * resChooseDate  清除指定元素输入框中的值
 * @param {Object}：select  接受jq选择器对象
 */
function resChooseDate(select){
	select.each(function(){
		$(this).val('')
	})	
}
// 清除选中数据
function resData(){
	s_itemArr = [];             // 清除单选选中值的合集
	s_inputArr = [];            // 清除输入框输入值的合集
	s_dateArr = [];             // 清除时间区间选中的合集
}

// ----------------清除操作END------------------
/**
 * 打印查询条件选中值
 */
function consoleData(){
	console.log("输入框合集为："+JSON.stringify(s_inputArr))
	console.log("单选框合集为："+JSON.stringify(s_itemArr))
	console.log("时间框合集为："+JSON.stringify(s_dateArr))
}


/**
 * getUrl 获取项目绝对路径
 */
function getUrl(url){
	var n = url.lastIndexOf("\/");
	return url.substring(0,n); // 返回项目路径
}


// 显示查询条件弹框
function showPop(flag) {
	if( flag == 'fp'){
		$(".header-title").html("分配线索");
		$(".common-sidebar-footer-fp").show();
		$(".common-sidebar-footer").hide();
		$("#commonSidebarBody-fp").show();
		$("#commonSidebarBody-main").hide();
	}else{
		$(".header-title").html("查询");
		$(".common-sidebar-footer").show();
		$(".common-sidebar-footer-fp").hide();
		$("#commonSidebarBody-fp").hide();
		$("#commonSidebarBody-main").show();
	}
	commonSidebar.show();
	commonSidebarMask.show();
	noScroll();

	// JQ获取不到默认隐藏元素的宽，高 因此在元素显示时 再计算宽，高即可
	// 设置查询框 宽度
	commonSidebar.width((screen.width - 30) + 'px');
	// -------------------
	// 设置查询框 滑动内容区高度
	commonSidebarBody.height(screen.height - commonSidebarHeader.height() - commonSidebarFooter.outerHeight())
	commonSidebar.css("left","30px");
	// -------------------
}

// 隐藏查询条件弹框
function hidePop() {
	// console.log('隐藏查询弹框')
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
/**
 * new mui.DtPicker(options)
 * @param {Object}：select  接受jq选择器对象 
 */
function showDtPicker(select){
	var dtOptions =	{ 
		"type": "date",
		"beginDate": new Date(2000, 01, 01),    //设置开始日期 
		// "endDate": new Date(2016, 04, 25),      //设置结束日期 
		"labels": ['年', '月', '日', '时', '分']//设置默认标签区域提示语 
	}
	var dtPicker = new mui.DtPicker(dtOptions); 
    dtPicker.show(function (e) { 
		// 拼接选中的 年月日
		var s_date = e.y.value +"-"+ e.m.value +"-"+e.d.value;
		// 设置选中值
		select.val(s_date)
		
		// 释放组件资源 避免多次选择后 页面上实例化组件过多导致的卡顿
		dtPicker.dispose() 
    })
	
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate(differ) {
    var date = new Date();
    if(typeof(differ) != "undefined" && differ != null){
    	date = date.valueOf() + differ * 24 * 60 * 60 * 1000;
    	date = new Date(date);
    }
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
    	strDate = "0" + strDate;
	}
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
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
		creatComponentsInput(set_data_option.input);
		creatComponentsDate(set_data_option.date);
		creatComponentsItem(itemData);
		if (typeof(initQueryFunc) == "undefined") {
			getListData(1);
		}else{
			isFirstQuery = true;
			initQueryFunc();
		}
	}
}
/**
 * 数据说明
 * @param {String}：loadType  	1-初始化查询 2-下拉查询
 */
function getListData(loadType){
	if( isLoading ){
		return false;
	}
	if(typeof(_check_validate) != "undefined"){
		if(!_check_validate()){
			return;
		}
	}
	isLoading = true;
	var tabList = $("#tabList");
	var currtUrl = _url;
	if(loadType == 1){
		_isMoreData = true;
		_curPage = 1;
		isFirstQuery = true;
		tabList.html("<div style='text-align:center;'><img src='static/img/wait.jpg' width='64' height='64'/></div>");
	}else if(loadType == 2){
		isFirstQuery = false;
		_curPage = _curPage + 1;
		currtUrl = currtUrl + "&CUR_PAGE=" + _curPage;
		tabList.append("<div style='text-align:center;' class='_nextLoad'><img src='static/img/wait.jpg' width='64' height='64'/></div>");
	}
	if( typeof(_pageSize) != "undefined" && _pageSize != null ){
		currtUrl = currtUrl + "&PAGE_SIZE=" + _pageSize;
	}
	makeFormCall(currtUrl, function(json) {
		creatComponentsList(json,loadType);
	}, "fm", false);
}