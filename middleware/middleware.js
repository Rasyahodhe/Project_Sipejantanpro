class MIddleware {
  // Hendler Not Found
  static notfound(req, res, next) {
    res.status(404).send("Halaman Not Found");
  }
  //   Hendler Internal Server
  static internalError(req, res, err, next) {
    res.status(500).send("Serve Error");
  }

  static hendlerError(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message || "Terjadi kesalahan pada server",
      },
    });
  }
}

module.exports = MIddleware;
