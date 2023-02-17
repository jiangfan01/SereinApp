import React from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'clwy-react-native-scrollable-tab-view';
import Colors from '../../constants/Colors';
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import Course from "../../components/video/home/Course";

const url = '/categories';

const HomeScreen = () => {
    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(url);

    if (loading) {
        return <Loading/>;
    }

    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }

    return (
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
            {data.categories.map(item => (
                <Course
                    tabLabel={item.name} categoryId={item.id} key={item.id}/>
            ))}
        </ScrollableTabView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default HomeScreen;
