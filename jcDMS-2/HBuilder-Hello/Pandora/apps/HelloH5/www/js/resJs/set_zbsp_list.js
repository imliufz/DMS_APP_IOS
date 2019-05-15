var _url = httpUrlHead+"PotcusAchieveService/queryPotCusFailList.json?"+httpUrlEnd;
var _getFilterQueryButton = true;
var _filter = {repeatNum:true,cusSource:true,cellRate:'8:5',hasPhone:true};
var itemData = null;
//tcCode加载状态
var finalStatus = 0;
var loadStatus = 0;
var seriesData = "";//意向车系
var oemCustomerData = "";//OEM客户来源
var customerData = "";//客户来源
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
			{classOne:'startTime',placeholderOne:'开始时间',to_inputOne:'failDateBegin',defaultValOne:'',
			classTwo:'endTime',placeholderTwo:'结束时间',to_inputTwo:'failDateEnd',defaultValTwo:''}
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
		{title:'选择顾问',fiexdW:true,isHide:true,isMultiple:true,to_input:'salesConsultant'}
	]
	if (getLocalStorage("IS_MANAGER") == 10041001) { //销售经理
		var logonUser = JSON.parse(getLocalStorage("logonUser"));
		var salesConsultant = logonUser.salesConsultant.split(",");
		if (salesConsultant != null && salesConsultant.length > 0) {
			var scItemData = new Array(salesConsultant.length);
			for (var i = 0; i < salesConsultant.length; i++) {
				var name = salesConsultant[i].replace(/\'/g, "");
				scItemData[i] = {code:name,value:name};
			}
			itemData[0].isHide = false;
			itemData[0].items = scItemData;
		} else {
			MuiAlert("该分组下无销售顾问!");
		}
	}
	checkFinal();
}

/**
 * 进入详情页面
 */
function openPageDetails(id, tabType) {
	if(IS_MANAGER == "10041001"){
		_toPage("potcusDetail.html?id="+id+"&tabType="+tabType+"&flag=2");
	} else {
		_toPage("potcusDetail.html?id="+id+"&tabType="+tabType);
	}
}

