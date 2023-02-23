import {View , StyleSheet, ScrollView, RefreshControl} from 'react-native';
import useFetchData from "../../hooks/useFetchData";
import Content from "../../components/video/course/Content";
import Header from "../../components/video/course/Header";
import List from "../../components/video/course/List";
import Teacher from "../../components/video/course/Teacher";
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";

const CoursesScreen = ({route}) => {
    const url = `/courses/${route.params.id}`;

    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(
        url,
    );


    if (loading) {
        return <Loading/>;
    }
    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }

    return (
        <ScrollView style={styles.box}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => onRefresh(url)}/>}>
            <View>
                <Header data={data.course} courseId={data?.course?.id}/>
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