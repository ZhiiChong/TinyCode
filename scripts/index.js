/* ----------------- */
/* ---- 基本参数 ---- */
/* ---------------- */
var qrCanvas = document.getElementById("qr-canvas");    // 二维码画布元素
var barCanvas = document.getElementById("bar-canvas");  // 条形码画布元素
var inputText = undefined;  // 输入的文本
var realTime = false;       // 实时渲染标志

/**
 * 二维码参数（默认值）
 */
var qrOptions = {
    // qrCode options
    version: undefined,         // 版本
    errorCorrectionLevel: "M",  // 容错级别
    maskPattern: undefined,     // 掩码样式
    // renderer options
    margin: 4,                  // 外边界（留白）
    scale: 4,                   // 方块像素（会被宽度覆盖，所以没有设置选项）
    width: 128,                 // 宽度（包含外边界）
    color:{
        dark: "#000000ff",      // 编码颜色，默认黑色
        light: "#ffffffff"      // 背景颜色，默认白色
    }
};
var qrLtNone = "ff";        // 背景透明度（默认不透明）

/**
 * 条形码参数（默认值）
 */
var barOptions = {
    //format: "CODE128",        // 模式，可以更改
    width: 2,                   // 粗度（条码单位宽度）
    height: 100,                // 高度
    margin: 10,                 // 外边界
    // color
    background: "#ffffff",      // 背景颜色，默认白色
    lineColor: "#000000",       // 线条颜色，默认黑色
    // font/text options
    displayValue: true,         // 是否显示文本
    // text: undefined,         // 默认文本，会被输入文本覆盖
    fontOptions: "",            // 字体样式，默认无样式
    font: "monospace",
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 2,
    fontSize: 20,
    valid: 
        function(valid) {
            if(valid) {
                if(document.getElementById("bar-error").style.display!="none") {
                    changeDisplay(document.getElementById("bar-error").id);
                    changeDisplay("bar-canvas");
                }
                console.log("barcode generated!");
            }
            else {
                if(document.getElementById("bar-error").style.display=="none") {
                    document.getElementById("bar-error").innerHTML="Invalid input data for barcode!"
                    changeDisplay(document.getElementById("bar-error").id);
                    changeDisplay("bar-canvas");
                }
                console.log("not valid data for barcode!");
            }
        }
};

/* ------------------------- */
/* ---- 事件监听与功能实现 ---- */
/* ------------------------- */
/**
 * 根据输入改变输入文本
 */
function textInput() {
    inputText = document.getElementById("input").value;
    realTimeGen();
}
/**
 * 同时生成二维码和条形码
 */
function bothGen() {
    qrGen();
    barGen();
}
/**
 * 生成二维码
 */
function qrGen() {
    canvasClear("qr");
    QRCode.toCanvas(qrCanvas, inputText, qrOptions, function (error){
        var qrError = document.getElementById("qr-error");
        if(error) {
            console.error(error);
            if(qrError.style.display=="none"){
                qrError.innerHTML = error;
                changeDisplay("qr-error");
                changeDisplay("qr-canvas");
            }
        }
        else {
            if(qrError.style.display==""){
                changeDisplay("qr-error");
                changeDisplay("qr-canvas");
            }
            console.log('qrcode generated!');
        }
    });
}
/**
 * 生成条形码
 */
function barGen() {
    canvasClear("bar");
    JsBarcode(barCanvas, inputText, barOptions);
}
/**
 * 清空二维码或条形码(画布)
 */
function canvasClear(code) {
    var canvas = document.getElementById(code+"-canvas");
    canvas.height = "0";
    canvas.width = "0";
    if(isCanvasBlank(canvas)){
        console.log(code+"Canvas clear!");
    }
    else{
        console.log(code+"Canvas not clear!");
    }
}
/**
 * 画布清空判断
 * @param {Object} canvas - 画布元素对象
 */
function isCanvasBlank(canvas) {
    var blank = document.createElement("canvas");
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() == blank.toDataURL();
}
/**
 * 设置实时渲染
 */
function setRealTime() {
    changeButton("real-time");
    changeButton("real-time-vertical");
    realTime = !realTime;
}
// 实时渲染
function realTimeGen(){
    if(realTime) {
        bothGen();
    }
}
/**
 * 下载
 * @param {string} data - 包含 data URL 的 DOM String
 * @param {string} name - 触发事件时的时间
 */
var saveFile = function(data, name) {
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = name;

    var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
}
/**
 * 
 * @param {object} canvas - 画布元素对象
 */
function Download(canvas) {
    var canvas = document.getElementById(canvas);
    var dataURL = canvas.toDataURL("image/png");
    var fileName = (new Date()).getTime()
    saveFile(dataURL, fileName);
}
/**
 *  设置显示/隐藏二维码或条形码，并调整页面布局
 * @param {object} code 
 */
function display(code){
    changeButton("display-"+code);
    changeButton("display-"+code+"-vertical");
    changeDisplay(code+"-container");
    changeDisplay(code+"-options");
    // 调整布局
    var qr = document.getElementById("display-qr");
    var bar = document.getElementById("display-bar");
    var qrOpt = document.getElementById("qr-options");
    var barOpt = document.getElementById("bar-options");
    if(qr.value=="true"&&bar.value=="false") {
        qrOpt.classList.remove("col-md-6","col-lg-2");
        qrOpt.classList.add("col-lg-4");
    }
    else if(qr.value=="false"&&bar.value=="true") {
        barOpt.classList.remove("col-md-6","col-lg-2");
        barOpt.classList.add("col-lg-4");
    }
    else {
        qrOpt.classList.remove("col-lg-4");
        qrOpt.classList.add("col-md-6","col-lg-2");
        barOpt.classList.remove("col-lg-4");
        barOpt.classList.add("col-md-6","col-lg-2");
    }
}
/**
 * 改变按钮状态（样式和值）
 * @param {*} buttonName 按钮元素id
 */
function changeButton(buttonName) {
    var button = document.getElementById(buttonName);
    if(button.value=="false") {
        button.classList.remove("btn-secondary");
        button.classList.add("btn-dark");
        button.value = "true";
    }
    else {
        button.classList.remove("btn-dark");
        button.classList.add("btn-secondary");
        button.value = "false";
    }
}
/**
 * 改变容器显示样式
 * @param {*} containerName 容器元素id
 */
// 显示/隐藏元素（容器）
function changeDisplay(containerName) {
    var container = document.getElementById(containerName);
    if(container.style.display!="none") {
        container.style.display = "none";
    }
    else {
        container.style.display = "";
    }
}

/* ---------------------- */
/* ---- 修改二维码参数 ---- */
/* --------------------- */
/**
 * 修改容错级别
 */
function qrCrtLevel() {
    var select = document.getElementById("crt-level");
    var index = select.selectedIndex;
    var value = select.options[index].value;
    qrOptions.errorCorrectionLevel = value;
    realTimeGen();
}
/**
 * 修改前景颜色
 */
function qrDkColor() {
    var qrDk = document.getElementById("qr-dark").value;
    qrOptions.color.dark = qrDk + "ff";
    realTimeGen();
}
/**
 * 修改背景颜色
 */
function qrLtColor() {
    var qrLt = document.getElementById("qr-light").value;
    qrOptions.color.light = qrLt + qrLtNone;
    realTimeGen();
}
/**
 * 设置背景透明
 */
function qrLtCheck() {
    var ltCheck = document.getElementById("qr-light-none");
    var ltContainer = document.getElementById("qr-light-container");
    if(ltCheck.value=="false") {
        qrLtNone = "00";
        qrLtColor();
    }
    else {
        qrLtNone = "ff";
        qrLtColor();
    }
    changeButton(ltCheck.id);
    changeDisplay(ltContainer.id);
    realTimeGen();
}
/**
 * 调整二维码（包含外边界）大小
 */
function qrWidth() {
    var width = document.getElementById("qr-width").value;
    var widthValue = document.getElementById("qr-width-value");
    qrOptions.width = parseInt(width);
    widthValue.innerHTML = width;
    realTimeGen();
}
/**
 * 调整二维码留白（外边界）
 */
function qrMargin() {
    var margin = document.getElementById("qr-margin").value;
    var marginValue = document.getElementById("qr-margin-value");
    qrOptions.margin = parseInt(margin);
    marginValue.innerHTML = margin;
    realTimeGen();
}
/**
 * 调整二维码版本
 */
function qrVersion() {
    var version = document.getElementById("qr-version").value;
    var versionValue = document.getElementById("qr-version-value");
    qrOptions.version = parseInt(version);
    versionValue.innerHTML = version;
    realTimeGen();
}
/**
 * 自动选择版本
 */ 
function qrVersionAuto() {
    var versionAuto = document.getElementById("version-auto");
    var versionContainer = document.getElementById("qr-version-container");
    if(versionAuto.value=="false") {
        qrOptions.version = "auto";
    }
    else {
        qrOptions.version = parseInt(document.getElementById("qr-version").value);
    }
    changeButton(versionAuto.id);
    changeDisplay(versionContainer.id);
    realTimeGen();
}
/**
 * 调整二维码掩码图案
 */
function qrMask() {
    var mask = document.getElementById("qr-mask").value;
    var maskValue = document.getElementById("qr-mask-value");
    qrOptions.maskPattern = parseInt(mask);
    maskValue.innerHTML = mask;
    realTimeGen();
}
/**
 * 自动选择掩码
 */
function qrMaskAuto() {
    var maskAuto = document.getElementById("mask-auto");
    var maskContainer = document.getElementById("qr-mask-container");
    if(maskAuto.value=="false") {
        qrOptions.maskPattern = "auto";
    }
    else {
        qrOptions.maskPattern = parseInt(document.getElementById("qr-mask").value);
    }
    changeButton(maskAuto.id);
    changeDisplay(maskContainer.id);
    realTimeGen();
}

/* ---------------------- */
/* ---- 修改条形码参数 ---- */
/* --------------------- */
/**
 * 调整条码粗度
 */
function barWidth() {
    var width = document.getElementById("bar-width").value;
    var widthValue = document.getElementById("bar-width-value");
    barOptions.width = parseInt(width);
    widthValue.innerHTML = width;
    realTimeGen();
}
/**
 * 调整条码高度
 */
function barHeight() {
    var height = document.getElementById("bar-height").value;
    var heightValue = document.getElementById("bar-height-value");
    barOptions.height = parseInt(height);
    heightValue.innerHTML = height;
    realTimeGen();
}
/**
 * 调整条码外边界
 */
function barMargin() {
    var margin = document.getElementById("bar-margin").value;
    var marginValue = document.getElementById("bar-margin-value");
    barOptions.margin = parseInt(margin);
    marginValue.innerHTML = margin;
    realTimeGen();
}
/**
 * 修改条码线条颜色
 */
function barLineColor() {
    var barLine = document.getElementById("bar-line").value;
    barOptions.lineColor = barLine;
    realTimeGen();
}
/**
 * 修改条码背景颜色
 */
function barBgColor() {
    var barBg = document.getElementById("bar-bg").value;
    barOptions.background = barBg;
    realTimeGen();
}
/**
 * 设置文本隐藏
 */
function barTextCheck() {
    var textCheck = document.getElementById("bar-text-display");
    var textContainer = document.getElementById("bar-text-container");
    if(textCheck.value=="true") {
        barOptions.displayValue = false;
    }
    else {
        barOptions.displayValue = true;
    }
    changeButton(textCheck.id);
    changeDisplay(textContainer.id);
    realTimeGen();
}
/**
 * 设置文本样式
 * @param {string} button - 文字的样式，可选加粗和斜体，取值 "bold", "italic"
 */
function barFontStyle(button) {
    var bold = document.getElementById("font-bold");
    var italic = document.getElementById("font-italic");
    changeButton(button);
    if(bold.value=="true"&&italic.value=="true") {
        barOptions.fontOptions = "bold italic";
    }
    else if(bold.value=="true") {
        barOptions.fontOptions = "bold";
    }
    else if(italic.value=="true") {
        barOptions.fontOptions = "italic";
    }
    else {
        barOptions.fontOptions = "";
    }
    realTimeGen();
}
/**
 * 设置文本字体
 */
function barFont() {
    var select = document.getElementById("bar-font");
    var index = select.selectedIndex;
    var value = select.options[index].value;
    barOptions.font = value;
    realTimeGen();
}
/**
 * 设置文本对齐
 * @param {string} align - 文本的对齐方式，取值 "left", "center", "right"
 */
function barTextAlign(align) {
    var textAlign = document.getElementById("align-"+align);
    var nowAlign = document.getElementById("align-"+barOptions.textAlign);
    if(textAlign.id!=nowAlign.id) {
        changeButton(textAlign.id);
        changeButton(nowAlign.id);
    }
    barOptions.textAlign = align;
    realTimeGen();
}
/**
 * 设置文本位置
 * @param {string} position - 文本的上下位置，取值 "top", "bottom"
 */
function barTextPosition(position) {
    var textPosition = document.getElementById("position-"+position);
    if(textPosition.value=="false"){
        changeButton("position-top");
        changeButton("position-bottom");
    }
    barOptions.textPosition = position;
    realTimeGen();
}
/**
 * 设置字体大小
 */
function barFontSize() {
    var fontSize = document.getElementById("bar-font-size").value;
    var fontSizeValue = document.getElementById("bar-font-size-value");
    barOptions.fontSize = parseInt(fontSize);
    fontSizeValue.innerHTML = fontSize;
    realTimeGen();
}
/**
 * 设置文本外边界
 */
function barTextMargin() {
    var textMargin = document.getElementById("bar-text-margin").value;
    var textMarginValue = document.getElementById("bar-text-margin-value");
    barOptions.textMargin = parseInt(textMargin);
    textMarginValue.innerHTML = textMargin;
    realTimeGen();
}

