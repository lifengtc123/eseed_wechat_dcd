/**

 * @author fengc
 */
var MainMenu = function(){
	var iPath;	
	var oCurrMenuItems = [];
	
	var _getPreloadImageId = function(level, action, type){
		return 'menuitem' + level + '_' + action + '_' + type;
	};
	/**
	 * 预加载图像
	 * @param {Object} level 菜单级别
	 * @param {Object} action 鼠标动作
	 * @param {Object} type 图片类型
	 */
	var _preloadImage = function(level, action, type){		
		var sPath = iPath + 'menuitem' + level + '_' + action + '_bk_' + type + '.gif';
		var sId = _getPreloadImageId(level, action, type);
        if(!document.images[sId]) {
            var oImage = document.createElement("img");
            oImage.src = sPath;
            oImage.name = sId;
            oImage.id = sId;
            oImage.style.display = "none";
            document.body.appendChild(oImage);
        }
	};
	
	/**
	 * 去除字符串两边空格,以及中间的空格
	 */
	var _trimSpace = function(str){		
	    if(str && str.length > 0){
			var _result = str.replace(/ +/,'');
			_result = _result.replace(/ +$/,'');			
			_result = _result.replace('&nbsp;','');		
			try{return _result;} finally{_result = null;};
		}		
		return '';		
	};
	
	/**
	 * 查找菜单项对象
	 */
	var _findMenuItem = function(itemName, menuLevel){
		var tds = document.getElementsByTagName("td");
		for(var i=0;i<tds.length;i++){
			var mLevel = tds[i].getAttribute("menulevel");							
			if(mLevel && parseInt(mLevel)==menuLevel){					
				var mText = _trimSpace(tds[i].innerText);					
				if(mText && mText==itemName){
					return tds[i];
				}
			}
		}
		return null;
	};
	
	return {
		/**
		 * 初始化主菜单
		 * @param {Object} imgPath
		 */	
		init: function(imgPath){
			iPath = imgPath;
			_preloadImage('0','default','right');
			_preloadImage('0','default','left');
			_preloadImage('0','hover','right');
			_preloadImage('0','hover','left');
			_preloadImage('0','selected','right');
			_preloadImage('0','selected','left');
			
			_preloadImage('1','default','left');
			_preloadImage('1','hover','right');
			_preloadImage('1','hover','left');
			_preloadImage('1','selected','right');
			_preloadImage('1','selected','left');
			
			//_preloadImage('2','default','left');
			//_preloadImage('2','hover','right');
			//_preloadImage('2','hover','left');
			//_preloadImage('2','selected','right');
			//_preloadImage('2','selected','left');			
		},
		/**
		 * 从图像数组中获取图像路径
		 * @param {Object} level 菜单级别
		 * @param {Object} action 鼠标动作
		 * @param {Object} type 图片类型
		 */
		getCacheImage: function(level, action, type){
			return document.images[_getPreloadImageId(level, action, type)].src;
		},
		/**
		 * 记录当前Item
		 * @param {MenuItem} oItem
		 */
		setCurrentItem: function(oItem){
			oCurrMenuItems[oItem.getLevel()] = oItem;
		},
		/**
		 * 鼠标经过菜单项时
		 * @param {Object} obj 菜单项（容器）
		 */	
		onMouseOver: function(obj){
			var oItem = new MenuItem(obj);
			oItem.changeStyle('hover');
		},
		/**
		 * 鼠标移出菜单项时
		 * @param {Object} obj 菜单项（容器）
		 */
		onMouseOut: function(obj){
			var oItem = new MenuItem(obj);
			oItem.changeStyle('default');
		},
		/**
		 * 鼠标点击菜单项时
		 * @param {Object} obj 菜单项（对象）
		 */
		onClick: function(obj){
			if(!obj) return;
			var oItem = new MenuItem(obj);
			if(oItem.isSelected()) return;//已经选中，则不响应
			var oItemOld = oCurrMenuItems[oItem.getLevel()];
			if(oItemOld){
				oItemOld.changeStyle('default', true);
				oItemOld.hiddenSonGroup();
			}
			this.setCurrentItem(oItem);
			oItem.changeStyle('selected');
			oItem.showSonGroup();
		},
		/**
		 * 点击菜单项
		 * @param {String} id 菜单项（名称）
		 */
		onClickById: function(id){
			this.onClick(document.getElementById(id));
		},
		/**
		 * 点击（指定）菜单项
		 * @param {String} itemName 菜单项名称
		 * @param {int} menuLevel 菜单项级别（0-2）
		 */
		clickMenuItem: function(itemName, menuLevel){
			var obj = _findMenuItem(itemName, menuLevel);			
			if(obj) {
				obj.click();
				return true;
			}
			return false;		
		},
		/**
		 * 点击（指定）一级菜单项。如该菜单名未找到，则自动显示第一个菜单项。
		 * @param {String} itemName 一级菜单项名称
		 */
		clickMainItemByDefault: function(itemName){
			if(!this.clickMenuItem(itemName, 0)) {
				this.onClickById('menu0');
			};	
		}
	}	
}();

var MenuItem = function(obj){
	var id = obj.id;
	var el = obj;
	var son;
	if(el.getAttribute('songroupid') && el.getAttribute('songroupid').length>0){
		son = document.getElementById(el.getAttribute('songroupid'));
	}
	/**
	 * 返回菜单项（容器）的Id
	 */
	this.getId = function(){
		return id;
	}
	/**
	 * 返回菜单项的级别：0-2
	 */
	this.getLevel = function(){
		var level = this.getEl().getAttribute('menulevel');
		return parseInt(level);
	}
	/**
	 * 返回菜单项（容器）的DOM对象
	 */
	this.getEl = function(){
		return el;
	}	
	/**
	 * 隐藏子菜单集合
	 */
	this.hiddenSonGroup = function(){
		if(son) {
			son.style.display='none';
			var defItemId = son.getAttribute('defaultmenuid');
			if(defItemId && defItemId.length>0){
				var defItem = new MenuItem(document.getElementById(defItemId));
				defItem.hiddenSonGroup();
				defItem.changeStyle('default', true);
			}
		}
	}
	/**
	 * 显示子菜单集合
	 */
	this.showSonGroup = function(){		
		if(son) {
			son.style.display='';
			var defItemId = son.getAttribute('defaultmenuid');
			if(defItemId && defItemId.length>0){
				$("#"+defItemId).click();			
			}
		}
	}
	/**
	 * 判断样式
	 * @param {Object} style
	 */
	this.isStyle = function(style){
		var bkstyle = this.getEl().getAttribute('background');
		return (bkstyle && bkstyle.indexOf('_'+style+'_')>0)?true:false;
	}
	/**
	 * 菜单项是否被选中
	 */
	this.isSelected = function(){
		return this.isStyle('selected');		
	}
	/**
	 * 菜单项（容器）改变样式
	 * @param {String} action
	 * @param {Boolean} isChanged 如为true，则强制改变样式
	 */
	this.changeStyle = function(action, isChanged){	
	    if(!isChanged && this.isSelected()) return;
		
		this.getEl().className = 'menuitem'+this.getLevel()+'_'+action;
	    if('default'==action && this.getLevel() > 0){
			this.getEl().setAttribute('background', '');
		}else{
			this.getEl().setAttribute('background', MainMenu.getCacheImage(this.getLevel(), action, 'right'));
		}
		$(this.getEl()).find("img").first().attr("src",MainMenu.getCacheImage(this.getLevel(), action, 'left'));
	}
};