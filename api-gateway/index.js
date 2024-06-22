const express = require("express");
const cors = require("cors");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(cors());


app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
  next();
});
app.get("/", (req, res) => {
  res.send("API Gateway is working");
  console.log("API Gateway is working");
});

const proxyTargets = {
  auth: "http://auth-service:5001",
  note: "http://note-service:5002",
  search: "http://search-service:5004",
};

app.use(
  "/api/user",
  createProxyMiddleware({
    target: proxyTargets.auth,
    changeOrigin: true,
  })
);
app.use(
  "/api/note",
  createProxyMiddleware({
    target: proxyTargets.note,
    changeOrigin: true,
  })
);

app.use(
  "/api/search",
  createProxyMiddleware({
    target: proxyTargets.search,
    changeOrigin: true,
  })
);

app.use((err, req, res, next) => {
  console.error("Proxy Error:", err);
  res.status(500).send("Proxy Error");
});

app.listen(4000, () => {
  console.log("server is running on the port 4000");
});
