(function(win){
	
	function BlogSite(username, password){
		this.username = username;
		this.password = password;
		this.hostname = 'sf20160321';      //owner username of the blog site in GitHub 
		this.reponame = 'sf20160321.github.io';    //repostory name of the blog site in GitHub
		this.pat = '45acc85e061caaab' + '6ce31d158a5627f7f274d2ad';  // person access token of the blog site in GitHub
	}
	
	//获取 GitHub Repostory Issues 数据
	BlogSite.prototype.listIssues = function(display, loading){
		loading && loading();
		var issues = new GitHub({token: this.pat}).getIssues(this.hostname, this.reponame);
		issues.listIssues({}, function(err, list){
			loading && loading(false);
			display(err, list);
		});
		
	};
	
	//获取 GitHub User Profile 数据
	BlogSite.prototype.getUserProfile = function(username, password, display, loading){
		username && (this.username = username);
		password && (this.password = password);
		
		loading && loading();
		var user = new GitHub({username: this.username, password: this.password}).getUser();
		user.getProfile(function(err, profile){
			loading && loading(false);
			display(err, profile);
		});
	};
	
	//获取 GitHub Issue 数据
	BlogSite.prototype.createUserIssue = function(title, content, display, loading){
		if(this.username && this.password){
			loading && loading();
			var issues = new GitHub({username: this.username, password: this.password}).getIssues(this.hostname, this.reponame);
			issues.createIssue({
					'title': title,
					'body': content
			},function(err, issue){
				loading && loading(false);
				display(err, issue);
			})
		}
	};
	
	
	//页面加载完毕后执行初始化
	$(win).load(function(){
		var blog = new BlogSite();
		loadIssues(blog);
		
		addCatelogDisplayListener();
		addContentSyncScrollListener();
		addUserSignListener(blog);
		addUserIssueListener(blog);
	});
	
	function loadIssues(blog){
		blog.listIssues(displayIssues, displayLoading.bind($('.content .comment ul')));
	}
	
	//显示博文讨论
	function displayIssues(err, list){
		var $issue = $('.content .comment ul').empty(),
			$issueCount = $('.content .issue-count');
		var postId = $('#postId').text();
		if(!err){				
			var html = [], floor = 0;
			for(var i = 0; i < list.length; i++){
				if(list[i].title === postId){  //过滤出本文章的评论
					html.push('<li><div class="author"><span class="avatar"><img src="'+list[i].user.avatar_url+'"></span>');
					html.push('<div class="info"><span class="name">'+list[i].user.login+'</span>');
					html.push('<div class="meta"><span>'+floor+'楼 · '+list[i].created_at+'</span></div></div></div>');
					html.push('<div class="text">'+list[i].body+'</div></li>');
					floor++;
				}
			}
			$issue.append(html.join(''));
			$issueCount.text(floor);
		}else{
			$issue.append(err);
			$issueCount.text(0);
		}
	}
	
	//显示数据加载中
	function displayLoading(visible){
		if(visible == undefined || visible){
			this.append('<div class="loading"><img src="/static/image/loading.gif"></div>');
		}else{
			this.find('.loading').remove();
		}
	}
	
	//显示登录
	function displaySign(visible){
		if(visible == undefined || visible){
			$('.sign').show();
		}else{
			$('.sign').hide();
		}
	}
	
	//显示操作信息提示
	function displayToolTip(tip, err){
		var $tooltip = $('.tooltip');
			
		$tooltip.find('span').text(tip);
		if(err == undefined){
			$tooltip.removeClass('err').removeClass('ok');
		}else if(err){
			$tooltip.removeClass('ok').addClass('err');
		}else{
			$tooltip.removeClass('err').addClass('ok');
		}
		$tooltip.show(300).delay(3000).hide(300);
	}
	
	//显示登录用户的信息
	function displayUserProfile(err, profile){
		var $new = $('.content .comment .new'),
			$avatar = $new.find('.avatar img'),
			$reply = $new.find('.reply-btn');
		
		if(!err){
			displayToolTip('用户登录成功', false);
			displaySign(false);
			$new.removeClass('disabled').addClass('active');
			$avatar.attr('src', profile.avatar_url);
		}else{
			displayToolTip('GitHub 用户验证失败', true);
		}
	}
	
	//监听目录的显示和隐藏
	function addCatelogDisplayListener(visible){
		var $aside = $('.content .aside'),
			$menu = $('.navbar .aside-menu');
		
		$('#markdown-toc').remove().appendTo($aside.find('.container'));
		
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
	
	//监听内容与目录的同步滚动
	function addContentSyncScrollListener(){
		var $content = $('.content'),
			$header = $content.find('.article .text').find('h2, h3, h4, h5, h6');
		
		var cTop = $content.offset().top;
		var tops = [0, ''];
		
		$header.each(function(index, item){
			var $item = $(item);
			if($item.prop('id')){  //有 id 的 header 才有目录
				tops.push(parseInt($item.offset().top - cTop)); //因为图片缩放、字体em单位、行高倍数等问题造成的小数值
				tops.push($item.prop('id'));
			}
		});
		
		$content.scroll(function(){
			var sTop = $content.scrollTop(), fid;
			for(var i = 0; i < tops.length/2; i++){
				if(i == tops.length/2 -1 && sTop >= tops[i*2] || sTop >= tops[i*2] && sTop < tops[i*2+2]){
					fid = tops[i*2+1];
					break;
				}
			}
			if(fid != undefined){
				$('.content .aside ul li a').removeClass('active');
				if(fid){
					$('#markdown-toc-'+fid).addClass('active');
					$('.navbar .focus-catelog').text($('#'+fid).text());
				}
			}
		});
	}
	
	//监听用户登录
	function addUserSignListener(blog){
		var $document = $(win.document);
		
		$document.on('click', '.sign .close', displaySign.bind(null, false));
		$document.on('click', '.content .comment .new.disabled', displaySign.bind(null, true));
		
		$document.on('click', '.sign .signin-btn', function(){
			var un = $('#username').val(),
				pwd = $('#password').val();
			if(!un || !pwd){
				displayToolTip('用户名或密码不能为空', true);
			}else{
				blog.getUserProfile(un, pwd, displayUserProfile, displayLoading.bind($('.sign .form')));
			}
		});
	}
	
	//监听用户讨论问题
	function addUserIssueListener(blog){
		var $document = $(win.document);
		
		$document.on('click', '.content .comment .new.active .reply-btn', function(){
			var $new = $('.content .comment .new'),
				$textarea = $new.find('.textarea');
			var content = $textarea.text(),
				postId = $('#postId').text();
			
			if(!content.trim()){
				displayToolTip('评论内容不能为空', true);
			}else{
				blog.createUserIssue(postId, content, function(err, issue){
					if(!err){  //发表意见成功
						displayToolTip('评论发布成功', false);
						$textarea.text('');
						loadIssues(blog);
					}else{
						displayToolTip('评论发布失败', true);
					}
				},  displayLoading.bind($new));
			}
			
		});
	}
	
}(window));




