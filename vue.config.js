const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    
    allowedHosts: "3aaa.loca.lt",
    // allowedHosts: "http://localhost:3001",
  
  },
})
