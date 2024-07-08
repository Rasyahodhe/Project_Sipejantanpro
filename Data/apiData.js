const axios = require("axios");
const loadJenisData = async (type) => {
  try {
    const url = `https://admin.sipejantanpro.sultraprov.go.id/api/${type}`;
    const token = "39cc3d12ea5641f46292666eadead7c3"; // Your token here
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, { headers });

    if (response.status !== 200) {
      throw new Error("Network Response ERROR");
    }

    return response.data;
  } catch (error) {
    console.error("There was a problem with your axios operation:", error);
    throw error;
  }
};
const loadJenisDataByID = async (type, id) => {
  try {
    const url = `https://admin.sipejantanpro.sultraprov.go.id/api/${type}/${id}`;
    const token = "39cc3d12ea5641f46292666eadead7c3"; // Your token here
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, { headers });

    if (response.status !== 200) {
      throw new Error("Network Response ERROR");
    }

    return response.data;
  } catch (error) {
    console.error("There was a problem with your axios operation:", error);
    throw error;
  }
};

// Fecth Combine Jembatan
const loadCombineJembatan = async () => {
  try {
    // Jalankan kedua permintaan secara simultan dengan Promise.all
    const [dataFromAPI1, dataFromAPI2, dataFromAPI3, dataFromAPI4] =
      await Promise.all([
        loadJenisData("jalan"),
        loadJenisData("tahun"),
        loadJenisData("kabkota"),
        loadJenisData("jembatan"),
      ]);

    // Gabungkan data dari kedua API ke dalam sebuah variabel
    const combinedData = {
      api1Data: dataFromAPI1,
      api2Data: dataFromAPI2,
      api3Data: dataFromAPI3,
      api4Data: dataFromAPI4,
    };

    return combinedData;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};
// Fecth Combine Jalan
const loadCombineJalan = async () => {
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
};

// fetch Combine pelaksanaan
const loadCombinePel = async () => {
  try {
    const [apidata1, apidata2, apidata3, apidata4] = await Promise.all([
      loadJenisData("pelaksanaan"),
      loadJenisData("dokumentasi"),
      loadJenisData("tahun"),
      loadJenisData("kabkota"),
    ]);

    const combineData = {
      pelaksanaan: apidata1,
      dokumentasi: apidata2,
      tahun: apidata3,
      kabkota: apidata4,
    };
    return combineData;
  } catch (error) {
    console.log(`Error Fetching data : ${error}`);
    throw error;
  }
};

const addData = async (data) => {
  try {
    const url = `https://admin.sipejantanpro.sultraprov.go.id/api/masukan`;
    const token = "39cc3d12ea5641f46292666eadead7c3"; // Your token here
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, data, { headers });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("Data sent successfully:", response.data);
  } catch (error) {
    console.error("There was a problem with your axios operation:", error);
    throw error;
  }
};

module.exports = {
  loadJenisData,
  loadJenisDataByID,
  addData,
  loadCombineJembatan,
  loadCombineJalan,
  loadCombinePel,
};
