const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.setStatusCode = 200;
  const { method } = request;
  if (method === "GET") {
    response.end("<h1>halo get </h1>");
  }
  if (method === "POST") {
    let body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    });
    request.on("end", () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body);
      response.end(`<h1>halo ${name}</h1>`);
    });
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`server berjalan di http://${host}:${port}`);
});
