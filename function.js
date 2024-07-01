window.function = function (html, fileName, format, zoom, orientation, margin, breakBefore, breakAfter, breakAvoid, fidelity, customDimensions) {
    // FIDELITY MAPPING
    const fidelityMap = {
        low: 1,
        standard: 1.5,
        high: 2,
    };
    
    // DYNAMIC VALUES
    html = html.value ?? "No HTML set.";
    fileName = fileName.value ?? "file";
    format = format.value ?? "a4";
    zoom = zoom.value ?? "1";
    orientation = orientation.value ?? "portrait";
    margin = margin.value ?? "0";
    breakBefore = breakBefore.value ? breakBefore.value.split(",") : [];
    breakAfter = breakAfter.value ? breakAfter.value.split(",") : [];
    breakAvoid = breakAvoid.value ? breakAvoid.value.split(",") : [];
    quality = fidelityMap[fidelity.value] ?? 1.5;
    customDimensions = customDimensions.value ? customDimensions.value.split(",").map(Number) : null;

    // DOCUMENT DIMENSIONS
    const formatDimensions = {
        thermal_80mm: [224, 1050],
    };

    // GET FINAL DIMENSIONS FROM SELECTED FORMAT
    const dimensions = customDimensions || formatDimensions[format];
    const finalDimensions = dimensions.map((dimension) => Math.round(dimension / zoom));

    // LOG SETTINGS TO CONSOLE (optional)
    console.log(
        `Filename: ${fileName}\n` +
        `Format: ${format}\n` +
        `Dimensions: ${dimensions}\n` +
        `Zoom: ${zoom}\n` +
        `Final Dimensions: ${finalDimensions}\n` +
        `Orientation: ${orientation}\n` +
        `Margin: ${margin}\n` +
        `Break before: ${breakBefore}\n` +
        `Break after: ${breakAfter}\n` +
        `Break avoid: ${breakAvoid}\n` +
        `Quality: ${quality}`
    );

    const customCSS = `
    /* Add your custom CSS styles here */
    `;

    const originalHTML = `
    <style>${customCSS}</style>
    <div class="main">
      <button class="button" id="print">Print</button>
      <div id="content" class="content">${html}</div>
    </div>
    <script>
      document.getElementById('print').addEventListener('click', function() {
        var element = document.getElementById('content');
        var button = this;
        button.innerText = 'PRINTING...';
        button.className = 'printing';

        // You can add specific printing logic here for Bluetooth thermal printer
        // Ensure your Bluetooth printer is properly connected and configured

        // Example:
        window.print();

        button.innerText = 'PRINT DONE';
        button.className = 'done';
        setTimeout(function() { 
          button.innerText = 'Print';
          button.className = ''; 
        }, 2000);
      });
    </script>
    `;

    var encodedHtml = encodeURIComponent(originalHTML);
    return "data:text/html;charset=utf-8," + encodedHtml;
};
