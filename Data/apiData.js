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

module.exports = { loadJenisData, addData };
