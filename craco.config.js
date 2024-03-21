module.exports = {
    // plugins: [
    //     {
    //         plugin: CracoLessConfig,
    //         options: {
    //             lessLoaderOptions: {
    //                 lessOptions: {
    //                     modifyVars: {
    //                         "@primary-color": "rgb(84,50,208)",
    //                         "@font-size-base": "16px",
    //                     },
    //                     javascriptEnabled: true,
    //                 },
    //             },
    //         },
    //     },
    // ],
    devServer: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                pathRewrite: { "^/api": "/" },
            },
        }
    }
};
