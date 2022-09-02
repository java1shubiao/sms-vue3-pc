module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
          "libraryName": "@xiaoe/js-tools",
          "style": false
      },
      "@xiaoe/js-tools"
     ]
    ]

};
