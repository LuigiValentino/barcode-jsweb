document.getElementById('barcode-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const text = document.getElementById('barcode-text').value;
    const type = document.getElementById('barcode-type').value;
    const lineColor = document.getElementById('line-color').value;
    const backgroundColor = document.getElementById('background-color').value;
    let width = parseInt(document.getElementById('barcode-width').value);
    let height = parseInt(document.getElementById('barcode-height').value);
    let fontSize = 18;


    const barcodeContainer = document.getElementById('barcode-container');
    barcodeContainer.innerHTML = '<svg id="barcode"></svg>';

    JsBarcode("#barcode", text, {
        format: type,
        displayValue: true,
        background: backgroundColor,
        lineColor: lineColor,
        width: width,
        height: height,
        margin: 10,
        fontSize: fontSize
    });

    const svg = document.getElementById('barcode');
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const img = document.createElement('img');
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    img.className = 'mt-4 mx-auto max-w-full';
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('image-preview').appendChild(img);
});

document.getElementById('download-svg').addEventListener('click', function() {
    const svg = document.getElementById('barcode');
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'codigo_de_barras.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
});

document.getElementById('download-png').addEventListener('click', function() {
    const svg = document.getElementById('barcode');
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = document.getElementById('background-color').value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = 'codigo_de_barras.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
});