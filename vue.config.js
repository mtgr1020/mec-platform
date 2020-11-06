module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'border-radius-base': '5px',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
};