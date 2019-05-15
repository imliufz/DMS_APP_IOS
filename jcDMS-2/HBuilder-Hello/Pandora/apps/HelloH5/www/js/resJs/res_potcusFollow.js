/**
 * 2019-3-21 展厅接待 
 */
console.log('------------------***********---------------------')
console.log("屏幕物理分辨率的高: " + window.screen.height);
console.log("屏幕物理分辨率的宽: " + window.screen.width);
console.log('------------------***********---------------------');

var se_finalStatus = 1;
var se_loadStatus = 0;
var clearBtn = null;
var newSelects = [{
		id: 'gender',
		title: '性别'
	}, {
		id: 'promResult',
		title: '跟进过程',
		onChange: 'isShow'
	}, {
		id: 'promWay',
		title: '跟进方式'
	}, {
		id: 'nextGrade',
		title: '促进后级别',
		onChange: 'changeLevel'
	}, {
		id: 'intentSeries',
		title: '意向车系',
		onChange: '_changeSMPC:1'
	}, {
		id: 'intentSeries',
		title: '意向车系',
		onChange: '_changeSMPC:1'
	}, {
		id: 'intentSeries',
		title: '意向车系',
		onChange: '_changeSMPC:1'
	},
	{
		id: 'intentModel',
		title: '意向车型',
		onChange: '_changeSMPC:2'
	}, {
		id: 'intentPackage',
		title: '意向配置',
		onChange: '_changeSMPC:3'
	}, {
		id: 'color',
		title: '意向颜色'
	}, {
		id: 'failType',
		title: '战败类型',
		onChange:'changeFailType'
	}, {
		id: 'failReason',
		title: '战败原因',
		onChange:'_changeFailReason'
	}, {
		id: 'failBran',
		title: '战败品牌',
		onChange:'_changeFailBran:failSeries'
	}, {
		id: 'failSeries',
		title: '战败车系'
	}
];

$(document).ready(function() {
	console.log("DOM加载完")
})

// 取消 替换为 删除图标
function setClearIcon() {
	clearBtn = $("input[name='clearBtn']")
	clearBtn.addClass('icon-clear');
	clearBtn.css({
		'background-position': '70%'
	});
	clearBtn.val('');
	
	$("#birthDay").css({'text-indent':'2px'})
	$("#contactorMobile").css({'text-indent':'0px'})
}
// ---------------------------
// 设置选择按钮样式
function setChooseBtn(){
	$("#activityChooseBtn").css({
		'border': '1px solid #1790E4',
		'background-color': '#FFFFFF',
		'color': '#1790E4',
		'font-size': '13px',
		'border-radius': '15px'
	})
}