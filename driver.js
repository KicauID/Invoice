window.addEventListener("message", async function(event) {
  const { origin, data: { key, params } } = event;

  let hasil;
  let kesalahan;
  try {
    // Inisialisasi pustaka dengan konfigurasi Anda
    const printer = new PrinterLibrary(/* opsi Anda */);

    // Gunakan metode pustaka untuk memformat dan mengirim data
    const dataCetak = formatDataUntukPrinterThermal(params); // Adaptasi data
    await printer.print(dataCetak);

    hasil = "Proses cetak berhasil";
  } catch (e) {
    hasil = undefined;
    kesalahan = e.toString();
  }

  const respon = { key };
  if (hasil !== undefined) {
    respon.result = { value: hasil };
  }
  if (kesalahan !== undefined) {
    respon.error = kesalahan;
  }

  event.source.postMessage(respon, "*");
});

function formatDataUntukPrinterThermal(params) {
  // Implementasi logika untuk mengubah data menjadi format yang sesuai
  //  printer thermal (perintah ESC/POS atau urutan kontrol khusus)
  //  sesuai model printer Anda.
  return dataDiformat;
}
