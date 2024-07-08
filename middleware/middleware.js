class MIddleware {
  // Handler Not Found
  static notfound(req, res, next) {
    res.status(404).send("Halaman Not Found");
  }

  // Handler Internal Server Error
  static internalError(err, req, res, next) {
    console.error(err.stack); // Log error stack trace
    res.status(500).send("Server Error");
  }

  // General Error Handler
  static hendlerError(err, req, res, next) {
    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        message: err.message || "Terjadi kesalahan pada server",
      },
    });
  }
}

module.exports = MIddleware;
