---
layout: post
heading: 学会使用 GitHub 托管项目
category: github
tag: github git
excerpt: GitHub 是一家位于旧金山的公司。主要提供基于 Git 的版本托管服务，故此得名 GitHub。截止到2014年，GitHub 迅速成长为一个拥有143万开发者，托管400多万git项目的社区。
excerpt-img: http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-02-github-hosting-project-1.png
---

* content
{:toc}

![The Croods](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-02-github-hosting-project-0.jpg){:.implied}

## 准备工作

> GitHub 是一家位于旧金山的公司，由[Chris Wanstrath](https://github.com/defunkt), [PJ Hyett](https://github.com/pjhyett) 与 [Tom Preston-Werner](https://github.com/mojombo) 三位开发者在2008年4月创办。主要提供基于 Git 的版本托管服务。截止到2014年，GitHub 迅速成长为一个拥有143万开发者，托管400多万git项目的社区。

为了避免 windows 下环境搭建所带来的各种问题，我的所有工作都是在 ubuntu 16.04 LTS 平台下完成的。

在开始之前，你需要在 [GitHub](https://github.com/) 上注册一个账号。其中 username 会成为你个人博客的二级域名：username.github.io，所以起个好听点的名字，比如我叫(*sf20160321*)。

## 安装 Git

GitHub 的业务核心 [Git](https://github.com/git/git) 是一个分布式的版本控制系统。因此想要将本地项目托管到 GitHub 上，必须在安装 Git 软件。

~~~ bash
sudo apt-get install git
~~~

安装完毕后，可以通过 git 命令查看这个软件丰富的指令集。在下面具体的场景中会介绍其中重要的指令。

![git 指令](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-02-github-hosting-project-1.png)

## 使用 SSH 访问 GitHub

当然可以使用 https 协议访问 GitHub，实际上还可以通过 SSH协议与 GitHub 服务器通信。这种方式的好处是你的本地项目与服务器项目同步时不需要输入登陆账号密码。

>SSH 为 Secure Shell(安全外壳协议) 的缩写，由 IETF 的网络小组（Network Working Group）所制定。SSH 为建立在应用层基础上的安全协议，专为远程登录会话和其他网络服务提供安全性的协议。利用 SSH 协议可以有效防止远程管理过程中的信息泄露问题。

设置SSH Key的方法，详细内容可见[《Connecting to GitHub with SSH》](https://help.github.com/articles/connecting-to-github-with-ssh/)

1. 需要检查操作系统是否已经有 SSH key。键入下面两个命令查看是否存在 id_rsa.pub(公钥) 和 id_dsa(私钥)文件。

   ~~~ bash
   cd ~/.ssh
   ls
   ~~~

   如果文件已经存在，则备份这两个文件后删除。

   ~~~ bash
   mkdir key_backup
   cp id_rsa* key_backup
   rm id_rsa*
   ~~~

2. 在 ~/.ssh 目录下创建新的 SSH key，后面是我的 github 注册邮箱。操作成功后会在 ssh 目录下创建id_rsa（私钥）和id_rsa.pub（公钥）这两个文件。

   ~~~ bash
   ssh-keygen -t rsa -C "sf20160321@163.com"
   ~~~

3. 打开id_rsa.pub文件，将文件内容复制到 GitHub 中(依次点击Settings -> SSH and GPG Keys -> Add SSH Key)

   ![github ssh key setting](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-02-github-hosting-project-2.png)

4. 再次检查与 Github 的SSH连接情况。操作成功会看到如下的提示：Hi sf20160321! You've successfully authenticated, but GitHub does not provide shell access.

   ~~~ bash
   ssh -T git@github.com
   ~~~

## 本地项目托管 

1. GitHub repository 是托管项目的代码版本仓库，每个仓库可以代表一个项目。托管一个新的项目(比如 HelloWorld)首先需要在 GitHub 上创建容纳项目的[代码仓库](https://help.github.com/articles/create-a-repo/)。

   ![new repository](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-02-github-hosting-project-3.png)

2. 为了本地项目与GitHub代码仓库内容同步，可以先将刚刚创建的仓库拷贝到本地操作系统中。成功后当前路径下出现 HelloWorld 目录和一些仓库初始化文件(比如 README.md, LICENSE)。

   ~~~ bash
   git clone https://github.com/sf20160321/HelloWorld.git
   ~~~

3. 在本地 HelloWorld 目录下建立与远程 HelloWorld 仓库的关联

   ~~~ bash
   git remote add origin https://github.com/sf20160321/HelloWorld.git
   ~~~

   如果原来就建立过其他目录与 GitHub 仓库的联系，那么再次执行上面的命令会报错：fatal: remote origin already exists. 此时需要先删除旧的联系。

   ~~~ bash
   git remote rm origin
   git remote add origin https://github.com/sf20160321/HelloWorld.git
   ~~~

4. 每次在本地 HelloWorld 目录更新文件后(增删改)，都需要先将更新提交到 git 的缓存空间中。其中commit命令中的字符串可以作为此次更新的描述信息显示在GitHub仓库代码列表中。

   ~~~ bash
   git add .
   git commit -m 'update main program'
   ~~~

   注意，如果此时出现下面的错误提示
   ** Please tell me who you are.
Run
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'root@songle-ThinkPad-X22.(none)')

   则需要在 HelloWorld 工程下 .git 目录中的 config 文件，并在最后边加上一句话
［user］
 email＝bugnoo
 name＝bugnoo@163.com

   
   然后使用 push 命令将更新内容推送到 GitHub 服务器上(之前origin指定联系的仓库)。其中 master 指 Github 中的仓库主分支名。
		
   ~~~ bash
   git push origin master
   ~~~

   > 版本分支: 每个 GitHub 代码仓库默认仅有一个主分支 master。所有提供给用户使用的正式版本，都在这个主分支上发布。

5. 使用 HTTPS 建立的 origin，每次执行push命令都需要输入 GitHub 帐号和密码。如果按照上节的要求设置了 SSH Key，那么就可以考虑使用 SSH 方式重新建立与远程服务器的联系。

   ~~~ bash
   git remote rm origin
   git remote add origin git@github.com:sf20160321/HelloWorld.git
   ~~~

   现在我们可以通过 https://github.com/sf20160321/HelloWorld 来访问发布项目的内容了。

6. 如果需要从远程获取最新版本到本地，可以使用如下命令：

   ~~~ bash
   git fetch origin master:tmp  //从远程 master 主分支下载最新的版本到本地 master 分支上
   git diff tmp  //比较本地两分支的差别
   git merge tmp  //最后进行合并
   ~~~

   也可以直接使用 pull 命令完成全部过程。但是上面的过程可以查看更新情况后再决定是否合并，版本控制更加安全。

   ~~~ bash
   git pull origin master
   ~~~

![HelloWord 代码仓库](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-02-github-hosting-project-4.png)

## 展现精彩项目介绍

对于一个期待分享的项目，给别人的第一印象不能只是代码仓库的文件列表和 README 文件(虽然 Github 仓库中的 README 支持简单的网页标记)。我们总是希望通过更丰富的网页内容(web content)来了解它。GitHub 为此设计了 Pages 功能，允许我们在代码仓库上发布静态网页。

1. 设计一些网页发布到代码仓库 master 分支的 docs 文件夹中，或者发布到代码仓库 gh-pages 分支中。

2. 打开仓库设置(*Settings*)中的 GitHub Pages Source 下拉菜单选择 master branch/docs folder 或 gh-pages branch（取决于网页发布到那个分支上）。点击(*Save*)即可生效，成功后就可以在 https://sf20160321.github.io/HelloWorld/下访问这个项目的网页内容了。

   ![Project Pages Settings](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-02-github-hosting-project-5.png)

GitHub Pages 除了设计项目页面(Project Pages)，还可以用来搭建个人或企业的独立博客(User & Organization Pages)。具体采用 Jekyll+Markdown 技术搭建静态网站，参见[《学会使用 GitHub 搭建个人博客》](./github-personal-blog.html)。

## 参考

1. [GitHub Help](https://help.github.com/)

2. [Progit](https://github.com/progit/progit)

3. [Git Magic](https://github.com/blynn/gitmagic)

3. [Git分支管理策略](www.ruanyifeng.com/blog/2012/07/git.html)

4. [Understanding the Git Workflow](https://sandofsky.com/blog/git-workflow.html)


    
