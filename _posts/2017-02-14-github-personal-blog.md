---
layout: post
heading: 学会使用 GitHub 搭建个人博客
category: github
tag: github jekyll markdown
excerpt: 对于我而言，写博客就是为了将所学所想记录下来、分享出去。我希望自己能搭建一个独立的博客系统，物理空间、运行环境等都由他人维护，更多的时候我只是不断写文章。
excerpt-img: http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-14-github-personal-blog-2.png
---

* content
{:toc}

![bloger](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-14-github-personal-blog-0.jpg){:.implied}

## GitHub Pages

[GitHub Pages](https://help.github.com/articles/what-is-github-pages/) 是 GitHub 的静态站点托管服务。它使用 [Jekyll](http://jekyllrb.com/docs/home/)（静态站点生成器）直接将 GitHub 仓库中的内容解析生成静态网站，然后在 github.io 域名下访问。

如果将静态网页内容发布到 GitHub 项目仓库的(*/doc*)文件夹或(*gh-pages*)版本分支上，那么可以通过 (*https://username.github.io/reponame*) 网址来访问这些网页(reponame: GitHub仓库名)，可以更加丰富的展现项目的内容。

此外，如果将静态网页发布到名为 (*username.github.io*) 的仓库中，那么可以通过 (*https://username.github.io*) 直接访问。因此只需要开发一套基于 Jekyll 的博客系统发布到这个仓库中，就可以享受到个人博客站点带来的便利和自由。如果你还不知道这么创建仓库并发布项目，看看这个 [GitHub Pages: Websites for you and your projects](https://pages.github.com/), 或者我的另一篇博文[《学会使用 GitHub 托管项目》](./hosting-github-project.html)。

当你看到这篇文章的时候，其实你正在使用我的 [GitHub 个人博客系统](https://sf20160321.github.io/)。希望这篇文章能够帮助你快速搭建起自己的个人博客，祝你成功！

## 开发 Jekyll 博客系统

我们完全可以为每篇博文创建一个 HTML 静态网页文件，但这样做很难再专注于纯粹的写作。Jekyll可以帮助我们将网页结构布局与文章内容用不同的目录分离开，生成静态页面时自动将文章内容套用到指定的布局中。

> Jekyll 其实就是一个文本转换引擎。它可以解析 HTML 文件中的 Liquid 模板语言来获取网站的全局信息或博客文章中的数据。另外你完全可以使用 Markdown 或 Textile 标记来创作博文，Jekyll 负责将它们转换成 HTML。这是一种简单轻量的技术，除了 Jekyll 本身所要求的 Markdown 和 Liquid 之外，再使用一些 HTML+CSS+JS 就可以了。

1. 本地安装 Jekyll 程序

   在本地目录下开发一个 Jekyll 博客系统也是需要不断调试页面的，所以部署一套 Jekyll 程序相当重要。

   * Jekyll 是用 Ruby 开发的，首先需要在本地安装 Ruby。

     ~~~ bash
     sudo apt-get install ruby
     ~~~

   * Ruby的 Gem 管理需要用到 nodejs 环境，安装 nodejs 详见[官网](https://nodejs.org/en/)。

   * 使用 RubyGems 安装 Jekyll
		
     ~~~ bash
     gem install jekyll
     ~~~

     ~~~
     使用 RubyGems 安装可以获得最新版本的 Jekyll（写这篇文章时是 v3.4.0），而使用 apt-get 安装只能获得 v3.3.1版本。要知道 GitHub 上使用的是 Jekyll 目前是 v3.4.0，版本不同很可能造成本地调试的页面与发布到 GitHub 上后显示的不一样，建议本地 Jekyll 与 GitHub 上的版本一致。
     ~~~
     {: .warning}

   * 最后只需要在 Jekyll 项目目录下打开终端键入 jekyll server 命令，即可打开服务器并通过 http://127.0.0.1:4000 访问博客系统的静态网站。

     ![打开 Jekyll 服务器](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-14-github-personal-blog-1.png)

2. 设置 Jekyll 目录结构

   Jekyll 项目必须严格遵循一定的目录结构才可以被解析成静态网站，详细资料见[《Jekyll Structure》](http://jekyllrb.com/docs/structure/)。

3. 设置 Jekyll 站点配置文件

   _config.yml 是 Jekyll 项目重要的配置文件，详细资料见[《Jekyll Configuration》](http://jekyll.com.cn/docs/configuration/))。可以在 _config.yml 中设置 Jekyll 的配置项，也可以自定义网站的全局变量（比如 website, author 等）。这些数据可以在页面中通过 (*site.*) 获取。

4. 撰写 Jekyll 博文内容

   撰写博文的文件必须存放在 _posts 文件夹中，并且以 year-month-date-title.MARKUP 格式命名文件。其中扩展名 MARKUP 取决于博文使用的标记语言(Markdown: *.md*)。详细见[《Jekyll Writing Posts》](http://jekyllrb.com/docs/posts/)。

   每个博文内容的头部可以包含一个 YAML 格式的内容。YAML 头可以指明 layout 信息，确定该博文需要套用的网页模板(模板文件见下小节)，这样我们就可以只关注博文内容而非网页结构样式。另外其他重要数据项详见[《Jekyll Front Matter》](http://jekyllrb.com/docs/frontmatter/)。

   博文内容也需要一定的样式（比如字体大小、链接、代码块等），可以 Markdown 或 Textile 来简单标记文本格式。下面列举一篇 Markdown 格式的 Jekyll 博文内容(2017-01-08-github-to-project.md)。

   > Markdown:  是一种轻量级的网络文本标记语言。使用它可以很轻松的展现一篇有加粗字体、图片插入、列表的文档内容。其目的就是使用一种“易读易写”的方式创建近乎纯文本的结构，同时能有效的转化为 HTML 或 XHTML 标记。GitHub 对 Gists、Comments in Issues、pull request、project 'readme.md' 和其他 .md .markdown 文件中的 markdown 内容都进行 HTML 转化。

   ~~~ markdown
   ---
   layout: post
   title: 学会使用 GitHub 搭建个人博客
   category: github
   tag: github jekyll markdown
   ---

   ## GitHub Pages
   
   [GitHub Pages](https://help.github.com/articles/what-is-github-pages/) 是 GitHub 的静态站点托管服务........
   
   1. 本地安装 Jekyll 程序
   
      * Jekyll 是用 Ruby 开发的，首先需要在本地安装 Ruby。
   ~~~	

5. 设计网站的样式结构

   Jekyll 将网页的样式结构组成模板文件存放在 _layouts 文件夹中。所有含有 YAML 头 layout 信息的页面文件(比如上小节的博文例子)都将套入这些模板形成网页，其中 \{\{ content\}\} 标记被用来将页面的文本内容抓取到模板文件的指定位置上。Jekyll 使用的是 [Liquid](https://shopify.github.io/liquid/) 模板语言将数据和网页结构组合成网页。更多模板格式详见[《Jekyll Templates》](http://jekyllrb.com/docs/templates/)。

   如果 _layouts 中多个模板都包含相同的 HTML 结构，可以把它们提取形成单独的 HTML 文件存放在 _includes 文件夹中。比如 head 标签内容就可以单独存放在 head.html文件中，只需要在模板文件中通过 \{ % include head.html  % \} 引用进来即可，详细资料见[《Jekyll Includes》](http://jekyllrb.com/docs/includes/)。
   
   继续上小节的例子为博文内容设计一个显示博文的网页模板 post.html。其中使用模板语言变量 (*page*) 获取博文 YAML 头中的数据。
  
   ~~~ html
   <!DOCTYPE html>
   <html>
   { % include head.html  % }
   <body lang="zh-CN">
      <div class="article">
         <div class="meta">
	    <span class="time">{ { page.date | date: "%Y-%m-%d %H:%M" } }</span>
         </div>
         <div class="text">
         { { content } }
         </div>
       </div>
   </body>
   </html>
   ~~~

6. 设计网站主页

   根目录下的 index.html 一般作为 Jekyll 静态网站的默认主页。如果希望显示博文摘要列表，实现如下代码所示。其中模板语言变量 (*site*) 可以获取整个网站的全局信息(config.yml配置信息)和所有博文的全部信息(YAML 头信息)。

   ~~~ html
   ---
   layout: list
   ---
   <div class="container">
      { % for post in site.posts % }
      <div>
          <div class="time"><span>{ { post.date | date: "%Y-%m-%d %H:%M"  } }</span></div>
          <a class="title" href="{{ post.url }}">{ { post.title } }</a>
          <p class="abstract">{ { post.excerpt } }</p>
          <div class="meta">
          { % assign tags = post.tag | split: ' ' % }
          { % for tag in tags % }
          <a class="tag" target="_blank" href="">{{ tag }}</a>
          { % endfor % }
       </div>
       { % endfor % }
   </div>
   ~~~

小结：与PHP、JSP等动态网页技术的优点类似，Jekyll 使用 Liquid 模板语言基本做到了数据与样式的分离。而且使用 markdown+css 的方式确实比使用富文本编辑器来创作更加灵活。但是 Jekyll 解析完成后毕竟是静态页面，不可能响应用户请求获取不同的数据动态生成页面。因此很难完成某些功能，下面介绍实现这些功能的具体方案。

1. 显示不同分类的文章摘要列表

   Jekyll 一次性将全部的文章数据都解析成静态页面，通过 Liquid 模板语言可以很方便的做到这一点。但如果要响应用户选择分类以获取该类别下的博文，目前只能有两大解决方案：

   * 方案一: 在网页上生成全部文章摘要列表，然后通过 Javascript 程序根据分类名称来隐藏或显示部分 DOM 结构。但是如果文章数量巨大，网页的生成效率将不可避免的降低。变通的做法是 Jekyll 预先在某个文件（xxx.json）中生成全部文章摘要数据的 json 结构，因为任何具有 YAML 头的文件 Jekyll 服务器都会使用Liquid 模板语言解析成静态内容。下面是这个 json 内容的文件：

     ~~~ markdown
     ---
     layout: null
     ---
     [
        {\% for post in site.posts \%}
        {
           "date" : "{{ post.date | date: '%Y-%m-%d' }}",
           "heading" : "{{ post.heading }}",
           "category": "{{ post.category}}",
           "tags" : "{\% for tag in post.tags \%}{\% if forloop.rindex != 1 \%}{{ tag }}_{\% else \%}{{ tag }}{\% endif \%}{\% endfor \%}",
           "url" : "{{ post.url }}"
         }
         {\% if forloop.rindex != 1  \%}
         ,
         {\% endif \%}
         {\% endfor \%}
     ]
     ~~~

     打开 jekyll server 之后完全可以在浏览器中访问这个文件(http://localhost:4000/xxx.json)，会显示一串 Json 格式的字符串。我们完全可以通过 ajax 获取这个字符串并转化成 json 对象，这样就在浏览器端通过远程访问获取到了所有文章摘要数据。接下来就可以通过过滤分类名称来获取指定类别的文章摘要列表并显示在网页的 DOM 结构中。

     ~~~ javascript
     $.getJSON("/xxx.json").done(function(data) {
       display(filter(data));
     });
     ~~~

     这样把所有数据都存放在浏览器的 javascript 对象中，通过计算获取部分数据渲染到网页 DOM 中。但一次性获取巨大的数据量仍然会导致性能问题。

   * 方案二: 最佳的做法还是希望 Jekyll 能够预先根据不同的类别生成不同的数据页面，而浏览器端只需要访问这些不同页面即可。这必须使用到 [Jekyll 插件](http://jekyllrb.com/docs/plugins/)，这里推荐一个插件 [Category archive plugin for Jekyll](https://github.com/shigeya/jekyll-category-archive-plugin))。然而事情远不只这么简单，GitHub Page 因为安全原因禁止了 Jekyll 使用第三方插件。这样只能在本地预先使用 Jekyll 生成静态站点，然后将所有静态站点的网页直接发布到 GitHub 的仓库中，而不是发布 Jekyll 系统的源文件。

   实际上 Jekyll 只适合开发项目介绍、个人博客这样数据量小的网页，完全不用为现代浏览器的性能和 GitHub 的流量担心。利用方案一写个上千篇博文是不会出现严重性能问题的。

2. 站内检索 

   * 方案一: 与上小节方案一类似。
   
   * 方案二: 使用插件 [jekyll-lunr-js-search](https://github.com/slashdotdash/jekyll-lunr-js-search)。

## 用 Markdown 写博文

现在有越来越多的网民愿意使用 [Markdown](http://daringfireball.net/projects/markdown) 撰写文章，通过 Markdown 解释器可以很容易转换成 HTML 内容。Jekyll v3.0+ 版本默认使用 [Kramdown](https://kramdown.gettalong.org/) 作为 markdown 解释器。[Kramdown 解释语法](https://kramdown.gettalong.org/syntax.html) 基本兼容 [Markdown 标准语法](http://daringfireball.net/projects/markdown/syntax) 的同时实现了更多的特征。在写这篇文章的时候，GitHub 最新使用 Jekyll v3.4.0 版本，它的 Kramdown 合并有自己特色的语法特征(GitHub Flavored Markdown, GFM)。想要了解更多可见[《Basic writing and formatting syntax》](https://help.github.com/articles/basic-writing-and-formatting-syntax/) 和 [《Mastering Markdown》](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown)。 下面介绍几个重要的语法特征：

### 标记程序语言的代码块

标准语法中代码块以4个空格和1个制表符的缩进格式开始，没有语言的区别，而且不能分离两个相邻的代码块。
  
Kramdown语法增加 ~~~ 标记，包裹代码内容生成 HTML 代码片段。该标记可以使用 [IAL](https://kramdown.gettalong.org/syntax.html#inline-attribute-lists) 注明代码块的程序语言，即在 \{: \} 标记中包含CSS样式名，这样可以方便实现代码高亮显示。

~~~~~~ markdown
~~~
<html>
<body></body>
</html>
~~~
{: .language-html}
~~~~~~

转化成 HTML:

~~~ html
<div class="language-html highlighter-rouge">
<pre class="highlight"><code>
   <span class="nt">&lt;html&gt;</span>
   <span class="nt">&lt;body&gt;&lt;/body&gt;</span>
   <span class="nt">&lt;/html&gt;</span>
</code></pre>
</div>
~~~

还有一种更为简单的方式标记程序语言。
  
~~~~~~ markdown
~~~ html
<html>
<body></body>
</html>
~~~
~~~~~~

值得一提的是，Jekyll 本身可以使用 Liquid 模板语言 \{ % highlight ruby % \} 实现代码块的程序语言区分，转化成的 HTML 结构最外层包裹的是 figure (而Kramdown 代码块是 div)，详见[《Highlighting code snippets》](http://jekyllrb.com/docs/posts/#highlighting-code-snippets)。 但是这种方式有个明显的缺陷，写在博客正文内容中的 Liquid 语言与 markdown 语法是不能兼容的。比如 \{ % highlight ruby % \} 标记前缩进2个空格也不能成为列表项 li 中的元素。所以强烈建议使用 Kramdown 的代码块语法。

代码块标记程序语言的目的是实现不同代码的高亮显示。Jekyll v3.0+ 的高亮默认使用 rouge 语法，通过下面的命令可以获得 Rouge 的高亮显示样式表 rouge.css。加载到网页中就可以实现不同语言代码块的高亮显示。

~~~ bash
rougify style monokai.sublime > rouge.css
~~~

### 嵌套列表

标准语法在列表项中显示多个段落、代码块、引用或者嵌套列表，都必须比父列表结构多缩进4个空格或1个制表符。
  
Kramdown语法只要求缩进至少2个空格以上(含2空格)即可，这样的设计更方便阅读。

~~~~~~ markdown
1. one space one space

   three space three space

   * four space four space

     ~~~
     five space five space
     ~~~
~~~~~~

转化成 HTML:

~~~ html
<ol>
   <li>
      <p>one space one space</p>
      <p>three space three space</p>
      <ul>
         <li>
            <p>four space four space</p>
            <div class="highlighter-rouge">
               <pre class="highlight"><code>five space five space</code></pre>
            </div>
         </li>
       </ul>
    </li>
</ol>
~~~

### 自动生成目录

标准语法无法自动生成目录。
  
kramdown 语法支持对文章内容中所有标题(h1,h2....标记)自动生成目录，并且会为每个生成目录的标题赋予唯一的ID。只需要在文章空白处中添加 * content 和 IAL 格式的标志 \{\{:toc\}\} 即可，详细见[《Automatic “Table of Contents” Generation》](https://kramdown.gettalong.org/converter/html.html#toc)。

~~~ markdown
* content
{:toc}

# Capter1
  
## 1.1 title

# Capter2

## 2.1 title
~~~

转化成 HTML:

~~~ html
<ul id="markdown-toc">
   <li>
      <a href="#capter1" id="markdown-toc-capter1">Capter1</a>
      <ul>
         <li><a href="#11-title" id="markdown-toc-11-title">1.1 title</a></li>
      </ul>
   </li>
   <li>
      <a href="#capter2" id="markdown-toc-capter2">Capter2</a>
      <ul>
         <li><a href="#21-title" id="markdown-toc-21-title">2.1 title</a></li>
      </ul>
   </li>
</ul>
<h1 id="capter1">Capter1</h1>
<h2 id="11-title">1.1 title</h2>
<h1 id="capter2">Capter2</h1>
<h2 id="21-title">2.1 title</h2>
~~~

上述代码可见自动生成的目录列表均默认赋予 markdown-toc-前缀的 id，也可以通过 \{:toc \#user-defined\} 自定义 id 值。设置哪几级标题为目录结构可以在 _config.yml 文件中通过 toc_levels 来设置，默认情况下为 h1 到 h6。

## 开发博客评论

Jekyll 静态站点对实现评论功能无能为力，借助第三方的社交评论系统似乎是唯一的选择（流行的有 Disqus，Facebook Comment，友言、多说、搜狐畅言等）。既然在 GitHub 上搭建的个人博客系统，如果能使用 GitHub 仓库(reponame: username.github.io)的 [Issues](https://help.github.com/articles/about-issues/) 功能存放评论内容也是一种不错的方案。其中将博文的唯一性标识作为 issue.title，评论内容作为 issue.body。

> GitHub Issues 是为 GitHub 托管项目的任务、改进和 Bug 提供跟踪服务的功能。每个代码仓库中都有自己的 Issues ，发布 Issues 需要标题和正文两部分内容。项目拥有者可以关闭掉已经得到解决的 Issues。 

GitHub 提供了一套完整的 API 用于第三方系统获取用户数据，通过 HTTPS 协议从 https://api.github.com 网址中就能访问，所有请求和接受的数据都是 JSON 格式。具体文档见 [GitHub API](https://developer.github.com/v3/) 。

~~~ javascript
//通过 Users API 访问 GitHub 用户的公开信息
$.ajax({
	url: 'https://api.github.com/users/sf20160321',   //Users API URL
	type: 'get',
	success: function(data, status){
		console.log(data);
	}
});
~~~

![User API Datas](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-14-github-personal-blog-2.png)

下图是获取 GitHub 用户的公开信息。如果想要获取用户的隐私信息，比如私有仓库数量(total_private_repos)，必须通过 GitHub 的用户授权后再能够访问。大部分 GitHub API 都需要经过授权才可以访问，GitHub 有三种授权方式，具体参见[GitHub API OAuth](https://developer.github.com/v3/oauth/)。

### Username & Password Authentication

这是 GitHub 最简单的授权方式之一。通过在 HTTPS 请求报文头中包含用户名和密码的信息来取得 GitHub 的授权，从而得到指定 API 的返回数据，具体见([Basic Authentication](https://developer.github.com/v3/auth/#basic-authentication)。这种方式需要将用户名和密码硬编码到 JS 文件中，造成严重的安全隐患。因此，在第三方应用程序中并不会直接使用 Basic Authentication。

~~~ javascript
$.ajax({
	headers: { //发送包含授权信息的请求报文头
		'Authorization': 'Basic '+Base64.encode('sf20160321:my_password') //账号密码授权信息
	},
	url: 'https://api.github.com/user', //Users API: https://developer.github.com/v3/users/#get-the-authenticated-user
	type: 'get',
	success: function(data, status){
		console.log(data);
	}
});
~~~

~~~
请求报文头中的授权信息需要经过 base64 编码。否则 GitHub 会认为此次访问没有授权，返回 Get https://api.github.com/user 401(Unauthorized) 的异常响应。
~~~
{: .warning}

### Personal Access Tokens Authentication

GitHub 支持 OAuth2 协议。第三方程序获得 GitHub 认证服务器上的用户授权后得到访问令牌(access token)。在令牌允许的权限范围内，即可通过 GitHub API 访问 GitHub 服务器上的数据。

> OAuth 协议：允许用户提供一个令牌，而不是用户名和密码来访问他们存放在特定服务提供者的数据。每一个令牌可以指定网站的能够访问的特定数据和有效期限，而不需要在访问许可下分享网站的全部内容。介绍[《理解OAuth 2.0》](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)这篇文章理解 OAuth2.0 的原理和授权过程。

由此可见，获取访问令牌是使用 GitHub API 的关键。 GitHub 提供在界面上编辑 [personal access tokens](https://github.com/settings/tokens）的方式快速创建用户授权访问的令牌，第三方应用程序在 HTTPS 请求报文头中包含这个令牌信息就可以访问用户的 GitHub 数据了。实际上 personal access tokens 与 OAuth 严格授权流程下获得的 access token 是一样的，在程序中暴露  token 数据比暴露密码信息降低了安全风险。

![personal access token](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-14-github-personal-blog-3.png)

~~~ javascript
$.ajax({
	headers: {
		'Authorization': 'token 67fa30bccad35f0933b91d'+'5b3b3940f8958ed3e6' //personal access token 授权信息
	},
	url: 'https://api.github.com/user',
	type: 'get',
	success: function(data, status){
		console.log(data);
	}
});
~~~

~~~
上面程序有一个奇特的现象：token 值使用两个字符串拼接而成。这是因为如果 token 字符串完整的出现在程序中，项目发布到 GitHub 后这个被用户创建的 token 会被 GitHub 删除，那么 GitHub 个人博客项目仍然无法得到授权。我猜测 GitHub 并不赞成在程序中直接使用 token 信息来获取访问权限，毕竟拿到 token 在一定程度上相当于拿到了用户密码。
~~~
{: .question}

### OAuth Tokens Authentication

通过 OAuth2.0 协议 规定的严格流程获取数据访问权限才是最安全的方式，这也是目前主流的第三方程序用户认证方式。GitHub 拥有一套完整严格的[第三方应用程序授权流](https://developer.github.com/v3/oauth/#web-application-flow) 来获取用户授权的 access token。具体的步骤如下：

1. 用户登录 GitHub，[注册](https://github.com/settings/applications/new) 第三方应用程序，配置好回调地址(在后面会使用)。成功后会得到 Client ID 和 Client Secret。

   ![OAuth applications](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-14-github-personal-blog-4.png)

2. 第三方应用程序根据注册的 Client ID 重定向请求 GitHub 认证服务器，由 GitHub 用户选择是否给予第三方应用程序授权。

   ~~~ javascript
   //参数 scopes 指明第三方程序访问 GitHub 的功能范围，与 personal access token 设置的 scopes 作用一样。
   //参数 state 是一个随机值。
   // https://github.com/login/oauth/authorize 为请求用户 GitHub 授权的 API 地址
   window.location.replace('https://github.com/login/oauth/authorize?client_id=f911e6ec2**********&scope=user%20public_repo&state=2312321');
   ~~~

3. 如果用户同意授权，GitHub 认证服务器会重定向回第三方应用程序(注册时配置的回调地址 category.html)，同时将生成的授权码（临时 code）和 state 作为回调参数。第三方程序获得回调地址页面后，并通过参数 code 以及注册得到的 Client ID 和 Client Secret 再次发起 Post 请求 GitHub 授权访问令牌(access token)。

   ~~~ javascript
   //get request url:  https://sf20160321.github.io/category.html?code=384723******&state=2312321
   function getRequest() {
      var url = location.search; //获取 GitHub 回调页面 url 的参数值
      var req = new Object();
      if (url.indexOf("?") != -1) {
         var str = url.substr(1);
         strs = str.split("&");
         for(var i = 0; i < strs.length; i ++) {
	       req[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
         }
      }
      return req;
   } 
   var request = getRequest();
  
   // 实际上下面的代码是有问题的，写出来指示为了说明通过 Post 请求获取 access_token 的方式。	
   $.ajax({
      url: 'https://github.com/login/oauth/access_token',
      type: 'post',
      data: {
         'client_id': 'f911e6ec2*******',
         'client_secret': 'fa57208f86fa4***************',
         'code': request.code,
         'state': '56474'
      },
      success: function(data, status){
         var token = data.access_token;  //获取 access_token
         // 使用 token 访问 User API
      }
   });
   ~~~
   
   ~~~
   上面代码中通过 Ajax 发起 Post 请求获取 access_token 是不能实现的，因为浏览器的同源策略(same-origin policy)。浏览器会报出：XMLHttpRequest cannot load https://github.com/login/oauth/access_token. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://sf20160321.github.io' is therefore not allowed access.
   ~~~
   {: .warning}

   GitHub API 支持跨域访问([Cross Origin Resource Sharing, CORS](https://developer.github.com/v3/#cross-origin-resource-sharing))，但获取 Access Token 的 API （https://github.com/login/oauth/access_token） 不支持。而且这个 API 必须要求通过 Post 请求方式获取数据，所以也无法使用 JSONP 方式规避 AJAX 的跨域访问问题。那么解决问题的唯一办法就是在服务器端发送 https 请求 GitHub 服务器的 Token API 数据(比如 nodejs 的 https.request)，而不能通过浏览器端的 Javascript 发送请求。想要了解更多请参见[《浏览器同源政策及其规避方法》](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)。

   ~~~
   对于 GitHub 个人博客项目，这是一个相当棘手的问题。因为浏览器端访问的是 GitHub 通过 Jekyll 建立的静态网站，这个项目的服务器端没有 node、tomcat。也就不可能在服务器端发送请求。目前我的个人博客评论系统使用的还是 personal access token 获取自己仓库的数据，如果用户发表评论需要输入用户名密码，通过GitHub 验证后获得代码仓库访问权限。不过我郑重承诺，不会以任何形式记录用户的密码信息(包括 cookie)。
   ~~~
   {: .question}
   
   另外，我介绍一套提供获取 GitHub API 数据实现方式的 JS 代码：[Github.js](https://github.com/github-tools/github) ，使用文档可参见[《Github.js API》](http://github-tools.github.io/github/docs/3.0.0/GitHub.html)。
   
4. 如果获得 access_token 成功， 就可以通过这个 token 就可以访问 GitHub API 获取信息了。

## 参考

1. [GitHub Help](https://help.github.com/)

2. [Jekyll Simple, blog-aware, static sites](http://jekyllrb.com/)

3. [Markdown Syntax](http://daringfireball.net/projects/markdown/syntax)

4. [Kramdown Syntax](https://kramdown.gettalong.org/syntax.html)

5. [Liquid Document](https://shopify.github.io/liquid/)

6. [GitHub API](https://developer.github.com/v3/)
