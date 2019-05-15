/**
 * *** 设置跟进邀约页面 列表组件的数据 ***
 * 其他页面需要使用该【** 列表组件 **】
 * 两个步骤 即可
 * 1.在需要使用该组件的页面引入 common_list.js文件
 * 2.为了维护方便 建议 再单独建一个 【set_list_ + '使用页面名字'.js】文件
 * ------------- 例子 ---------------
 * 如 gj_list.html 页面 需要使用 【列表组件】
 * 那么 单独建立一个【set_list_gj_list.js】 文件 来定义该页面需要的【列表组件】
 */

/**
 * 1.设置数据
 * 【set_data_list】参数 再【common_list.js】有定义
 * 必须要引入【common_list.js】才可正常使用
 */ 
set_data_list = getListData();

// 2.遍历组件（根据数据长度，动态生成对应个数的组件 -- 数据驱动视图）
$(document).ready(function() {
	creatComponentsList(set_data_list);
})

// ------------------ 数据制作/获取 ----------------
/**
 * 数据说明
 * @param {String}：id  	 		顾客ID
 * @param {Number}：iconNumber  	顾客心情 1.愤怒  2.不开心兴  3.一般  4.高兴 
 * @param {String}：name  	    顾客名称  
 * @param {String}：state  	    跟进状态
 * @param {String}：phone  	    顾客电话
 * @param {String}：likeCx  	    意向车型
 * @param {Array}：items        顾客级别、热度、指数
 * @param {String}：cusLy       顾客来源
 * @param {String}：planTime    计划时间
 */
function getListData(){
	return [
		{id:'10000900',iconNumber:1,name:'荣华',state:'跟进中',wxId:'wx0001',likeCx:'CS5',items:[
			{text:'B级'},
			{text:'热度3'},
			{text:'购车指数70'}
		],cusLy:'懂车帝',planTime:'2019-09-10 17:23'},
		{id:'10000900',iconNumber:2,name:'荣华',state:'跟进中',phone:'15213080721',wxId:'wx0002',likeCx:'CS5',items:[
			{text:'B级'},
			{text:'热度3'},
			{text:'购车指数70'}
		],cusLy:'懂车帝',planTime:'2019-09-10 17:23'},
		{id:'10000900',iconNumber:3,name:'荣华',state:'跟进中',phone:'15213080721',wxId:'wx0003',likeCx:'CS5',items:[
			{text:'B级'},
			{text:'热度3'},
			{text:'购车指数70'}
		],cusLy:'懂车帝',planTime:'2019-09-10 17:23'},
		{id:'10000900',iconNumber:4,name:'荣华',state:'跟进中',phone:'15213080721',likeCx:'CS5',items:[
			{text:'B级'},
			{text:'热度3'},
			{text:'购车指数70'}
		],cusLy:'懂车帝',planTime:'2019-09-10 17:23'}
	]
}
