import {View, Text, Button, StyleSheet, ScrollView, Image, RefreshControl} from 'react-native';
import useFetchData from "../../hooks/useFetchData";
import Content from "../../components/video/course/Content";
import Header from "../../components/video/course/Header";
import List from "../../components/video/course/List";
import React from "react";
import Teacher from "../../components/video/course/Teacher";

const CoursesScreen = ({route}) => {
    const url = `/courses/${route.params.id}`;

    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(
        url,
    );
    return (
        <ScrollView style={styles.box}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => onRefresh(url)}/>}>
            <View>
                <Header data={data.course}/>
            </View>
            <Content data={data.course}/>
            <View style={styles.list}>
                <List data={data.course}/>
            </View>
            <View style={styles.teacher}>
                <Teacher data={data.course}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 50,
        marginBottom: 60
    },
    teacher: {
        marginBottom: 30
    }
});

export default CoursesScreen;