const fetchData = require("./apiCombineJalan");

const data = async () => {
  await fetchData()
    .then((combinedData) => {
      // console.log("Combined Data:", combinedData);
      const api1 = combinedData.api1Data.data;
      const api2 = combinedData.api2Data.data;
      const api3 = combinedData.api3Data.data;

      // const kabupaten = api2.data[0].find((kab) => {
      //   kab.kabupaten_id === api1.data[0].kabupaten_id;
      // });
      // console.log(kabupa

      api1.forEach((a) => {
        const gettahun = api2.find((ap2) => {
          return ap2.id === a.tahun_id;
        });
        const getkab = api3.find((ap3) => {
          return ap3.id === a.kabupaten_id;
        });

        console.log(a.nama_jalan);
        console.log(gettahun.tahun);
        console.log(getkab.nama_kabupaten);
      });

      // const getid = api1[0].tahun_id;
      // console.log(getid);
      // console.log(api2[1]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

data();
