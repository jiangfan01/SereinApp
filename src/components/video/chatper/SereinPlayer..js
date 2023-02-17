import React, {useRef, useState} from 'react'
import {Dimensions, Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import * as ScreenOrientation from 'expo-screen-orientation'
import {setStatusBarHidden} from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import {ResizeMode} from 'expo-av'
import VideoPlayer from 'clwy-expo-video-player'

let {width, height} = Dimensions.get('window')


/**
 * 平台判断
 * 因为安卓的高度计算，不含status bar，所以增加 16
 * https://reactnative.dev/docs/dimensions
 */
if (Platform.OS === 'android') {
    height += 16
}

const SereinPlayer = (props) => {
    const navigation = useNavigation();
    // 接受页面的 props url
    const {uri, shouldPlay} = props;
    // 全屏，默认为false
    const [inFullscreen, setInFullscreen] = useState(false)
    const refVideo = useRef(null)

    /**
     * 全屏播放
     * @returns {Promise<void>}
     */
    const enterFullscreen = async () => {
        // 隐藏 status bar
        setStatusBarHidden(true, 'fade')

        // 隐藏 header
        navigation.setOptions({headerShown: false})

        // 如果是安卓，尤其是小米，隐藏虚拟键设置
        Platform.OS === 'android' && NavigationBar.setVisibilityAsync("hidden");

        // 全屏的时候取反设置为真
        setInFullscreen(!inFullscreen)

        // 横屏旋转
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)

        // 全屏后是否自动播放
        refVideo.current.setStatusAsync({
            shouldPlay: shouldPlay,
        })
    }

    /**
     * 退出全屏播放
     * @returns {Promise<void>}
     */
    const exitFullscreen = async () => {
        // 显示status bar
        setStatusBarHidden(false, 'fade')

        // 显示header
        navigation.setOptions({headerShown: true})

        // 小米的虚拟手势显示
        Platform.OS === 'android' && NavigationBar.setVisibilityAsync("visible");

        // 退出的时候全屏为false
        setInFullscreen(!inFullscreen)

        // 竖屏
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }

    return (
        <VideoPlayer
            videoProps={{
                // 是否自动播放
                shouldPlay: shouldPlay,
                resizeMode: ResizeMode.CONTAIN,
                source: {
                    uri: uri,
                },
                ref: refVideo,
            }}
            // 全屏设置
            fullscreen={{
                inFullscreen: inFullscreen,
                enterFullscreen: enterFullscreen,
                exitFullscreen: exitFullscreen,
            }}
            // 自定义进度条样式
            slider={{
                minimumTrackTintColor: "#1f99b0",
                thumbTintColor: "#fff"
            }}
            // 播放器样式
            style={{
                videoBackgroundColor: 'black',
                width: inFullscreen ? height : width,
                // 使用 16:9 尺寸
                height: inFullscreen ? width : (width / 16) * 9,
            }}
            // 设置控制器样式。如不设置，按钮太靠近边缘，对于圆角屏幕不友好
            controlsStyle={{
                bottom: 24,
                left: 12,
                right: 12,
            }}
        />
    );
}

export default SereinPlayer