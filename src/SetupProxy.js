const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("enpoint", {
      target: "url",
      changeOrigin: true,
    })
  );
};
