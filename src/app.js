require("dotenv").config();
const PORT = process.env.PORT || 3000;
const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const searchParams = url.searchParams;
  console.log("searchParams:");
  const name = searchParams.get("hello");

  if (name === "") {
    response.writeHead(400, { "Content-type": "text/plain" });
    response.end("Enter a name");
    return;
  }

  if (name) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(`Hello, ${name}!`);
    return;
  }

  if (searchParams.has("users")) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(getUsers());
    return;
  }

  if (url.pathname === "/") {
    response.writeHead(200, { "Content-type": "text/plain" });
    response.end("Hello, world!");
    return;
  }

  if (url.pathname === "/favicon.ico") {
    response.writeHead(200, { "Content-Type": "image/x-icon" });
    response.end();
    return;
  }

  response.writeHead(500, { "Content-type": "text/plain" });
  response.end("");
  return;
});

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});
