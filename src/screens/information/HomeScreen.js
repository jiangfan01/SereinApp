import {
    Text,
    View,
    FlatList,
    RefreshControl,
    StyleSheet,
    TouchableWithoutFeedback, ActivityIndicator,
} from 'react-native';
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";
import {useEffect, useState} from "react";
import LoadMore from "../../components/shared/LoadMore";
import {get} from "../../utils/fechRequest";

let currentPage = 1
const url = `/articles`

const HomeScreen = ({navigation}) => {
    const [moreLoading, setMoreLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const {
        data,
        loading,
        error,
        onReload,
        refreshing,
        onRefresh,
        setData
    } = useFetchData(url, {articles: []});
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
            key={item.id}
            onPress={() =>
                navigation.navigate('Articles', {
                    id: item.id,
                    title: item.title
                })
            }
        >
            <View style={styles.box}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.createdAt}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const getData = async () => {
        if (isEnd) {
            return
        }

        currentPage++
        setMoreLoading(true)
        get(`${url}?currentPage=${currentPage}`).then(res => {
                if (res.articles.length === 0) {
                    setIsEnd(true)
                    setMoreLoading(false)
                    return
                }
                setData({articles: [...data.articles, ...res.articles]});
                setMoreLoading(false)
            },
        )
    };

    const ToRefresh = () => {
        setIsEnd(false)
        setMoreLoading(false)
        currentPage = 1
        onRefresh(url).then()
    }

    return (
        <>
            <FlatList
                data={data.articles}
                style={styles.container}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                onEndReached={getData}
                onEndReachedThreshold={0.5}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => ToRefresh()}/>}
            />
            <LoadMore moreLoading={moreLoading} isEnd={isEnd}/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15
    },
    box: {
        marginTop: 20,
        flex: 0.3,
        borderBottomWidth: 1,
        borderColor: '#dcdcdc',
    },
    time: {
        textAlign: "right",
        paddingTop: 20,
        paddingBottom: 15,
        color: '#767676',
    },
    content: {color: "#767676"},

});

export default HomeScreen;