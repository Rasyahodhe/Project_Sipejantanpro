const express = require("express");
const server = express();
const mIddleware = require("./middleware/middleware");
const ejsLayouts = require("express-ejs-layouts");
const port = 3300;

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const router = require("./routes/server");

server.use(router);

server
  .use(mIddleware.notfound)
  .use(mIddleware.internalError)
  .use(mIddleware.hendlerError);

server.listen(port, () => {
  console.log(`Server Berjalan di http://localhost:${port}`);
});
