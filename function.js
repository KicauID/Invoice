<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML to Print Thermal</title>
    <style>
        .print-button {
            background-color: #0353A7; /* Warna biru untuk tombol PRINT */
            color: #fff;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <!-- Contoh data HTML yang ingin dicetak -->
    <div id="receipt-content">
        <h1>Tanda Terima</h1>
        <p>Ini adalah contoh tanda terima yang ingin dicetak.</p>
        <table border="1">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Harga</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Item 1</td>
                    <td>$10.00</td>
                </tr>
                <tr>
                    <td>Item 2</td>
                    <td>$20.00</td>
                </tr>
                <tr>
                    <td>Item 3</td>
                    <td>$15.00</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Tombol cetak -->
    <button class="print-button" onclick="printToBluetooth()">CETAK</button>

    <script src="driver.js"></script>
    <script src="function.js"></script>
    <script>
        function printToBluetooth() {
            var html = document.getElementById('receipt-content').innerHTML;
            var fileName = "receipt";
            var format = "thermal_58mm"; // Format kertas thermal 58mm, bisa disesuaikan
            var zoom = "1";
            var orientation = "portrait";
            var margin = "0";
            var breakBefore = "";
            var breakAfter = "";
            var breakAvoid = "";
            var fidelity = "standard";
            var customDimensions = null; // Dapat disesuaikan jika menggunakan dimensi khusus

            var url = window.function(html, fileName, format, zoom, orientation, margin, breakBefore, breakAfter, breakAvoid, fidelity, customDimensions);
            window.open(url, '_blank');
        }
    </script>
</body>
</html>
