module.exports = function(api) {
    api.cache(true);
    return {
        "presets": ["module:metro-react-native-babel-preset"],
        "plugins": [
            ["react-native-platform-specific-extensions", {
                "extensions": ["css", "scss", "sass"],
            }]
        ]
    };
};