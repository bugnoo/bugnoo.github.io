---
layout: post
heading: webpack 前端开发初体验
category: web前端开发
tag: 模块化 javascript nodejs webpack
excerpt: 在 Javascript 的发展过程中，无论是开启历史纪元的 CommonJS 规范, 还是 AMD/requireJS 的崛起与妥协，亦或是兼容并包的[CMD/seajs](https://github.com/seajs/seajs) 的出现，都对面向未来的 ES6 标准做出了杰出的贡献。而今天所谈论的 webpack 是这些方案的集大成者。
---

* content
{:toc}

![bloger](http://github-blog-image.oss-cn-shanghai.aliyuncs.com/2017-02-28-welcome-webpack-0.jpg){:.implied}

## 引言

在这篇文章开始之前，你最好了解 [web 前端模块化开发的重要意义](https://github.com/seajs/seajs/issues/547) 和 [javascript 模块化的蹉跎历程](http://www.cnblogs.com/lvdabao/p/js-modules-develop.html)。在 Javascript 的发展过程中，无论是开启历史纪元的 CommonJS 规范, 还是 AMD/requireJS 的崛起与妥协，亦或是兼容并包的[CMD/seajs](https://github.com/seajs/seajs) 的出现，都对面向未来的 ES6 标准做出了杰出的贡献。而今天所谈论的 webpack 是这些方案的集大成者。

> webpack: 当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。

## webpack 安装

1. webpack 执行打包压缩时以来 nodejs 开发环境。

http://webpackdoc.com/install.html



## 参考

1. [Writing Modular JavaScript With AMD, CommonJS & ES Harmony](https://addyosmani.com/writing-modular-js/)

1. [javascript 模块化历程](http://www.cnblogs.com/lvdabao/p/js-modules-develop.html)

2. [JavaScript 模块化七日谈](http://blog.csdn.net/jianfpeng241241/article/details/51713949)
