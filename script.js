// LOG SETTINGS TO CONSOLE
// DYNAMIC VALUES
html = document.getElementById('content').innerHTML ?? "No HTML set.";
fileName = "file";
format = "58mm, 80mm atau 100mm"; // Example format string

console.log(`HTML: ${html}`);
console.log(`File Name: ${fileName}`);
console.log(`Format: ${format}`);

let selectedPrinter = null;

document.getElementById('select-printer').addEventListener('click', async () => {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['printer_service'] }] // Adjust service UUID accordingly
        });
        selectedPrinter = device;
        console.log(`Selected printer: ${selectedPrinter.name}`);
        document.getElementById('print').disabled = false;
    } catch (error) {
        console.error('Error selecting printer:', error);
    }
});

document.getElementById('print').addEventListener('click', () => {
    if (!selectedPrinter) {
        alert('Please select a printer first.');
        return;
    }

    var element = document.getElementById('content');
    var opt = {
        margin: [0, 0, 0, 0],
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: format.split(",")[0].trim(), orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).output('datauristring').then(async (pdfDataUri) => {
        try {
            console.log('Connecting to printer...');
            const server = await selectedPrinter.gatt.connect();
            const service = await server.getPrimaryService('printer_service'); // Adjust service UUID accordingly
            const characteristic = await service.getCharacteristic('printer_characteristic'); // Adjust characteristic UUID accordingly
            
            console.log('Sending data to printer...');
            const pdfData = atob(pdfDataUri.split(',')[1]); // Decode base64
            const pdfBuffer = new Uint8Array(pdfData.length);
            for (let i = 0; i < pdfData.length; i++) {
                pdfBuffer[i] = pdfData.charCodeAt(i);
            }
            await characteristic.writeValue(pdfBuffer);
            
            console.log('Print successful');
        } catch (error) {
            console.error('Error printing:', error);
        }
    });
});
