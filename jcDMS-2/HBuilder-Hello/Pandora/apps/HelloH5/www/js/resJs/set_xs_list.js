var _url = httpUrlHead+"PotcusAchieveService/queryPotentialCustomerFollowList.json?"+httpUrlEnd;
var _filter = {showTime:'ALLOCATED_TIME',view360:true,zhwx:true,isSc:true,repeatNum:true,cusSource:true,cellRate:'6:5'};
var _getFilterQueryButton = true;
var itemData = null;
//tcCode加载状态
var finalStatus = 1;
var loadStatus = 0;
var initQueryFunc = function(){
	_clearAll();
	$("#paramDiv").find("input").val("");
	$("#dataType_data").find("ul li").eq(1).addClass('active');
	var searchTxt = UrlParm.parm("search");
	if(searchTxt != undefined && searchTxt != "undefined" && searchTxt != ""){
		var validateLevel = ["H","A","B","C","N","FO","F0","F","O","D"];
		var validateLevelValue = ["13101001","13101002","13101003","13101004","13101005","13101006","13101006","13101007","13101008","13101009"];
		var validateLevelText = ["H级","A级","B级","C级","N级","FO级","FO级","F级","O级","D级"];
		var searchLevelText = "";
		var searchLevelValue = "";
		var searchTxts = searchTxt.split(",") > 1 ? searchTxt.split(",") : searchTxt.split("，");
		for(var i = 0; i < validateLevel.length;i++){
			for(var j = 0;j < searchTxts.length; j++){
				if(searchTxts[j].toUpperCase().indexOf(validateLevel[i]) >= 0){
					searchLevelText += validateLevelText[i]+",";
					searchLevelValue += validateLevelValue[i]+",";
					break;
				}
			}
		}
		if(searchLevelText != "" && searchLevelValue != ""){
			var searchLevelValues = searchLevelValue.split(",");
			$("ul[to_input='intentLevel']").find("li").each(function(){
				for(i in searchLevelValues){
					if($(this).attr("code") == searchLevelValues[i]){
						$(this).addClass("active");
						break;
					}
				}
			});
		} else {
			$("#customerNamePhone_s").val(searchTxt);
			_url = httpUrlHead+"PotcusAchieveService/queryPotcusIndexSearch.json?"+httpUrlEnd; 
		}
	}else{
		//设置默认值
		$(".choose-date .startTime").val(getNowFormatDate());
		$(".choose-date .endTime").val(getNowFormatDate());
	}
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
		{title:'姓名/手机',placeholder:'请输入',to_input:'customerNamePhone',id:'customerNamePhone_s'},
		{title:'活动代码/名称',placeholder:'请输入',to_input:'campaignCodeName'}
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
			{classOne:'startTime',placeholderOne:'开始时间',to_inputOne:'startDate',defaultValOne:'',
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
		{title:'时间类型',fiexdW:false,to_input:'dataType',id:'dataType_data',items:[
			{code:'0',value:'计划时间'},
			{code:'1',value:'创建时间',isDefault:true},
			{code:'2',value:'下发时间'},
			{code:'3',value:'执行时间'},
			{code:'4',value:'邀约到店时间'}
		]},
		{title:'是否OEM下发',fiexdW:true,onClick:'changeCustomer',to_input:'isOem',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
		]},
		{title:'OEM客户来源',fiexdW:false,isHide:true,id:'oemCusSource_data',to_input:'oemCusSource'},
		{title:'客户来源',fiexdW:false,isHide:true,id:'cusSource_data',to_input:'cusSource'},
		{title:'是否云店线索',fiexdW:true,to_input:'isCloudStore',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
		]},
		{title:'到店次数',fiexdW:true,to_input:'arriveTimes',items:[
			{code:'1',value:'首次到店'},
			{code:'2',value:'二次到店'}
		]},
		{title:'是否首次超期',fiexdW:true,to_input:'isFirstCQ',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
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
		{title:'选择顾问',fiexdW:true,isHide:true,isMultiple:true,to_input:'salesConsultant'}
	]
	var IS_MANAGER = getLocalStorage("IS_MANAGER");
	if (IS_MANAGER == 10041001) { //销售经理
		var logonUser = JSON.parse(getLocalStorage("logonUser"));
		var salesConsultant = logonUser.salesConsultant.split(",");
		if (salesConsultant != null && salesConsultant.length > 0) {
			var scItemData = new Array(salesConsultant.length);
			for (var i = 0; i < salesConsultant.length; i++) {
				var name = salesConsultant[i].replace(/\'/g, "");
				scItemData[i] = {code:name,value:name};
			}
			itemData[8].isHide = false;
			itemData[8].items = scItemData;
		} else {
			MuiAlert("该分组下无销售顾问!");
		}
	}
	_loadTcCodeAndCallBack_new([{code:3031,index:2},{code:1311,index:3}]);
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

/**
 * 进入详情页面
 */
function openPageDetails(id, tabType ,status) {
	var toPageHtml = "potcusDetail.html";
	if( status =="30331003" || status =="30331004" ){
		toPageHtml = "potcusFollow.html";
	}
	if(tabType == "2") {
		_toPage(toPageHtml+"?id="+id+"&tabType="+tabType);
	} else {
		var isClick = $("#_plh"+tabType+"_"+id).attr("isClick");
		if(isClick == "1") {
			_toPage(toPageHtml+"?id="+id+"&tabType="+tabType);
		} else {
			//验证是否已经拨号
			var url = httpUrlHead+"PotcusAchieveService/validateIsCall.json?id="+id+"&tabType="+tabType+"&"+httpUrlEnd;
			makeFormCall(url,function(json){
				if(json.isCall == "1") {
					_toPage(toPageHtml+"?id="+id+"&tabType="+tabType);
				} else {
					MuiAlert("请先拨号后才能进行跟进!");
				}
			},"fm");
		}
	}
}
