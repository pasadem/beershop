module.exports = {
    
    plugins: [
        new webpack.ProvidePlugin({
               process: 'process/browser',
               'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
  }