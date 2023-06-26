const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 400;
      response.end("<h1>halo ini adalah halaman get</h1>");
    } else {
      response.statusCode = 400;
      response.end(`method ${method} yang kamu kasih salah `);
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(`<h1>halo ini adalah halaman get</h1>`);
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => body.push(chunk));
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { nama } = JSON.parse(body);
        response.statusCode = 200;
        response.end(`<h1>halo ${nama}`);
      });
    }
  } else {
    response.statusCode = 404;
    response.end(`<h1>maaf url yang kamu masukan ${url} salah</h1>`);
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`server berjalan di http://${host}:${port}`);
});
