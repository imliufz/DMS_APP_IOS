/**
 * 2019-3-21 展厅接待 
 */
var clearBtn = null;
var newSelects = [{
		id: 'GENDER',
		title: '性别'
	}, {
		id: 'VISIT_TYPE',
		title: '来电方式',
		onChange: 'visitTypeChange'
	},
	{
		id: 'INTENT_LEVEL',
		title: '意向级别'
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
		id: 'IS_SECOND_LEVEL',
		title: '是否二网客流'
	}, {
		id: 'IS_MORTAGE',
		title: '是否按揭'
	}, {
		id: 'IS_SWAPCAR',
		title: '二手车置换'
	}, {
		id: 'CUS_SOURCE',
		title: '一级客户来源',
		onChange: 'knowWayChange,cusSourceChange'
	}, {
		id: 'IS_MORTAGE',
		title: '是否按揭'
	}, {
		id: 'CUS_SOURCE_SMALL',
		title: '二级客户来源'
	}, {
		id: 'MEDIA_TYPE',
		title: '了解途径',
		onChange: 'knowWayChange'
	}, {
		id: 'IS_TEST_DRIVE',
		title: '是否试乘试驾',
		onChange: 'isTestDriveChange'
	}, {
		id: 'IS_TEST',
		title: '是否试乘',
		onChange: 'isTestChange'
	}, {
		id: 'IS_DRIVE',
		title: '是否试驾',
		onChange: 'isDriveChange'
	}, {
		id: 'IS_SATISFIED',
		title: '是否满意'
	}
];
var se_finalStatus = 2;
var se_loadStatus = 0;

$(document).ready(function() {
	// 取消 替换为 删除图标
	clearBtn = $("input[name='clearBtn']")
	clearBtn.addClass('icon-clear');
	clearBtn.css({
		'background-position': '70%'
	});
	clearBtn.val('');
})
