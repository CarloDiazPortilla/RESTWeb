import http from "http";

const server = http.createServer((req, res) => {
  console.log(`Request from: ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hola mundo</h1>");
  res.end();
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})