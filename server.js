const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: "halo ini adalah halaman get",
        })
      );
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `halaman tidak bisa di akses dengan ${method} request`,
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: `halo ini adalah halaman about`,
        })
      );
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => body.push(chunk));
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { nama } = JSON.parse(body);
        response.statusCode = 200;
        response.end(
          JSON.stringify({
            message: `halo${nama} saat ini anda berada halaman about`,
          })
        );
      });
    }
  } else {
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: `maaf url yang kamu masukan ${url} salah`,
      })
    );
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`server berjalan di http://${host}:${port}`);
});
