require("dotenv").config();
const PORT = process.env.PORT || 3000;
const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const name = url.searchParams.get("hello");

  if (request.url === "/") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello, world!");
    response.end();
  } else if (name) {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${name}!`);
    response.end();

    return;
  } else if (name === "") {
    response.statusCode = 400;
    response.statusMessage = "Bad request";
    response.header = "Content-Type: text/plain";
    response.write("Enter a name");
    response.end();

    return;
  } else if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  } else if (request.url === "/favicon.ico") {
    response.writeHead(200, { "Content-Type": "image/x-icon" });
    response.end();

    return;
  } else {
    response.statusCode = 500;
    response.statusMessage = "Server Error";
    response.header = "Content-Type: text/plain";
    response.write("");
    response.end();

    return;
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});
