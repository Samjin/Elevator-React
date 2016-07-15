module.export = {
    entry: './js/elevator.js',
    output: {filename: 'bundle.js'},
    module: {
        loaders: [
            {
                test: /\.js?/, 
                loader: 'babel-loader', 
                exclude: /node_modules/
            }
        ]
    }
};
