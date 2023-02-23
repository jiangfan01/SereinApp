import * as React from 'react';
import ProgressWebView from '../../components/shared/ProgressWebView';
import {WebView} from "react-native-webview";
import {useState} from "react";

const HomeScreen = ({route}) => {
    const [webUrl, setWebUrl] = useState(`https://react.serein-jf.co/show_article/${route?.params?.id}`)
    return <WebView
        source={{uri: webUrl}}
    />;
};

export default HomeScreen;