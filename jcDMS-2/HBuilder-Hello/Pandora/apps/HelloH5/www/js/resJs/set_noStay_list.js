var _url = httpUrlHead+"HallReceptionService/queryHallReceptionQuery.json?"+httpUrlEnd;
var _getFilterQueryButton = true;
var _filter = {cusSourceHall:true,visitType:true,isHall:true,cellRate:'7:5',hasPhone:true};
var itemData = null;
//tcCode加载状态
var finalStatus = 1;
var loadStatus = 0;
var initQueryFunc = function(){
	_clearAll();
	$("#paramDiv").find("input").val("");
	//设置默认值
	$("#dataType_data").find("ul li").eq(1).addClass('active');
	$(".choose-date .startTime").val(getNowFormatDate(-2));
	$(".choose-date .endTime").val(getNowFormatDate());
	_filterQuery();
};
// 2.遍历组件（根据数据长度，动态生成对应个数的组件 -- 数据驱动视图）
$(document).ready(function() {
	initSidebarData();
})

function initSidebarData(){
	set_data_option.input = getInputData();
	set_data_option.date = getDateData();
	getItemData();
}

// ------------------ 数据制作/获取 ----------------
// 输入框组件 一个
/**
 * 数据说明
 * @param {String}：title  	 		组件标题
 * @param {String}：placeholder  	输入框 提示语
 */
function getInputData(){
	return [
		{title:'姓名/手机',placeholder:'请输入',to_input:'customerNamePhone'}
	]
}

// 时间选择组件 一个
/**
 * 数据说明
 * @param {String}：title  	 		组件标题
 * @param {String}：classOne  	 	第一个选择框 类名class
 * @param {String}：placeholderOne  	第一个选择框 提示语
 * @param {Array}： items    	    组件选项
 */
function getDateData(){
	return [
		{title:'时间区间',items:[
			{classOne:'startTime',placeholderOne:'开始时间',to_inputOne:'startDate',defaultValOne:getNowFormatDate(-2),
			classTwo:'endTime',placeholderTwo:'结束时间',to_inputTwo:'endDate',defaultValTwo:getNowFormatDate()}
		]}
	]
}

// 选择组件 八个
/**
 * 数据说明
 * @param {String}：title  	 组件标题
 * @param {Boolean}：fiexdW  是否固定标签宽度(如果选项中字段长度<=4 时，用true；反之>4，用false)
 * @param {Array}：items     组件选项
 */
function getItemData(){
	itemData = 
	[
		{title:'时间类型',fiexdW:false,id:'dataType_data',to_input:'dataType',items:[
			{code:'0',value:'来访时间'},
			{code:'1',value:'创建时间',isDefault:true}
		]},
		{title:'意向级别',fiexdW:true,isMultiple:true,to_input:'intentLevel',items:[
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
		{title:'来访方式',fiexdW:false,id:'visitType_data',to_input:'visitType'},
		{title:'客户来源',fiexdW:false,id:'cusSource_data',to_input:'cusSource'}
	]
	_loadTcCodeAndCallBack_new([{code:1309,index:2},{code:1311,index:3}]);
}


function openPageDetails(id,tabType) {
	if(tabType == "0") {
		_toPage("hallReceptionEdit.html?id="+id);
	} else if(tabType == "1") {
		_toPage("hallReceptionDetail.html?id="+id);
	}
}

