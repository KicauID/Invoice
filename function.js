<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print Receipt</title>
    <style>
        .receipt {
            width: auto;
            padding: 10px;
            font-family: Helvetica;
        }
        .header {
            text-align: center;
            font-weight: bold;
            padding-bottom: 10px;
            border-bottom: 1px solid #000;
        }
        .content {
            padding: 10px 0;
        }
        .content .label {
            display: block;
            margin-bottom: 5px;
        }
        .button-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            border: none;
            border-radius: 5px;
        }
        button#cetak {
            background-color: #0353A7;
            color: #fff;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="receipt">
        <!-- Content will be dynamically inserted here -->
    </div>
    <div class="button-container">
        <button id="cetak">Cetak</button>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    <script>
        // DYNAMIC VALUES
        const htmlContent = `
            <div class="header">EVENT NAME</div>
            <div class="content">
                <div class="label">ID: 12345</div>
                <div class="label">Class: VIP</div>
                <div class="label">Price: $50.00</div>
            </div>
        `;
        const fileName = "file";
        const format = "58mm, 80mm atau 100mm";
        const zoom = 1;
        const orientation = "portrait";
        const margin = 0;
        const breakBefore = [];
        const breakAfter = [];
        const breakAvoid = [];
        const fidelity = "standard";
        const customDimensions = null;

        document.querySelector('.receipt').innerHTML = htmlContent;

        // Connect to Bluetooth Printer and Print
        async function connectToPrinter() {
            try {
                const device = await navigator.bluetooth.requestDevice({
                    filters: [{ services: ['printer_service'] }]
                });
                const server = await device.gatt.connect();
                const service = await server.getPrimaryService('printer_service');
                const characteristic = await service.getCharacteristic('printer_characteristic');
                return characteristic;
            } catch (error) {
                console.error('Failed to connect to the printer', error);
            }
        }

        document.getElementById('cetak').addEventListener('click', async function() {
            const characteristic = await connectToPrinter();
            if (characteristic) {
                const element = document.querySelector('.receipt');
                html2canvas(element, {
                    onrendered: function(canvas) {
                        const dataUrl = canvas.toDataURL('image/png');
                        const img = new Image();
                        img.src = dataUrl;
                        img.onload = function() {
                            const canvasPrint = document.createElement('canvas');
                            canvasPrint.width = img.width;
                            canvasPrint.height = img.height;
                            const context = canvasPrint.getContext('2d');
                            context.drawImage(img, 0, 0);
                            canvasPrint.toBlob(function(blob) {
                                const reader = new FileReader();
                                reader.onload = function() {
                                    const data = new Uint8Array(reader.result);
                                    characteristic.writeValue(data);
                                };
                                reader.readAsArrayBuffer(blob);
                            });
                        };
                    }
                });
            }
        });
    </script>
</body>
</html>
