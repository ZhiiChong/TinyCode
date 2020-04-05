# 微码 TinyCode
一个支持实时渲染的二维码/条形码生成工具。

## 环境依赖
* [Node-QRCode](https://github.com/soldair/node-qrcode) by soldair (Ryan Day)
* [JsBarcode](https://github.com/lindell/JsBarcode) by Johan Lindell
* [Bootstrap](https://github.com/twbs/bootstrap) by Bootstrap team
* [jQuery](https://github.com/jquery/jquery)  by jQuery team

上述库都已包含在文件中/通过 CDN 调用，无需配置额外的环境，只需要一个版本较新的主流浏览器。

参考版本：

* Chrome 9+
* Firefox 12+
* Internet Explorer 9+
* Safari 5+

## 快速使用

直接访问 [TinyCode](https://zhiichong.github.io/TinyCode/) 开始制作你的二维码/条形码。

或者可以

``` bash
$ git clone https://github.com/ZhiiChong/TinyCode.git
```

将项目克隆到本地，并用浏览器打开 **index.html** 文件即可开始使用。

1. 输入文本
2. 点击 **生成** 或 **全部生成** 按钮
3. 得到你想要的二维码/条形码

你还可以：改变图片的参数；保存生成的图片；清空生成的图片。

## 使用说明

### 按钮状态

所有的状态按钮若为**浅色**（**灰色**）则表示未选中，若为**深色**（**黑色**）则表示已选中。

生成、保存、清空等功能按钮无深色（黑色）状态。

与显示/隐藏相关的按钮会改变页面显示的内容和布局。

### 最值与默认值

所有最值可以在 **index.html** 中通过修改相关的 `<input>` 控件的 `max` 和 `min` 属性来修改。

所有的默认值可以在 **index.js** 中通过修改 `qrOptions` 或 `barOptions` 中的属性值来修改。

若需要调整最值和默认值，注意参考 [Node-QRCode](https://github.com/soldair/node-qrcode) 和 [JsBarcode](https://github.com/lindell/JsBarcode) 中支持的数据类型和取值范围。

程序中有简单的错误判断机制，如报错则会通过画布/控制台显示。

### 响应式设计

这个网页工具做了简单的响应式设计，但对移动端的优化还不够好。

建议使用**大屏设备**来运行这个工具。

小屏下建议**不同时显示**二维码和条形码（便于查看实时渲染的结果）。

如果你生成的码太大（一般是文本很长的条形码），可以通过滚轮或移动画布来查看溢出的部分。

### 实时渲染

**点击按钮开启实时渲染**，之后所有修改参数、文本的操作都会即时地生成对应的二维码/条形码。

你可以使用这个功能来帮助你生成或调整的二维码/条形码。

### 其他

所有的设置以及功能都在工具页面上简洁易懂地显示了出来。

如果不确定某项设置的作用，可以借用 **实时渲染** 功能，调整设置同时观看码图的变化，来确定你想要的效果。

