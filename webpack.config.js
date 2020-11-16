const path = require("path");
 
module.exports = {
  mode: "development", // Ou "production"
  devtool: "eval-source-map",
  entry: "./src/ts/app.ts", // Lien relatif
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src/ts")]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    publicPath: "public/js",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/js"), // Lien absolu
  },
}
