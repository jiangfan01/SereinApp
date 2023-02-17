import * as React from 'react';
import {WebView} from 'react-native-webview';

const HomeScreen = () => {
    return (
        <WebView
            originWhitelist={['*']}
            source={{uri: `https://clwy.cn`}}
        />
    );
};

export default HomeScreen;