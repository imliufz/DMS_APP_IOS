var _url;
//待分配
var _url_1 = httpUrlHead+"PotcusAchieveService/queryAllocatePendList.json?"+httpUrlEnd;
//未留档分配
var _url_2 = httpUrlHead+"HallReceptionService/queryHallReceptionQuery.json?"+httpUrlEnd;
var _getFilterQueryButton = true;
var _filter;
var _filter_1 = {remark:true,showTime:'NEXT_TIME_PAGE',repeatNum:true,cusSource:true,checkBoxTable:true};
var _filter_2 = {isHall:true,visitType:true,cusSourceHall:true,checkBoxTable:true};
var _isFp = false;
var itemData = null;
var itemDataFp = null;
//tcCode加载状态
var finalStatus = 1;
var loadStatus = 0;
var _clickType = 1;
var initQueryFunc = function(){
	loadFpNum();
	_clearAll();
	$("#paramDiv").find("input").val("");
	$("ul[to_input='isFp']").find("li").eq(1).addClass("active");
	if(_clickType == 1){
		_url = _url_1;
		_filter = _filter_1;
	}else{
		_url = _url_2;
		_filter = _filter_2;
	}
	_filterQuery();
};
var _check_validate = function(){
	/*if (_clickType == 2 && (IsNull(document.getElementById('startDate').value) || IsNull(document.getElementById('endDate')
			.value))) {
		MuiAlert("退车必须录入退车开始时间和结束时间");
		return false;
	}*/
	return true;
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
		{title:'时间类型',fiexdW:false,to_input:'dataType',items:[
			{code:'1',value:'计划时间'},
			{code:'2',value:'下发时间'},
			{code:'3',value:'创建时间'}
		]},
		{title:'是否分配',fiexdW:true,to_input:'isFp',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否',isDefault:true}
		]},
		{title:'是否OEM来源',fiexdW:true,onClick:'changeCustomer',to_input:'isOem',items:[
			{code:'10041001',value:'是'},
			{code:'10041002',value:'否'}
		]},
		{title:'OEM客户来源',fiexdW:false,isHide:true,id:'oemCusSource_data',to_input:'oemCusSource'},
		{title:'客户来源',fiexdW:false,isHide:true,id:'cusSource_data',to_input:'cusSource'},
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
	itemDataFp = 
	[
		{title:'选择分配顾问',fiexdW:true,isHide:false,to_input:'salesConsultantSel'}
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
			itemData[6].isHide = false;
			itemData[6].items = scItemData;
		} else {
			MuiAlert("该分组下无销售顾问!");
		}
	}
	var url = httpUrlHead+"PotcusAchieveService/querySalesConsultantList.json?isFp=1&"+httpUrlEnd;
	makeFormCall(url,function(json){
		if (json.tsList != null && json.tsList.length > 0) {
			var scItemData = new Array(json.tsList.length);
			for(var i = 0;i < json.tsList.length;i++) {
				scItemData[i] = {code:json.tsList[i].NAME,value:json.tsList[i].NAME};
			}
			itemDataFp[0].items = scItemData;
			//顾问分配弹出界面
			creatGwList(itemDataFp);
		} else {
			MuiAlert("该分组下无销售顾问!");
		}
	},"fm");
	_loadTcCodeAndCallBack_new([{code:3031,index:3},{code:1311,index:4}]);
}

/**
 * creatComponentsItem 【创建单选组件】
 * @param {Array}：data 数据源
 */
function creatGwList(data){
	
	// 1.创建DOM
	var creat_Item_list = '';
	// 一级循环 - 遍历标题
	$.each(data,function(index,item){
		if( index !=0 ){
			return;
		}
		if(typeof(item.items) == undefined || item.items == null || item.items.length < 1){
			return;
		}
		if(!IsNull(item.id)){
			creat_Item_list += 	"<div id='"+item.id+"' class='sidebar-cell sidebar-choose ' ";
		}else{
			creat_Item_list += 	"<div class='sidebar-cell sidebar-choose ' ";
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
			creat_Item_list += "	<li class='choose-label-item";
			if(item.fiexdW){
				creat_Item_list += " fiexd-w";
			}
			creat_Item_list +=  "' code='"+ item2.code +"'>"+ item2.value +"</li>";
		})
		creat_Item_list +=      	"</ul>";
		creat_Item_list += 		"</div>";
		creat_Item_list += 	"</div>";
		
	})
	// 2.插入DOM
	$("#commonSidebarBody-fp").append(creat_Item_list);
	$("#commonSidebarBody-fp").height(screen.height - commonSidebarHeader.height() - commonSidebarFooter.outerHeight())
	var footerFp = "<div class='common-sidebar-footer-fp'>\
			<div class='flex-box align-items-center'>\
				<div class='cell-1'>\
					<button class='cancel-btn'>取消</button>\
				</div>\
				<div class='cell-1'>\
					<button class='confirm-btn'>确定</button>\
				</div>\
			</div>\
		</div>";
	$(".common-sidebar-box").append(footerFp);
	var fp_confirmBtn = $('.common-sidebar-footer-fp button.confirm-btn')
	var fp_cancelBtn = $('.common-sidebar-footer-fp button.cancel-btn')
	fp_confirmBtn.on('tap',fpFunc)
	fp_cancelBtn.on('tap',hidePop)
	var fp_chooseLabelItem = $('.common-sidebar-body').eq(1).find('li.choose-label-item');
	fp_chooseLabelItem.on('tap',chooseItemTap)
	// 5.防止点击穿透
	preventDefaultObj(fp_chooseLabelItem)
}

function openPageDetails(id,tabType) {
	if(_clickType == 1){
		ToUrl("potcusDetail.html?id="+id+"&tabType="+tabType);
	}else{
		_toPage("hallReceptionDetail.html?id="+id);
	}
	
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

