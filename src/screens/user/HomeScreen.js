import {StyleSheet, Text,} from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'clwy-expo-scrollable-tab-view';
import Colors from "../../constants/Colors";
import React from "react";
import Home from "../../components/user/home/home";
import History from "../../components/user/home/history";
import Liked from "../../components/user/home/liked";
const HomeScreen = () => {
    return (
        <>
            <ScrollableTabView
                style={styles.container}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarUnderlineStyle={{backgroundColor: Colors.primary}}
                tabBarBackgroundColor={Colors.white}
                tabBarInactiveTextColor={Colors.tabBarInactiveText}
                tabBarActiveTextColor={Colors.tabBarActiveText}
                tabBarTextStyle={{fontWeight: '400'}}
            >
                <Home tabLabel="我的主页"></Home>
                <History tabLabel="观看历史"></History>
                <Liked tabLabel="我的收藏"></Liked>
            </ScrollableTabView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
export default HomeScreen