(function(win){
	
	//页面加载完毕后执行初始化
	$(win).load(function(){
		loadCategoryPostIndexs('all');  //初始化页面获取全部文章列表
		
		addCategoryDisplayListener();
		addPostIndexLoadListener();
	});
	
	//监听文章分类的显示与隐藏
	function addCategoryDisplayListener(visible){
		var $aside = $('.content .aside'),
			$menu = $('.navbar .aside-menu');
		
		$menu.on('click', function(){  
			if($menu.hasClass('active')){
				$menu.removeClass('active');
				$aside.hide();
			}else{
				$menu.addClass('active');
				$aside.show();
			}
		});
		
		$aside.on('click', function(ev){
			if(ev.target.className == 'aside'){ //点击侧边栏外部的空白位置
				$menu.removeClass('active');
				$aside.hide();
			}
		});
	}
	
	function addPostIndexLoadListener(){
		var $cates = $('.content .aside .list li');
		$cates.on('click', 'a', function(){
			var $item = $(this);
			loadCategoryPostIndexs($(this).find('.name').text());
			$cates.find('a').removeClass('active');
			$item.addClass('active');
		});
	}

	
	function loadCategoryPostIndexs(cate){
		if(cate.toLowerCase() == 'all')
			loadPostIndexs(displayCategoryPostIndex);
		else
			loadPostIndexs(displayCategoryPostIndex, filterPostIndexByCategory.bind(null, cate));
	}

	
	function loadPostIndexs(display, filter){
		$.getJSON("/post-index.json").done(function(_display, _filter, data) {
			_filter ? _display(_filter(data)) : _display(data);
        	}.bind(null, display, filter)).error(function(data, b) {
			console.log("parse post-index json error !"); 
		});
	}

	function filterPostIndexByCategory(cate, data){
		var result = [];
		for(var i = 0; i < data.length; i++){
			var note = data[i];
			if(note.category.toLowerCase() == cate.toLowerCase()){
				result.push(note);
			}
		}
		return result;
	}
	
	function displayCategoryPostIndex(data){
		var html = [];
		for(var i = 0 ; i < data.length; i++){
			var note = data[i];
			if(note.excerptImg){
				html.push('<li class="have-img"><a class="wrap-img" target="_blank"><img src="'+note.excerptImg+'"></a>');
			}else{
				html.push('<li>');
			}
			html.push('<div>');
			html.push('<div class="date"><span>'+note.date+'</span></div>');
			html.push('<a class="head" href="'+note.url+'" target="_blank">'+note.heading+'</a>');
			html.push('<p class="abstract">'+note.excerpt+'</p>');
			html.push('<div class="meta">');
			for(var j = 0, tags = note.tags.split(' '); j < tags.length; j++){
				var tag = tags[j];
				html.push('<a class="tag">'+tag+'</a>');
			}	
			html.push('</div>');	
			html.push('</div></li>');
		}
		$('.content .article-list').empty().append(html.join(''));
	}

}(window));




