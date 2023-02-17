import * as React from 'react';
import ProgressWebView from '../../components/shared/ProgressWebView';
import {WebView} from "react-native-webview";
import {useState} from "react";

const HomeScreen = ({route}) => {
    const [webUrl, setWebUrl] = useState(`http://10.0.0.21:5173/show_article/${route?.params?.id}`)
    return <WebView
        source={{uri: webUrl}}
    />;
};

export default HomeScreen;