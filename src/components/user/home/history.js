import {View, Text, StyleSheet, TouchableWithoutFeedback, RefreshControl, FlatList, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../../constants/Colors";
import useFetchData from "../../../hooks/useFetchData";
import Loading from "../../shared/Loading";
import NetworkError from "../../shared/NetworkError";
import {useState} from "react";
import LoadMore from "../../shared/LoadMore";
import {get} from "../../../utils/fechRequest";

let currentPage = 1
const url = `/users/histories`

const History = () => {
    const [moreLoading, setMoreLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const navigation = useNavigation()
    const {
        data,
        loading,
        error,
        onReload,
        refreshing,
        onRefresh,
        setData
    } = useFetchData(
        url, {
            histories: []
        }
    )

    // 判断是否加载中
    if (loading) {
        return <Loading/>;
    }

    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }

    const renderItem = ({item, index}) => (
        <TouchableWithoutFeedback
            key={item?.course?.id}
            onPress={() =>
                navigation.navigate('Courses', {
                    id: item?.course?.id,
                    title: item?.course?.name
                })
            }
        >
            <View style={styles.item}>
                <Image source={{uri: item?.course?.image}} style={styles.image}/>
                <Text style={styles.date}>{item?.course?.name}</Text>
                <Text style={styles.title} numberOfLines={4}> {item?.chapter?.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );


    /**
     * 下拉刷新重新加载页面
     * @constructor
     */
    const ToRefresh = () => {
        setIsEnd(false)
        setMoreLoading(false)
        currentPage = 1
        onRefresh(url).then()
    }

    /**
     * 触底加载更多
     * @returns {Promise<void>}
     */
    const getData = async () => {
        if (isEnd) {
            return
        }
        currentPage++
        setMoreLoading(true)
        get(`${url}?currentPage=${currentPage}`).then(res => {
                if (res.histories.length === 0) {
                    setIsEnd(true)
                    setMoreLoading(false)
                    return
                }
                setData({histories: [...data?.histories, ...res?.histories]});
                setMoreLoading(false)
            },
        )
    };


    return (
        <>
            <FlatList
                data={data.histories}
                style={styles.container}
                keyExtractor={item => item?.course?.id.toString()}
                renderItem={renderItem}
                onEndReached={getData}
                onEndReachedThreshold={0}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => ToRefresh()}/>}
            />
            <LoadMore moreLoading={moreLoading} isEnd={isEnd}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15
    },
    item: {
        marginBottom: 30
    },
    slide: {
        marginLeft: 15,
        marginRight: 15,
        width: '100%',
    },
    image: {
        width: "100%",
        height: 210,
        resizeMode: "cover",
        borderRadius: 5,
    },
    date: {
        color: Colors.primary,
        fontSize: 12,
        marginTop: 6,
        marginBottom: 4,
        textAlign: "center"
    },
    title: {
        fontSize: 14,
        color: '#b7b6b6',
        textAlign: "center"
    },

});

export default History