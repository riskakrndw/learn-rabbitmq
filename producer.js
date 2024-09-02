const amqp = require("amqplib");

const init = async () => {
  // buat koneksi
  const connection = await amqp.connect("amqp://localhost");

  // memanggil API dalam mengoperasikan transaksi di protokol AMQP
  const channel = await connection.createChannel();

  const queue = "dicoding";
  const message = "Selamat belajar message broker!";

  // memastikan queue sudah dibuat
  await channel.assertQueue(
    // bersifat idempoten, yang berarti ia hanya akan membuat channel baru bila channel yang diperiksa tidak ada
    queue,
    {
      durable: true, // untuk menjaga queue tetap tersedia ketika server message broker restart
    }
  );

  channel.sendToQueue(queue, Buffer.from(message)); // mengirimkan pesan
  console.log("Pesan berhasil terkirim!");

  // Beri jeda minimal 1 detik setelah pengiriman pesan
  setTimeout(() => {
    connection.close();
  }, 1000);
};

init();
