module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        net: false,
        tls: false
      }
    }
  }
};
