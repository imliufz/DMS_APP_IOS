// 文件路径
var path = '';

if (window.fPath) {
	path = fPath + '/';
} else {
	path = './components/choose_list';
}
/**
 * 单选组件HTML片段
 */
var choose_list =
	"<div class='choose_l_box' style='display:none'>\
		<h4 class='choose_l_title'>标题</h4>\
		<ul class='choose_l_data'></ul>\
	</div>\
	<div class='mask_box' style='display:none'></div>";
document.write(choose_list);
/**
 * 引入单选组件CSS
 */
addCssLink(path + '/choose_list.css');
// 获取DOM对象
var popBox = $(".choose_l_box");
var popTitle = $(".choose_l_title");
var popData = $(".choose_l_data");
var maskBox = $(".mask_box");

// 遮罩绑定事件
maskBox.on('tap', function() {
	heiddenChooseList();
})
// 阻止冒泡 防止点击穿透
preventDefault(".mask_box");

function loadSelectRes(){
	if( se_loadStatus == se_finalStatus){
		//重新填装下拉框
		$.each(newSelects, function(index,item) {
			var options = $("#"+item.id).find("option");
			var selectObj = $("#"+item.id);
			var optionData = null;
			if( options != null && options.size()>0){
				optionData = new Array();
				options.each(function(index){
					var codeVal = $(this).val();
					var nameVal = $(this).text();
					var optionJson = {code:codeVal,name:nameVal};
					optionData[index] = optionJson;
				})
				selectObj.off();
				/*selectObj.on('tap', function() {
					setChooseList(item, optionData, selectObj); // 设置单选组件数据
					showChooseList(); // 显示单选组件
				});*/
				
				var timeOutEvent=0;
				selectObj.on({
					touchstart: function(e){
					},
					touchmove: function(){
			            setChooseList(item, optionData, selectObj); // 设置单选组件数据
			            if(!selectObj.is(":disabled")){
			            	showChooseList(); // 显示单选组件
			            }
					},
					touchend: function(){
				   		setChooseList(item, optionData, selectObj); // 设置单选组件数据
				   		if(!selectObj.is(":disabled")){
							showChooseList(); // 显示单选组件
						}
					}
				});
			}else{
				selectObj.off();
			}
		});
	}
}

/**
 * setChooseList 组件参数设置
 * @param {String}：title 单选标题
 * @param {Object}：data  数据 
 * @param {String}：id    展示选中值的元素的ID 
 */
function setChooseList(item, data, id) {
	// 每次渲染组件前 需要重置一次
	resChooseList();
	// title、data均有值时才渲染组件
	if (item.title && data) {
		// 更改标题
		popTitle.text(item.title);

		// 根据数据编号，遍历对应数据与HTML片段
		var dataArray = new Array();
		var dataIndex = 0;
		$.each(data, function(index,item) {
			popData.append("<li class='item' code=" + item.code + ">" + item.name + "</li>");
		})
		// 绑定事件
		preventDefault(".choose_l_data li"); // 阻止冒泡 防止点击穿透
		$(".choose_l_data li").on('tap', function() {
			$(this).addClass("active").siblings().removeClass("active");
			var val_k = $(this).attr("code"); // 当前选中项 K值
			heiddenChooseList();
			id.val(val_k);
			if(item.onChange){
				//联动下拉重新加载数据
				var funArray = item.onChange.split(",");
				$.each(funArray,function(index,funStr){
					var funParams = funStr.split(":");
					if(funParams.length == 1){
						if( funParams[0] == 'knowWayChange'){
							var _mediaType = $("#MEDIA_TYPE").val();
							var _cusSource = $("#CUS_SOURCE").val();
							eval(funParams[0]+"('"+_cusSource+"','"+_mediaType+"')");
						}else{
							eval(funParams[0]+"('"+val_k+"')");
						}
					}else if(funParams.length == 2){
						eval(funParams[0]+"('"+val_k+"','"+funParams[1]+"')");
					}
				});
			}
			return;
		})

		// 获取上一次选着值
		// 如果为 input组件的写法
		// var lastSel = id.val();// 更新 V值

		// 如果为 Select组件的写法（两种方式均可）
		var lastSel = id.find("option:selected").attr("value"); // 获取上一次选中值的code 
		// var lastSel = id.find("option:selected").text();    // 获取上一次选中值的text 
		if (lastSel) {
			// 激活上一次选择值
			activeItem(data, lastSel, id)
		}
	}
}

/**
 * filtrateValue 数据过滤
 */
function filtrateValue(parm, k) {
	// console.log("选中："+parm[k]);
	return parm[k]
}
/**
 * resChooseList 重置组件 
 */
function resChooseList() {
	popData.empty();
	// console.log('重置组件')
}

/**
 * 隐藏单选框
 */
function heiddenChooseList() {
	maskBox.hide();
	popBox.hide();
	openScorll("body");
}

/**
 * 显示单选框
 */
function showChooseList() {
	maskBox.show();
	popBox.show();
	noScorll("body");
}

/**
 * activeItem 
 * 激活,显示上一次选中的值（用当前数据字典与选中值做对比）
 * @param {Object}：data     当前数据 
 * @param {String}：lastSel  上一次选中的值
 */
function activeItem(data, lastSel) {
	$(".choose_l_data").find("li[code='"+lastSel+"']").addClass("active");
//	console.log('上一次选中值：' + lastSel)
//	var arrK = []; // K值数组
//	var arrV = []; // V值数组
//	// 对象转数组
//	$.each(data, function(index,item) {
//		arrK.push(k)
//		arrV.push(v)
//	})
	// 上与一次选中的 K值对比，并获取下标
	//getIndex(arrK, lastSel)
	// 上与一次选中的 V值对比，并获取下标
	//getIndex(arrV, lastSel)
}

/**
 * 对比参数 获取下标  getIndex
 * @param {Array}：arr      需要对比的K、V数组 
 * @param {String}：lastSel  上一次选中的值
 */
function getIndex(arr, lastSel) {
	// 对比上与一次选中的值，并获取下标
	$.each(arr, function(index, item) {
		if (item == lastSel) {
			$(".choose_l_data").find("li").eq(index).addClass("active");
		}
	})
}

/**
 * preventDefault 阻止冒泡 防止点击穿透
 * @param {String}：select  绑定点击事件的元素
 */
function preventDefault(select) {
	$(select).on("touchend", function(event) {
		event.preventDefault();
	})
}

/**
 * noScorll 当弹出层，需要滚动时，则要禁止背景列表滚动
 * @param {String}：select  绑定点击事件的元素
 */
function noScorll(select) {
	$(select).addClass("no-scroll")
}
/**
 * openScorll 还原背景列表滚动
 * @param {String}：select  绑定点击事件的元素
 */
function openScorll(select) {
	$(select).removeClass("no-scroll");
}

/**
 * 引入组件css
 */
function addCssLink(src) {
	var link = document.createElement("link");
	link.rel = "stylesheet"
	link.type = "text/css";
	link.href = src;
	document.getElementsByTagName("head")[0].appendChild(link);
}
