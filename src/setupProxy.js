const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3000",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
      secure: false,
    })
  )
  app.use(
    createProxyMiddleware("/client", {
      target: "http://localhost:3000",
      pathRewrite: {
        "^/client": "",
      },
      changeOrigin: true,
      secure: false,
    })
  )
}
