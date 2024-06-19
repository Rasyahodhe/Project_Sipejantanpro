const loadJenisData = async (type) => {
  try {
    const url = `https://admin.sipejantanpro.sultraprov.go.id/api/${type}`;
    const token = "39cc3d12ea5641f46292666eadead7c3";
    const Headers = {
      Authorization: `Bearer ${token}`,
    };
    const pelaksanaan = await fetch(url, {
      method: "GET",
      headers: Headers,
    });

    if (!pelaksanaan.ok) {
      throw new Error("Network Response ERROR");
    }

    const data = await pelaksanaan.json();
    return data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};
const loadJenisDataByID = async (type,id) => {
  try {
    const url = `https://admin.sipejantanpro.sultraprov.go.id/api/${type}/${id}`;
    const token = "39cc3d12ea5641f46292666eadead7c3";
    const Headers = {
      Authorization: `Bearer ${token}`,
    };
    const pelaksanaan = await fetch(url, {
      method: "GET",
      headers: Headers,
    });

    if (!pelaksanaan.ok) {
      throw new Error("Network Response ERROR");
    }

    const data = await pelaksanaan.json();
    return data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
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
    const [apidata1, apidata2] = await Promise.all([
      loadJenisData("pelaksanaan"),
      loadJenisData("dokumentasi"),
    ]);

    const combineData = {
      pelaksanaan: apidata1,
      dokumentasi: apidata2,
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
    const token = "39cc3d12ea5641f46292666eadead7c3";
    const Headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    await fetch(url, {
      method: "POST",
      headers: Headers,
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};

//Testttt
// loadJenisData("hukum")
//   .then(({ data }) => {
//     // console.log({ data }.data[0].tahun_id);
//     const pel = { data }.data;
//     const filer = pel.filter((p) => {
//       return p.jenis === "Peta Jalan";
//     });

//     console.log(filer);
//   })
//   .catch((error) => {
//     console.error("There was a problem with fetching data:", error);
//   });

// const test = async () => {
//   await loadCombinePel()
//     .then((combineData) => {
//       const api1 = combineData.pelaksanaan.data;
//       const api2 = combineData.dokumentasi.data;
//       console.log(api1);
//       console.log(api2);
//     })
//     .catch((error) => {
//       console.log(`${error}`);
//     });
// };

// test();

module.exports = {
  loadJenisData,
  loadJenisDataByID,
  addData,
  loadCombineJembatan,
  loadCombineJalan,
  loadCombinePel,
};
