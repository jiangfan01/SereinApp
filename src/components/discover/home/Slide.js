import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../../../constants/Colors';
import {useNavigation} from "@react-navigation/native";


const HomeScreen = ({ data }) => {
    const navigation = useNavigation();

    const pages = data.map((course, index) => (
        <TouchableWithoutFeedback
            key={course.id}
            onPress={() =>
                navigation.navigate('Courses', {
                    id: course.id,
                    title: course.name,
                })
            }>
            <View style={styles.slide}>
                <Image source={{ uri: course.image }} style={styles.image} />
                <Text style={styles.date}>{course.createdAt}发布</Text>
                <Text style={styles.title}>{course.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    ));

    // 解决轮播图插件自身bug，底部dot不会跟着动
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.head}>发现</Text>
                <Text style={styles.heading}>推荐课程</Text>
            </View>

            <View style={styles.slides}>
                <Swiper
                    autoplay
                    autoplayTimeout={3}
                    showsButtons={false}
                    loop
                    height={200}
                    dotColor={'#999'}
                    activeDotColor={Colors.primary}
                    paginationStyle={styles.paginationStyle}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.dotStyle}>
                    {pages}
                </Swiper>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {
        color: Colors.primary,
        fontSize: 26,
        marginTop: 28,
        marginBottom: 18,
        fontWeight: 'bold',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    slides: {
        height: 362,
    },
    content: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    slide: {
        marginLeft: 15,
        marginRight: 15,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 210,
        borderRadius: 5,
    },
    date: {
        color: Colors.primary,
        fontSize: 12,
        marginTop: 6,
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
    },
    dotStyle: {
        height: 7,
        width: 7,
    },
    paginationStyle: {
        marginBottom: 12,
    },
});

export default HomeScreen;