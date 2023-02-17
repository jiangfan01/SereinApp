import {
    View,
    RefreshControl,
    ScrollView,
    StyleSheet,
} from 'react-native';
// import useFetchDataHook from '../../hooks/useFetchDataHook';
import useFetchData from "../../hooks/useFetchData";
import Loading from '../../components/shared/Loading';
import NetworkError from '../../components/shared/NetworkError';
import Swiper from '../../components/discover/home/Swiper'
import Slide from '../../components/discover/home/Slide'
import DividerTitle from '../../components/discover/home/DividerTitle'

const url = '/';

const HomeScreen = ({navigation}) => {
    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(url);
    // 判断是否加载中
    if (loading) {
        return <Loading/>;
    }

    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }
    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(url)}/>}>
            <View style={styles.course}>

                <Slide data={data.recommendedCourses} title={"推荐课程"}></Slide>

                <Swiper data={data.calendarCourses} title={"课程发布日历"}></Swiper>

                <DividerTitle title={'视频区域'} SubTitle={'视频教程'}></DividerTitle>
                <Swiper data={data.likesCourses} title={"最受欢迎的课程"}></Swiper>
                <Swiper data={data.introductoryCourses} title={"入门课程"}></Swiper>

                <DividerTitle title={'开发教程'} TitleEnglish={'DOCUMENT'}></DividerTitle>
                <Swiper data={data.recommendedCourses} title={"推荐课程"}></Swiper>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default HomeScreen;