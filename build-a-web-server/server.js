const http = require("http");
const { join } = require("path");
const { readFile } = require("fs");

const server = http.createServer((request, response) => {
  console.log(request.headers);
  console.log(request.url);
  const url = request.url === "/" ? "/index.html" : request.url;
  const filePath = join("public", url);
  readFile(filePath, (error, file) => { });
  
  response.end(filePath, "utf-8");

  readFile(filePath, (error, file) => {});
});

server.listen(3001);