var _url = httpUrlHead + "ReportServiceApp/backVin.json?" + httpUrlEnd;
var _getFilterQueryButton = true;
var _filter = {showTime:'DT_SCHEDULE_DATE',view360:true,zhwx:true,otherSc:'退车',repeatNum:true,cusSource:true,cellRate:'8:5',hasPhone:true};
var itemData = null;
//tcCode加载状态
var finalStatus = 2;
var loadStatus = 0;
var _clickType = 1;
var initQueryFunc = function(){
	_clearAll();
	$("#paramDiv").find("input").val("");
	if(_clickType == 1){
		$(".sidebar-date").hide();
	}else{
		$(".choose-date .startTime").val(getNowFormatDate());
		$(".choose-date .endTime").val(getNowFormatDate());
		$(".sidebar-date").show();
	}
	_filterQuery();
};
var _check_validate = function(){
	if (_clickType == 2 && (IsNull(document.getElementById('startDate').value) || IsNull(document.getElementById('endDate')
			.value))) {
		MuiAlert("退车必须录入退车开始时间和结束时间");
		return false;
	}
	return true;
}
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
			{classOne:'startTime',placeholderOne:'开始时间',to_inputOne:'startDate',defaultValOne:getNowFormatDate(),
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
		{title:'是否OEM来源',fiexdW:true,onClick:'changeCustomer',to_input:'isOem',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
		]},
		{title:'OEM客户来源',fiexdW:false,isHide:true,id:'oemCusSource_data',to_input:'oemCusSource'},
		{title:'客户来源',fiexdW:false,isHide:true,id:'cusSource_data',to_input:'cusSource'},
		{title:'意向车系',fiexdW:false,to_input:'intentSeries'}
	]
	_loadTcCodeAndCallBack_new([{code:4,index:3},{code:1309,index:1},{code:1311,index:2}]);
}


function openPageDetails(id,tabType) {
	ToUrl("potcusDetail.html?id=" + id + "&tabType=" + tabType);
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

