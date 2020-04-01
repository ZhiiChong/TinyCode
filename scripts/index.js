var qrCanvas = document.getElementById("qr-canvas");
var qrPara = {
    text: "helloworld",
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
}


function generate(){
    // 获取输入文本
    var inputText = document.getElementById("input").value;
    
    // 生成条形码
    var barCanvas = document.getElementById("bar-canvas");
    JsBarcode(barCanvas, inputText);

    // 生成二维码
    qrCanvas.innerHTML = "";
    qrPara.text = inputText;
    var qrCode = new QRCode(qrCanvas, qrPara);
}