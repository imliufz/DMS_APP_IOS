var _url = httpUrlHead + "SalesConsultantService/querySalesConsultantList.json?" + httpUrlEnd;;
var _getFilterQueryButton = true;
var _filter = {checkBoxTable:true,isSalesConsultant:true};
var itemData = null;
//tcCode加载状态
var finalStatus = 0;
var loadStatus = 0;
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
	checkFinal();
})

function initSidebarData(){
	set_data_option.input = getInputData();
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
		{title:'顾问姓名/手机',placeholder:'请输入',to_input:'scNamePhone'}
	]
}

function openPageDetails(id,tabType) {
	_toPage("sales_consultant_update.html?id="+id);
	
}

function setStatus(type){
	$("input[name='checkBox']").attr("checked",true);
	event.preventDefault();
}

