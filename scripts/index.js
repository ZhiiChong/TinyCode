/* ----------------- */
/* ---- 基本参数 ---- */
/* ---------------- */
var qrCanvas = document.getElementById("qr-canvas");
var barCanvas = document.getElementById("bar-canvas");
var inputText = undefined;

// 二维码参数
var qrOptions = {
    // qrCode options
    version: undefined,
    errorCorrectionLevel: "M",
    maskPattern: undefined,
    // renderer options
    margin: 4,
    scale: 4,
    width: 128,
    color:{
        dark: "#000000ff",
        light: "#ffffffff"
    }
};
// 背景透明度
var qrLtNone = "ff";

// 条形码参数
var barOptions = {
    //format: "CODE128",
    width: 2,
    height: 100,
    margin: 10,
    // color
    background: "#ffffff",
    lineColor: "#000000",
    // font/text options
    displayValue: true,
    // text: undefined,
    fontOptions: "",
    font: "monospace",
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 2,
    fontSize: 20,
    valid: 
        function(valid) {
            if(valid) {
                console.log("barcode generated!");
            }
            else {
                console.log("not valid data for barcode!")
            }
        }
};

/* ------------------------- */
/* ---- 事件监听与功能实现 ---- */
/* ------------------------- */
// 输入文本
function textInput() {
    inputText = document.getElementById("input").value;
}
// 同时生成二维码和条形码
function bothGen() {
    qrGen();
    barGen();
}
// 生成二维码
function qrGen() {
    qrCanvasClear();
    QRCode.toCanvas(qrCanvas, inputText, qrOptions, function (error){
        if(error) console.error(error);
        console.log('qrcode generated!');
    });
}
// 清空二维码(画布)
function qrCanvasClear() {
    var qrCanvas = document.getElementById("qr-canvas");
    qrCanvas.height = "0";
    qrCanvas.width = "0";
    if(isCanvasBlank(qrCanvas)){
        console.log("qrCanvas clear!");
    }
    else{
        console.log("qrCanvas not clear!");
    }
}
// 生成条形码
function barGen() {
    barCanvasClear();
    JsBarcode(barCanvas, inputText, barOptions);
}
// 清空条形码(画布)
function barCanvasClear() {
    var barCanvas = document.getElementById("bar-canvas");
    barCanvas.height = "0";  // 通过重设画布高度清空画布
    barCanvas.width = "0";
    if(isCanvasBlank(barCanvas)){
        console.log("barCanvas clear!");
    }
    else{
        console.log("barCanvas not clear!");
    }
}
// 画布清空判断
function isCanvasBlank(canvas) {
    var blank = document.createElement("canvas");
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() == blank.toDataURL();
}
// 下载
var saveFile = function(data, name) {
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = name;

    var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
}
function Download(canvas) {
    var canvas = document.getElementById(canvas);
    var dataURL = canvas.toDataURL("image/png");
    var fileName = (new Date()).getTime()
    saveFile(dataURL, fileName);
}

/**
 * 修改二维码参数
 */
// 修改容错级别
function qrCrtLevel() {
    var select = document.getElementById("crt-level");
    var index = select.selectedIndex;
    var value = select.options[index].value;
    qrOptions.errorCorrectionLevel = value;
}
// 修改前景颜色
function qrDkColor() {
    var qrDk = document.getElementById("qr-dark").value;
    qrOptions.color.dark = qrDk + "ff";
}
// 修改背景颜色
function qrLtColor() {
    var qrLt = document.getElementById("qr-light").value;
    qrOptions.color.light = qrLt + qrLtNone;
}
// 设置背景透明
function qrLtCheck() {
    var ltCheck = document.getElementById("qr-light-none");
    if(ltCheck.checked) {
        qrLtNone = "00";
    }
    else {
        qrLtNone = "ff";
    }
}
// 调整二维码（包含外边界）大小
function qrWidth() {
    var width = parseInt(document.getElementById("qr-width").value);
    var widthValue = document.getElementById("qr-width-value");
    qrOptions.width = width;
    widthValue.innerHTML = width;
}
// 调整二维码留白（外边界）
function qrMargin() {
    var margin = parseInt(document.getElementById("qr-margin").value);
    var marginValue = document.getElementById("qr-margin-value");
    qrOptions.margin = margin;
    marginValue.innerHTML = margin;
}
// 调整二维码版本
function qrVersion() {
    var version = parseInt(document.getElementById("qr-version").value);
    var versionAuto = document.getElementById("version-auto");
    var versionValue = document.getElementById("qr-version-value");
    if(versionAuto.checked||version==0) {
        qrOptions.version = undefined;
        version = 0;
        versionValue.innerHTML = "auto";
    }
    else {
        qrOptions.version = version;
        versionValue.innerHTML = version;
    }
}
// 调整二维码掩码图案
function qrMask() {
    var mask = parseInt(document.getElementById("qr-mask").value);
    var maskAuto = document.getElementById("mask-auto");
    var maskValue = document.getElementById("qr-mask-value");
    if(maskAuto.checked||mask==-1) {
        qrOptions.maskPattern = undefined;
        mask = -1;
        maskValue.innerHTML = "auto";
    }
    else {
        qrOptions.maskPattern = mask;
        maskValue.innerHTML = mask;
    }
}

/* ---------------------- */
/* ---- 修改条形码参数 ---- */
/* --------------------- */
// 调整条码粗度
function barWidth() {
    var width = parseInt(document.getElementById("bar-width").value);
    var widthValue = document.getElementById("bar-width-value");
    barOptions.width = width;
    widthValue.innerHTML = width;
}
// 调整条码高度
function barHeight() {
    var height = parseInt(document.getElementById("bar-height").value);
    var heightValue = document.getElementById("bar-height-value");
    barOptions.height = height;
    heightValue.innerHTML = height;
}
// 调整条码外边界
function barMargin() {
    var margin = parseInt(document.getElementById("bar-margin").value);
    var marginValue = document.getElementById("bar-margin-value");
    barOptions.margin = margin;
    marginValue.innerHTML = margin;
}
// 修改条码线条颜色
function barLineColor() {
    var barLine = document.getElementById("bar-line").value;
    barOptions.lineColor = barLine;
}
// 修改条码背景颜色
function barBgColor() {
    var barBg = document.getElementById("bar-bg").value;
    barOptions.background = barBg;
}
// 设置文本隐藏
function barTextCheck() {
    var textCheck = document.getElementById("bar-text-display");
    if(textCheck.checked) {
        barOptions.displayValue = false;
        console.log("text hidden!");
        // 隐藏文字相关选项
    }
    else {
        barOptions.displayValue = true;
        console.log("text showed!");
        // 显示文字相关选项
    }
}
// 设置文本样式
function barFontStyle() {
    var bold = document.getElementById("font-bold");
    var italic = document.getElementById("font-italic");
    if(bold.checked&&italic.checked) {
        barOptions.fontOptions = "bold italic";
    }
    else if(bold.checked) {
        barOptions.fontOptions = "bold";
    }
    else if(italic.checked) {
        barOptions.fontOptions = "italic";
    }
    else {
        barOptions.fontOptions = "";
    }
}
// 设置文本字体
function barFont() {
    var select = document.getElementById("bar-font");
    var index = select.selectedIndex;
    var value = select.options[index].value;
    barOptions.font = value;
}
// 设置文本对齐
function barTextAlign(align) {
    barOptions.textAlign = align;
}
// 设置文本位置
function barTextPosition(position) {
    barOptions.textPosition = position;
}
// 设置字体大小
function barFontSize() {
    var fontSize = document.getElementById("bar-font-size").value;
    var fontSizeValue = document.getElementById("bar-font-size-value");
    barOptions.fontSize = fontSize;
    fontSizeValue.innerHTML = fontSize;
}
// 设置文本外边界
function barTextMargin() {
    var textMargin = parseInt(document.getElementById("bar-text-margin").value);
    var textMarginValue = document.getElementById("bar-text-margin-value");
    barOptions.textMargin = textMargin;
    textMarginValue.innerHTML = textMargin;
}