const {
  loadJenisData,
  loadJenisDataByID,
  addData,
  loadCombineJembatan,
  loadCombineJalan,
  loadCombinePel,
} = require("../Data/apiData");

const express = require("express");
const router = express.Router();
// Setting Home
router.get("/", async (req, res) => {
  await loadCombinePel()
    .then((combineData) => {
      const pelaksanaan = combineData.pelaksanaan.data;
      const dokumentasi = combineData.dokumentasi.data;

      const uniqData = {};
      dokumentasi.forEach((d) => {
        if (!uniqData[d.pelaksanaan_id]) {
          uniqData[d.pelaksanaan_id] = d;
        }
      });
      const filteredData = Object.values(uniqData);

      return res.render("./pages/home.ejs", {
        title: "Home",
        page: "../pages/home.ejs",
        layout: "./layouts/main_layout.ejs",
        data: filteredData,
        data2: pelaksanaan,
      });
    })
    .catch((error) => {
      res.json({
        message: `${error}`,
      });
    });
});

router.post("/", async (req, res) => {
  const { name, judul, type, ket, lokasi } = req.body;
  const data = {
    nama: name,
    judul: judul,
    jenis_infrastruktur: type,
    keterangan: ket,
    foto_url: "foto URL",
    lokasi: lokasi,
  };

  await addData(data);
});

// Setting pelaksanaan
router.get("/pel/:tahun/:kabkota/", async (req, res) => {
  const { tahun, kabkota } = req.params;
  await loadCombinePel()
    .then((combineData) => {
      const pelaksanaan = combineData.pelaksanaan.data;
      const dokumentasi = combineData.dokumentasi.data;

      // Filtering Pelaksanaan
      const gettahun = pelaksanaan.filter((p) => {
        return p.tahun_id === +tahun;
      });
      const pel = gettahun.filter((p) => {
        return p.kabupaten_id === +kabkota;
      });
      // Filtering Dokumentasi
      const gettahundok = dokumentasi.filter((d) => {
        return d.tahun_id === +tahun;
      });
      const dok = gettahundok.filter((d) => {
        return d.kabupaten_id === +kabkota;
      });
      // Filtering Page sesuai dengan Jumlah data pelaksnaan
      const perPage = 10,
        currentPage = parseInt(req.query.page) || 1,
        startIndex = (currentPage - 1) * perPage;

      const pagenation = pel.slice(startIndex, startIndex + perPage);
      const totalPage = Math.ceil(pel.length / perPage);
      return res.render("./pages/page-pelaksanaan/pelaksanaan.ejs", {
        title: "Pelaksanan",
        page: "../pages/page-pelaksanaan/pelaksanaan.ejs",
        layout: "./layouts/main_layout.ejs",
        data: pagenation,
        dok: dok,
        currentPage: currentPage,
        totPage: totalPage,
        tahun: tahun,
        kabkota: kabkota,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/pel/:tahun/:kabkota/detail/:id", async (req, res) => {
  const { tahun, kabkota, id } = req.params;
  await loadJenisData("dokumentasi")
    .then(({ data }) => {
      const dokumentasi = { data }.data;
      // Ambil Data Tahun
      const getTahun = dokumentasi.filter((d) => {
        return d.tahun_id === +tahun;
      });
      const getKabkota = getTahun.filter((d) => {
        return d.kabupaten_id === +kabkota;
      });
      const getDok = getKabkota.filter((item) => {
        return item.pelaksanaan_id === +id;
      });
      return res.render("./pages/page-pelaksanaan/detPel.ejs", {
        title: "Pelaksanan",
        page: "../pages/page-pelaksanaan/detPel.ejs",
        layout: "./layouts/main_layout.ejs",
        data: getDok,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

// Setting HUKUM (SK dan PETA)
router.get("/SK/", async (req, res) => {
  await loadJenisData("hukum")
    .then(({ data }) => {
      const hukum = { data }.data;
      const sk = hukum.filter((item) => {
        return item.jenis === "Surat Keputusan";
      });
      const perPage = 10,
        currentPage = parseInt(req.query.page) || 1,
        startIndex = (currentPage - 1) * perPage;

      const pagenation = sk.slice(startIndex, startIndex + perPage);
      const totalPage = Math.ceil(sk.length / perPage);
      return res.render("./pages/page-sk/sk.ejs", {
        title: "Surat Keputusan",
        page: "../pages/page-sk/sk.ejs",
        layout: "./layouts/main_layout.ejs",
        data: pagenation,
        currentPage: currentPage,
        totPage: totalPage,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/peta/", async (req, res) => {
  await loadJenisData("hukum")
    .then(({ data }) => {
      const hukum = { data }.data;
      const petaJalan = hukum.filter((item) => {
        return item.jenis === "Peta Jalan";
      });

      const perPage = 10,
        currentPage = parseInt(req.query.page) || 1,
        startIndex = (currentPage - 1) * perPage;

      const pagenation = petaJalan.slice(startIndex, startIndex + perPage);
      const totalPage = Math.ceil(petaJalan.length / perPage);
      return res.render("./pages/page-sk/peta.ejs", {
        title: "Peta",
        page: "../pages/page-sk/peta.ejs",
        layout: "./layouts/main_layout.ejs",
        data: pagenation,
        currentPage: currentPage,
        totPage: totalPage,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

// Setting Kemantapan
router.get("/kemantapan", async (req, res) => {
  return res.render("./pages/kemantapan.ejs", {
    title: "Kemantapan",
    page: "../pages/kemantapan.ejs",
    layout: "./layouts/main_layout.ejs",
  });
});

router.get("/kemantapan/jalan", async (req, res) => {
  await loadJenisData("statistik_jalan").then(({ data }) => {
    const stat = { data }.data;
    const jalan_baik = stat[0].jalan_baik;
    const jalan_sedang = stat[0].jalan_sedang;
    const jalan_ringan = stat[0].jalan_ringan;
    const jalan_berat = stat[0].jalan_berat;
    const total_panjang = stat[0].total_panjang;
    const mantap = ((+jalan_baik + +jalan_sedang) / +total_panjang) * 100;
    const tidakmantap = ((+jalan_ringan + +jalan_berat) / +total_panjang) * 100;
    return res.render("./pages/page-kemantapan/jalan.ejs", {
      title: "Kemantapan Jalan",
      page: "../pages/page-kemantapan/jalan.ejs",
      layout: "./layouts/main_layout.ejs",
      data: stat,
      mantap,
      tidakmantap,
    });
  });
});

router.get("/kemantapan/jalan/table/", async (req, res) => {
  await loadCombineJalan()
    .then((combinedData) => {
      const api1 = combinedData.api1Data.data;
      const api2 = combinedData.api2Data.data;
      const api3 = combinedData.api3Data.data;

      const perPage = 10,
        currentPage = parseInt(req.query.page) || 1,
        startIndex = (currentPage - 1) * perPage;

      const pagenation = api1.slice(startIndex, startIndex + perPage);
      const totalPage = Math.ceil(api1.length / perPage);
      return res.render("./pages/page-kemantapan/table/tabledatajalan.ejs", {
        title: "Tabel Jalan",
        page: "../pages/page-kemantapan/table/tabledatajalan.ejs",
        layout: "./layouts/main_layout.ejs",
        data1: pagenation,
        data2: api2,
        data3: api3,
        currentPage: currentPage,
        totPage: totalPage,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

router.get("/kemantapan/jembatan", async (req, res) => {
  await loadJenisData("statistik_jembatan").then(({ data }) => {
    const stat = { data }.data;
    return res.render("./pages/page-kemantapan/jembatan.ejs", {
      title: "Kemantapan Jembatan",
      page: "../pages/page-kemantapan/jembatan.ejs",
      layout: "./layouts/main_layout.ejs",
      data: stat,
    });
  });
});

router.get("/kemantapan/jembatan/table/", async (req, res) => {
  await loadCombineJembatan()
    .then((combinedData) => {
      const jalan = combinedData.api1Data.data;
      const tahun = combinedData.api2Data.data;
      const kab = combinedData.api3Data.data;
      const jembatan = combinedData.api4Data.data;

      const perPage = 10,
        currentPage = parseInt(req.query.page) || 1,
        startIndex = (currentPage - 1) * perPage;

      const pagenation = jembatan.slice(startIndex, startIndex + perPage);
      const totalPage = Math.ceil(jembatan.length / perPage);

      return res.render("./pages/page-kemantapan/table/tabledatajembatan.ejs", {
        title: "Tabel Jalan",
        page: "../pages/page-kemantapan/table/tabledatajembatan.ejs",
        layout: "./layouts/main_layout.ejs",
        data1: pagenation,
        data2: kab,
        data3: jalan,
        data4: tahun,
        currentPage: currentPage,
        totPage: totalPage,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // await loadJenisData("jembatan").then(({ data }) => {
  //   const dt = { data }.data;

  //   return res.render("./pages/page-kemantapan/table/tabledatajembatan.ejs", {
  //     title: "Tabel Jembatan",
  //     page: "../pages/page-kemantapan/table/tabledatajembatan.ejs",
  //     layout: "./layouts/main_layout.ejs",
  //     data: dt,
  //   });
  // });
});

module.exports = router;
