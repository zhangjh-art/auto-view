/**
 * 扩展一个Menu模块，获取左侧菜单
 * 目前菜单栏是通过登录时获取的用户菜单权限进行构造
 **/
layui.define('jquery', function(exports) {
	var $ = layui.jquery;
	var menu = {
		getMenu: function() {
			console.log(JSON.parse(localStorage.getItem("menuList")));
			console.log(JSON.parse(localStorage.getItem("userInfo")));
			var menuList = JSON.parse(localStorage.getItem("menuList"));
			var items = [];
			var _ul = $('<ul></ul>').addClass('nav').attr('id', 'nav');
			$.each(menuList, function(index, val) {
				if(val.parentid==-1){
					var item = '<li id="menu' + val.id + '"><a _href="' + val.pageUrl + '"><i class="layui-icon '+val.icon+'">' +
					'</i><cite>' + val.name +
					'</cite><i class="iconfont nav_right">&#xe697;</i></a></li>';
					items.push(item);
					//拼接子菜单
					setTimeout(function() {
						menu.getSubMenu(val.id);
					}, 500);
				}
			});
			$('#side-nav').empty();
			_ul.append(items.join(''));
			$('#side-nav').append(_ul);
		},
		/**
		 * @param {Number} id 上级子菜单id,拼接menu获取元素
		 * 目前仅支持两级菜单，需要三级菜单需要进行改造
		 */
		getSubMenu: function(id) {
			var menuList = JSON.parse(localStorage.getItem("menuList"));
			var subItems = [];
			var subUl = $('<ul></ul>').addClass('sub-menu');
			$.each(menuList, function(index,menu) {
				if(menu.leafis=="1"){//叶子节点
					var subItem = '<li id="menu' + menu.id + '"><a _href="' + menu.url + '"><i class="iconfont">&#xe6a7;</i><cite>' +
					menu.name + '</cite></a></li>';
					subItems.push(subItem);
				}
			});
			subUl.append(subItems.join(''));
			$('#menu' + id).append(subUl);
		}
	};

	exports('menu', menu);
});
