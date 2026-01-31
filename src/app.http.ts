import http from "http";
import fs from "fs"
import path from "path";

const server = http.createServer((req, res) => {
  // console.log(`Request from: ${req.url}`);
  // res.writeHead(200, { "Content-Type": "text/html" });
  // res.write("<h1>Hola mundo</h1>");
  // res.end();

  // const data = {
  //   name: "John Doe",
  //   age: 30,
  //   city: "New York"
  // }
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.write(JSON.stringify(data));
  // res.end();

  console.log(req.url);

  try {
    const pathname = req.url;
    const { resource, extension } = getPublicResource(
      pathname === "/" ? "/index.html" : pathname
    );
    console.log({ extension, resource });
    switch (extension) {
      case "css":
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(resource);
        break;
      case "js":
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(resource)
        break;
      case "html":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(resource)
        break;
      default:
        res.writeHead(415, { "Content-Type": "text/plain" });
        res.end("Unsupported media type");
        break;
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" })
    res.end("<h1>Not found</h1>");
  }
});

function getPublicResource(pathname: string | undefined) {
  if (!pathname) throw new Error("Path was not provided");
  console.log(`./public${pathname}`)
  const resource = fs.readFileSync(`./public${pathname}`, {
    encoding: "utf-8"
  });
  console.log(resource);
  const extension = path.extname(pathname).slice(1);

  return {
    resource,
    extension
  }
}

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})