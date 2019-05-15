var _url = httpUrlHead + "PotcusAchieveService/queryPotcusFollowList.json?" + httpUrlEnd;
var _filter = {showTime:'NEXT_TIME_PAGE',view360:true,zhwx:true,isSc:true,repeatNum:true,cusSource:true,cellRate:'6:8'};
var _getFilterQueryButton = true;
var itemData = null;
//tcCode加载状态
var finalStatus = 2;
var loadStatus = 0;
var _clickType = 1;
var tapStatus = false;
var initQueryFunc = function(){
	_clearAll();
	$("#paramDiv").find("input").val("");
	$("ul[to_input='dataType']").find("li").eq(0).addClass("active");
	if(_clickType == 2){
		$("#status").val("30331003");
		$("ul[to_input='isFirstGj']").find("li").eq(0).addClass("active");
	}else if(_clickType == 3){
		$("ul[to_input='isCQ']").find("li").eq(0).addClass("active");
	}
	if(_clickType != 2){
		$("#status").val("30331003,30331004");
	}
	$(".choose-date .endTime").val(getNowFormatDate());
	_filterQuery();
};
//
var _end_callback_func = function(pageNum,totalNum){
	if(IsNull(totalNum)){
		totalNum = 0;
	}
	if(_clickType == 1){
		$("#jrdgjNum").text(totalNum);
	}else if(_clickType == 2){
		$("#scdgjNum").text(totalNum);
	}else if(_clickType == 3){
		$("#cqNum").text(totalNum);
	}
	if (isSc) {
		$("#nurse").animate({
			scrollTop: scTop
		}, 500);
		if (pageNum != null && pageNum > 0) {
			_curPage = Math.ceil(pageNum / 10) + 1;
		}
	}
	isSc = false;
	_pageSize = null;
	tapStatus = false;
}
// 2.遍历组件（根据数据长度，动态生成对应个数的组件 -- 数据驱动视图）
$(document).ready(function() {
	$("#endDate").val(getNowFormatDate());
	var SALES_CONSULTANT01 = $("#SALES_CONSULTANT01").val();
	if(IsNull(SALES_CONSULTANT01)){
		queryTipNum();
	}
	initSidebarData();
	$(".table-menu ul li").each(function(index){
		$(this).on("tap",function(e){
			if(_clickType == index+1){
				return;
			}
			if(!tapStatus){
				tapStatus = true;
				queryFilter(this,index+1)
			}
		});
		
	});
})

function queryTipNum(){
	var tipNumUrl = httpUrlHead + "PotcusAchieveService/queryGjTipNum.json?" + httpUrlEnd;
	makeFormCall(tipNumUrl, function(json) {
		$("#jrdgjNum").text(json.jrNum);
		$("#scdgjNum").text(json.scNum);
		$("#cqNum").text(json.cqNum);
	}, "fm", false);
}

function queryFilter(obj,index){
	var isHaveActive = $(obj).hasClass("active");
	if( isHaveActive ){
		return;
	}
	$(obj).addClass("active").siblings().removeClass("active");
	_clickType = index;
	initQueryFunc();
}

function initSidebarData(){
	set_data_option.input = getInputData();
	getItemData();
	set_data_option.date = getDateData();
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
		{title:'时间类型',fiexdW:false,to_input:'dataType',items:[
			{code:'0',value:'计划时间',isDefault:true},
			{code:'1',value:'创建时间'},
			{code:'2',value:'下发时间'},
			{code:'3',value:'执行时间'},
			{code:'4',value:'邀约到店时间'}
		]},
		{title:'是否超期',fiexdW:true,to_input:'isCQ',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
		]},
		{title:'是否首次跟进',fiexdW:true,to_input:'isFirstGj',onClick:'changeFirst',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
		]},
		{title:'是否OEM来源',fiexdW:true,onClick:'changeCustomer',to_input:'isOem',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
		]},
		{title:'OEM客户来源',fiexdW:false,isHide:true,id:'oemCusSource_data',to_input:'oemCusSource'},
		{title:'客户来源',fiexdW:false,isHide:true,id:'cusSource_data',to_input:'cusSource'},
		{title:'是否云店线索',fiexdW:true,to_input:'isCloudStore',items:[
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
		{title:'意向车系',fiexdW:false,to_input:'intentSeries'},
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
			itemData[9].isHide = false;
			itemData[9].items = scItemData;
		} else {
			MuiAlert("该分组下无销售顾问!");
		}
	}
	_loadTcCodeAndCallBack_new([{code:4,index:8},{code:3031,index:4},{code:1311,index:5}]);
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
function openPageDetails(id, tabType) {
	scTop = document.body.scrollTop;
	if(tabType == "2") {
		_toPage("potcusFollow.html?id=" + id + "&tabType=" + tabType);
		scTop = document.body.scrollTop;
	} else {
		var isClick = $("#_plh" + tabType + "_" + id).attr("isClick");
		if(isClick == "1") {
			_toPage("potcusFollow.html?id=" + id + "&tabType=" + tabType);
			scTop = document.body.scrollTop;
		} else {
			//验证是否已经拨号
			var url = httpUrlHead + "PotcusAchieveService/validateIsCall.json?id=" + id + "&tabType=" + tabType + "&" +
				httpUrlEnd;
			makeFormCall(url, function(json) {
				if(json.isCall == "1") {
					_toPage("potcusFollow.html?id=" + id + "&tabType=" + tabType);
					scTop = document.body.scrollTop;
				} else {
					MuiAlert("请先拨号后才能进行跟进!");
				}
			}, "fm");
		}
	}
}
