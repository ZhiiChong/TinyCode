var qrCanvas = document.getElementById("qr-canvas");
var barCanvas = document.getElementById("bar-canvas");
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

function bothGen() {
    qrGen();
    barGen();
}

// 生成二维码
function qrGen() {
    var inputText = document.getElementById("input").value;
    QRCode.toCanvas(qrCanvas, inputText, qrOptions, function (error){
        if(error) console.error(error);
        console.log('qrcode generated!');
    });
}
// 清空二维码(画布)
function qrCanvasClear() {
    var qrCanvas = document.getElementById("qr-canvas").getContext("2d");
    qrCanvas.clearRect(0,0,qrOptions.width,qrOptions.width);
}

// 生成条形码
function barGen() {
    var inputText = document.getElementById("input").value;
    JsBarcode(barCanvas, inputText, function(error){
        if(error) console.error(error);
        console.log('barcode generated!');
    });
}
// 清空条形码(画布)
function barCanvasClear() {
    var barCanvas = document.getElementById("qr-canvas").getContext("2d");
    barCanvas.clearRect(0,0,qrOptions.width,qrOptions.width);
}

// 保存二维码
//function qrSave() {
//}

// 修改二维码参数
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
// 调整背景透明度
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
    var width = document.getElementById("qr-width").value;
    qrOptions.width = width;
}
// 调整二维码留白（外边界）
function qrMargin() {
    var margin = document.getElementById("qr-margin").value;
    qrOptions.margin = margin;
}
// 调整二维码方块像素大小
function qrScale() {
    var scale = document.getElementById("qr-scale").value;
    qrOptions.scale = scale;
}