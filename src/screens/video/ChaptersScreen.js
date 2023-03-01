import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableWithoutFeedback,
    Text,
    ProgressBarAndroid, RefreshControl
} from 'react-native'
import SereinPlayer from "../../components/video/chatper/SereinPlayer."
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {WebView} from "react-native-webview";
import Menu from "../../components/video/chatper/Menu";
import SideMenu from "react-native-side-menu-updated";
import Feather from "@expo/vector-icons/Feather";
import ProgressWebView from "../../components/shared/ProgressWebView";
import Colors from "../../constants/Colors";
import fechRequest from "../../utils/fechRequest";

const ChaptersScreen = ({route, navigation}) => {
    let url = `/chapters/${route.params.id}`
    const {data, loading, error, onReload, refreshing, onRefresh, fetchData} = useFetchData(url, {
        chapter: {},
        chapters: []
    });
    const [chapterUrl, setChapterUrl] = useState()
    const [webUrl, setWebUrl] = useState(`https://react.serein-jf.co/show_chapter/${route.params.id}`)
    const [isOpen, setIsOpen] = useState(false);
    const courseId = data?.chapter?.courseId
    const chapterId = route?.params?.id
    const {id, title} = route.params;
    const [headerTitle, setHeaderTitle] = useState(title);

    // 展开左侧菜单
    const updateMenuState = menuState => {
        setIsOpen(menuState);
    };

    const history = async () => {

        const res = await fechRequest(`/histories`, "POST", {
            courseId,
            chapterId
        })
    }

    useEffect(() => {
        // 有课程id在新增
        if (courseId) {
            history().then()
        }
    }, [courseId])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle
        });
    }, [navigation, headerTitle]);


    // 切换选择
    const onItemSelected = (id, title) => {
        setHeaderTitle(title);
        setIsOpen(false);
        setWebUrl(`https://react.serein-jf.co/show_chapter/${id}`)
        url = `/chapters/${id}`
    };

    // 左侧菜单
    const menu = <Menu onItemSelected={onItemSelected} data={data.chapters}
                       courseId={data?.chapter?.CourseId}/>;

    if (loading) {
        return <Loading/>;
    }

    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }


    return (
        <View style={styles.container}>
            <SideMenu
                menu={menu}
                isOpen={isOpen}
                onChange={menuState => updateMenuState(menuState)}
                disableGestures={false}
            >

                {/*视频*/}
                <View style={styles.container}>
                    <SereinPlayer
                        data={data}
                        uri={data.chapter.video}
                        shouldPlay={false}/>

                    {/*切换按钮*/}
                    <TouchableWithoutFeedback
                        style={styles.menu}
                        onPress={() => {
                            setIsOpen(!isOpen);
                        }}>
                        <View style={styles.icon}>
                            {isOpen ? <Feather name="chevron-left" size={18} color='black'/> :
                                <Feather name="chevron-down" size={18} color='black'/>}
                            <Text style={styles.courseText}>课程列表</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.line}></View>
                    <SafeAreaView style={{flex: 1}}>
                        <WebView
                            source={{uri: webUrl}}
                        >
                        </WebView>
                    </SafeAreaView>
                </View>
            </SideMenu>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        height: 50
    },
    courseText: {
        fontSize: 14,
        marginLeft: 5
    },
    icon: {
        flexDirection: "row",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: "#7d7d7d",
        marginTop: 5,
        marginLeft: 15,
        borderRadius: 18,
        marginBottom: 10,
        lineHeight: 40,
        width: 100
    },
    line: {
        borderBottomWidth: 1,
        borderColor: Colors.primary
    }
})

export default ChaptersScreen