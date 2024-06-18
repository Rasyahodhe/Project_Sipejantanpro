const loadJenisData = require("./apiData");

async function fetchData() {
  try {
    // Jalankan kedua permintaan secara simultan dengan Promise.all
    const [dataFromAPI1, dataFromAPI2, dataFromAPI3] = await Promise.all([
      loadJenisData("jalan"),
      loadJenisData("tahun"),
      loadJenisData("kabkota"),
    ]);

    // Gabungkan data dari kedua API ke dalam sebuah variabel
    const combinedData = {
      api1Data: dataFromAPI1,
      api2Data: dataFromAPI2,
      api3Data: dataFromAPI3,
    };

    return combinedData;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}

// Panggil fungsi fetchData
// fetchData()
//   .then((combinedData) => {
//     console.log("Combined Data:", combinedData);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

module.exports = fetchData;
