# zproject
个人前端模版项目

## 简介

这仅仅是我在前端开发的一个配置环境，其中根据我平时的开发需求进行配置，并且使用gulp作为构建工具（VSCode作为开发环境），可能不满足所有人，但是对于新手而言是够用，且不坑的。

为了方便，开箱即用，默认在gulp的时候即开始所有的监视任务，这些任务提供以下功能
- 1: 文件压缩（css／js／图像文件）
- 2: css前缀添加
- 3: typescript编译
- 4: Ejs模版编译
- 5: 本地静态服务器
- 6: 浏览器同步刷新功能

## 使用说明

- 1: 使用Git工具拉取，或者下载zip包解压到指定目录。
- 2: 打开终端（命令行工具），输入以下这行
````
    cnpm install --save  
````

#### 没有cnpm？你可能需要先敲以下这行或者参考[cnpm官方文档](https://npm.taobao.org)。

````
    npm install -g cnpm --registry=https://registry.npm.taobao.org
````

- 3: 确保gulp正常安装，且所有依赖已被安装，输入以下这行

````
    gulp
````

如果一切正常，此时将打开一个浏览器，WOW！你的所有操作将会自动编译处理，并且同步到浏览器上面（所有打开此网址的浏览器！），开始你的工作吧！

## 配置说明
如果觉得默认配置不好，可以打开gulpfile.js，修改Config参数以配置你需要的。目前支持配置如下：
- 压缩JS文件 （默认打开）
- 压缩Css文件 （默认打开）
- 压缩图像文件 （默认打开）
- 编译TypeScript （默认关闭）
- 编译Ejs模版 （默认打开）
- less／sass支持 （无效果）
- js／css版本标记 （默认打开）
- 本地Http服务器 （默认打开）
- 浏览器操作同步 （默认打开）

以下是不可控制部分，我认为前端开发必须的，因而没有给予配置。
- Babel预处理 => [babel官方文档](http://babeljs.io)
- autoprefixer => [autoprefixer官方文档](https://www.npmjs.com/package/autoprefixer)

## 模块列表
````
    "babel-core": "^6.26.0",
    "browser-sync": "^2.23.6",
    "express": "^4.16.2",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^4.1.0",
    "gulp-babel": "^7.0.1",
    "gulp-clean-css": "^3.9.2",
    "gulp-ejs": "^3.1.1",
    "gulp-imagemin": "^4.1.0",
    "gulp-less": "^3.5.0",
    "gulp-rename": "^1.2.2",
    "gulp-replace": "^0.6.1",
    "gulp-sass": "^3.1.0",
    "gulp-typescript": "^4.0.1",
    "gulp-uglify": "^3.0.0",
    "gulp-watch": "^5.0.0",
    "typescript": "^2.7.2"
````
由于browser-sync依赖websocket，请确保你的浏览器支持websocket，以获取完整的体验。

## 寻求帮助？
Well，世界上没有完美的代码，如果出现问题，你可以添加我的微信号（LZHsir），但是记得备注您为何添加我为好友。

祝你在开发的道路上玩得开心。 :)  
  
