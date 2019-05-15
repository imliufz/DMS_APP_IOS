var _curPage = 1;
var _isMoreData = true;
var isFirstQuery = true;
var isLoading = false;
// 文件路径配置
var path = getUrl(location.href);// 获取项目 绝对路径
var curTablePath = '/components/common_list/';
var cssPath = path + curTablePath+ 'common_list.css';
// var htmlPath = path + curTablePath+ 'common_sidebar.html';
addCssLink(cssPath);

// DOM 对象
var openPageDetailsObj = null;      // 需要绑定 【进入详情】方法的元素
var openUser360Obj = null;	 		// 需要绑定 【打开360视图】方法的元素
var cellUserPhoneObj = null;	 	// 需要绑定 【拨打电话】方法的元素 滑动内容区
var sendUserMsgObj = null;  		// 需要绑定 【发送信息】方法的元素
var openWeChatObj = null;  			// 需要绑定 【微信】方法的元素
var openZhwxObj = null;  			// 需要绑定 【智慧网销】方法的元素

/**
 * creatComponentsList 【创建列表组件】
 * @param {Array}：data 数据源
 * @param string：loadType 加载方式 1-初始化加载 2-下拉加载
 */
function creatComponentsList(json,loadType) {
	var data = json.RESULT.maps
	tabList = $("#tabList");
	var creat_page_list = '';
	if( data != null && data.length > 0 ){
		// 1.创建DOM
		// 一级循环
		var initCell_1_width = 5;
		var initCell_2_width = 7;
		if(typeof(_filter.cellRate) != "undefined"){
			initCell_1_width = _filter.cellRate.split(":")[0];
			initCell_2_width = _filter.cellRate.split(":")[1];
		}
		$.each(data, function(index, item) {
			creat_page_list += "	<div class='common-list-box'>";
			creat_page_list += "		<div class='common-list-header flex-box align-items-center'>";
			if(_filter.checkBoxTable){
				creat_page_list += "		<div class='cell-2 mui-checkbox text-left' style='top:-18px;left:-5px;'>";
				creat_page_list += "			<input name='checkBox' type='checkbox' value='"+item.TAB_TYPE+"_"+item.ID+"'>";
				creat_page_list += "		</div>";
			}
			creat_page_list += "			<div class='cell-"+initCell_1_width+" open-page-details' id='"+ item.ID +"' tabType='"+ item.TAB_TYPE +"' xs_status='"+ item.STATUS +"'>";
			creat_page_list += "				<ul class='list-inline'>";
			if(_filter.isSalesConsultant){
				if(item.GENDER == "10031002"){
					creat_page_list += "				<li class='icon-state-girl'></li>";
				}else{
					creat_page_list += "				<li class='icon-state-boy'></li>";
				}
			}else{
				if(_filter.isHall){
					creat_page_list += "					<li class='icon-state-4'></li>";
				}else{
					creat_page_list += "					<li class='"+ conputedIconState(item.IS_CQ)+"'></li>";
				}
			}
			creat_page_list += "					<li class='cus-name'>"+item.CUSTOMER_NAME+"</li>";
			/*if(_filter.hasPhone){
				creat_page_list += "					<li class='cus-phone'>"+item.CONTACTOR_MOBILE+"</li>";
			}*/
			if(_filter.isSc){
				creat_page_list += "					<li class='cus-state orange'>"+item.IS_SC+"</li>";
			}
			if(_filter.otherSc){
				creat_page_list += "					<li class='cus-state orange'>"+_filter.otherSc+"</li>";
			}
			creat_page_list += "				</ul>";
			creat_page_list += "			</div>";
			creat_page_list += "			<div class='cell-"+initCell_2_width+"'>";
			creat_page_list += "				<ul class='list-inline pull-right icon-btn' tabType='"+ item.TAB_TYPE +"' id='"+ item.ID +"' phone='"+ item.CONTACTOR_MOBILE +"'>";
			if(_filter.view360 && !IsNull(item.VIEW360) && item.VIEW360 =="1"){
				creat_page_list += "				<li class='icon-360 open-user-360'></li>";
			}
			if(_filter.zhwx && !IsNull(item.WSID) && _filter.zhwx){
				creat_page_list += "				<li class='icon-zhwx open-zhwx' wsId='"+ item.WSID +"'></li>";
			}
			if(_filter.isSalesConsultant){
				creat_page_list += "					<li class='cus-phone'>"+item.CONTACTOR_MOBILE+"</li>";
			}else{
				creat_page_list += "					<li class='icon-phone cell-user-phone'></li>";
				creat_page_list += "					<li class='icon-msg send-user-msg'></li>";
			}
			if(!IsNull(item.OPEN_ID)){
				creat_page_list += "				<li class='icon-wx open-weChat' openId='"+ item.OPEN_ID +"'></li>";
			}
			creat_page_list += "				</ul>";
			creat_page_list += "			</div>";
			creat_page_list += "		</div>";
			creat_page_list += "		<div class='common-list-body open-page-details' id='"+ item.ID +"' tabType='"+ item.TAB_TYPE +"' xs_status='"+ item.STATUS +"'>";
			creat_page_list += "			<div class='flex-box align-items-center list-label'>";
			if(!_filter.isSalesConsultant){
				if(typeof(item.INTENT_SERIES_PAGE) == "undefined"){
					if(_filter.remark && !IsNull(item.REMARK)){
						creat_page_list += "				<div class='cell-3 text-left'>["+item.INTENT_SERIES+"]"+item.REMARK+"</div>";
					}else{
						creat_page_list += "				<div class='cell-1 text-left'>"+item.INTENT_SERIES+"</div>";
					}
				}else{
					if(_filter.remark && !IsNull(item.REMARK)){
						creat_page_list += "				<div class='cell-3 text-left'>["+item.INTENT_SERIES_PAGE+"]"+item.REMARK+"</div>";
					}else{
						creat_page_list += "				<div class='cell-1 text-left'>"+item.INTENT_SERIES_PAGE+"</div>";
					}
				}
			}
			
			creat_page_list += "					<div class='cell-2 text-right'>";
			creat_page_list += "						<ul class='list-inline pull-right'>";
			if(_filter.isSalesConsultant){
				creat_page_list += "						<li class='list-label-item'>"+item.SEX_DESC+"</li>";
				creat_page_list += "						<li class='list-label-item'>"+item.AGE+"</li>";
				creat_page_list += "						<li class='list-label-item'>"+item.ACADEMIC_RECORDS_DESC+"</li>";
			}
			creat_page_list += "							<li class='list-label-item'>"+item.INTENT_LEVEL_DESC+"</li>";
			if(_filter.repeatNum){
				if(typeof(item.REPEAT_NUM_PAGE) == "undefined"){
					creat_page_list += "					<li class='list-label-item'>"+item.REPEAT_NUM+"</li>";
				}else{
					creat_page_list += "					<li class='list-label-item'>"+item.REPEAT_NUM_PAGE+"</li>";
				}
			}
			// 二级循环 - 遍历item
	//		$.each(item.items,function(index2,item2){
	//			creat_page_list += "					<li class='list-label-item'>"+item2.text+"</li>";
	//		})
			creat_page_list += "						</ul>";
			creat_page_list += "					</div>";
			creat_page_list += "				</div>";
			creat_page_list += "			</div>";
			creat_page_list += "			<div class='common-list-footer open-page-details' id='"+ item.ID +"' tabType='"+ item.TAB_TYPE +"' xs_status='"+ item.STATUS +"'>";
			creat_page_list += "				<div class='flex-box align-items-center'>";
			if(_filter.cusSource){
				if(typeof(item.CUS_SOURCE_DESC_PAGE) != "undefined"){
					creat_page_list += "					<div class='cell-3'><span class='cus-laiyuan'>"+item.CUS_SOURCE_DESC_PAGE+"</span></div>";
				}else if(typeof(item.CUS_SOURCE) != "undefined"){
					creat_page_list += "					<div class='cell-3'><span class='cus-laiyuan'>"+item.CUS_SOURCE+"</span></div>";
				}
			}
			if(_filter.isSalesConsultant){
				creat_page_list += "					<div class='cell-3'><span class='cus-laiyuan'>"+item.TRADEYEAR+"</span></div>";
			}
			if(_filter.visitType){
				creat_page_list += "					<div class='cell-3'><span class='cus-laiyuan'>"+item.VISIT_TYPE_DESC+"</span></div>";
			}
			if(_filter.cusSourceHall){
				creat_page_list += "					<div class='cell-4 text-right'><span class='cus-laiyuan'>"+item.CUS_SOURCE_DESC+"</span></div>";
			}
			if(_filter.showTime){
				creat_page_list += "					<div class='cell-4 text-right'><span class='plan-time'>"+eval('item.'+_filter.showTime)+"</span></div>";
			}
			if(_filter.isSalesConsultant){
				creat_page_list += "					<div class='cell-4 text-right'><span class='plan-time'>"+item.CHANATRADEYEAR+"</span></div>";
			}
			creat_page_list += "				</div>";
			creat_page_list += "			</div>";
			creat_page_list += "		</div>"
			creat_page_list += "	</div>"
		})
	}else{
		if( isFirstQuery ){
			creat_page_list += "<div style='text-align:center;' class='_nextLoad'><font color='red'>无数据</font></div>";
		}else{
			creat_page_list += "<div style='text-align:center;' class='_nextLoad'><font color='red'>没有更多数据</font></div>";
		}
		_isMoreData = false;
	}
	if(loadType == 1){
		tabList.html(creat_page_list);
	}else if(loadType == 2){
		$("._nextLoad").remove();
		tabList.append(creat_page_list);
	}
	isLoading = false;
	if(typeof(_end_callback_func) != "undefined"){
		var totalNum = json.RESULT.totalRecords;
		var pageNum = 0;
		if(data != null){
			pageNum = data.length;
		}
		_end_callback_func(pageNum,totalNum);
	}
	
	// 3.获取DOM
	openPageDetailsObj = $(".open-page-details");
	openUser360Obj = $(".open-user-360");
	cellUserPhoneObj = $(".cell-user-phone");
	sendUserMsgObj = $(".send-user-msg");
	openWeChatObj = $(".open-weChat");
	openZhwxObj = $(".open-zhwx");
	// 4.绑定点击事件
	bindListFun()
	
}
/**
 * 初始化数据 前端展示用数据
 * 根据数据源长度，动态生成对应个数的组件
 * 数据驱动视图
 * @param {Array}：set_data_list 列表字段
 */ 
var set_data_list = [];


/**
 * 批量绑定列表事件
 */
function bindListFun(){
	openPageDetailsObj.on('tap',function(e){
		var get_id = $(this).attr("id");
		var get_tabType = $(this).attr("tabType");
		var xs_status = $(this).attr("xs_status");
		openPageDetails(get_id,get_tabType,xs_status)
	});
	
	openUser360Obj.on('tap',function(e){
		var phone = $(this).parent().attr("phone");
		openUser360(phone)
	})
	
	cellUserPhoneObj.on('tap',function(e){
		cellUserPhone(this)
	})
	
	sendUserMsgObj.on('tap',function(e){
		var get_phone = $(this).parent().attr("phone");
		sendUserMsg(get_phone)
	})
	
	openWeChatObj.on('tap',function(e){
		_setWeChat($(this).attr("openId"))
	})
	
	openZhwxObj.on('tap',function(e){
		var wsId = $(this).attr("wsId");
		var ptId = $(this).parent().attr("ptId");
		openZhwx(wsId,ptId);
	})
	
}

/**
 * 计算icon 状态
 * @param {Number}：n 状态数字
 */
function conputedIconState(n){
	var classStr = ''
	switch (n){
		case 0:
			classStr = 'icon-state-1';
			break;
		case 1:
			classStr = 'icon-state-2';
			break;
		case 2:
			classStr = 'icon-state-3';
			break;
		case 3:
			classStr = 'icon-state-4';
			break;
	}
	return classStr;
}
/**
 * openUser360 打开360视图
 */
function openUser360(phone){
	var to360Url = "view360.html?contactorMobile=" + phone;
	ToUrl(to360Url);
}

/**
 * openZhwx 打开智慧网销视图
 */
function openZhwx(wsId,ptId){
	var toUrl = "wisdomSales.html?wsId=" + wsId + "&ptId=" + ptId;
	ToUrl(toUrl);
}
/**
 * cellUserPhone 拨打顾客电话
 * @param {String}：phone 
 */
function cellUserPhone(obj){
	var tabType = $(obj).parent().attr("tabType");
	var id = $(obj).parent().attr("id");
	var phone = $(obj).parent().attr("phone");
	_setCallLog(tabType,id,phone);
	saveCallLog(obj);
	callPhone(phone);
}
/**
 * sendUserMsg 拨打顾客电话
 * @param {String}：phone 
 */
function sendUserMsg(phone){
	//短信数据加载
	var url = httpUrlHead + "PotcusAchieveService/queryMsgList.json?" + httpUrlEnd;
	makeFormCall(url, function(json) {
		if (json.RESULT.funcStatus == '1') {
			if (json.msgList != null && json.msgList.length > 0) {
				var appendHtml = '<ul class="round"><table id="tb_query">';
				for (var i = 0; i < json.msgList.length; i++) {
					appendHtml +=
						'<tr class="biaoge"><td class="msgTd" style="height: 35px;border: none;width: 100%;font-size: 16px;" id="' +
						json.msgList[i].ID + '"><li class="nob" >' + json.msgList[i].TITLE;
					appendHtml += '</li></td><td style="display:none">' + json.msgList[i].CONTENT + '</td></tr>';
				}
				appendHtml += "</table></ul>";
				layer.open({
					title: '短信模板',
					content: appendHtml,
					cancel: function() {
						sendMsg(phone, '');
					}
				});
				$(".msgTd").click(function() {
					var content = $(this).next().text();
					sendMsg(phone, content);
					layer.closeAll();
				});
			} else {
				sendMsg(phone, '');
			}
		} else {
			MuiAlert("查询失败!请联系管理员");
		}
	}, "fm");
}

/**
 * getUrl 获取项目绝对路径
 */
function getUrl(url){
	var n = url.lastIndexOf("\/");
	return url.substring(0,n); // 返回项目路径
}

function callPhone(phone){
	window.location.href='tel:'+phone;
}

function saveCallLog(obj) {
	var id = $(obj).parent().attr("id");
	var phone = $(obj).parent().attr("phone");
	var isClick = $(obj).attr("isClick");
	if (isClick == "1") {
		//已经拨号，无需二次拨号
	} else {
		var url = httpUrlHead + "PotcusAchieveService/saveCallLog.json?id=" + id + "&cusPhone=" + phone + "&" + httpUrlEnd;
		makeFormCall(url, function(json) {}, "fm");
		$(obj).attr("isClick", "1");
	}
}
function _setWeChat(openid) {
	var logonUser = JSON.parse(getLocalStorage("logonUser"));
	var salesConsultantPhone = logonUser.TEL;
	if (salesConsultantPhone == undefined || salesConsultantPhone == null || salesConsultantPhone == "") {
		MuiAlert("当前登录用户失效,请重新登录!", function() {
			ToUrl("login.html", 2);
		});
		return;
	}
	var weChatUrl = logonUser.weChatUrl;
	ToUrl(weChatUrl + "?openid=" + openid + "&mobile=" + salesConsultantPhone);
}

$(window).scroll(function() {
	var scrollTop = $(window).scrollTop();
	var windowHeight = $(window).height();
	var height = $(document).height();
	if ( _isMoreData && height - (scrollTop + windowHeight) <= 0) {
		getListData(2);
	}
});

//全选/取消按钮
function changeCheck(obj){
	if($(obj).is(":checked")){
		$("input[name='checkBox']").attr("checked",true);
	}else{
		$("input[name='checkBox']").attr("checked",false);
	}
}

