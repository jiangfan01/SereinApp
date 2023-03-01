import useFetchData from "../../../hooks/useFetchData";
import {
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text, TouchableWithoutFeedback,
    View,
} from "react-native";
import Loading from "../../shared/Loading";
import NetworkError from "../../shared/NetworkError";
import Colors from "../../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import NoData from "../../shared/NoData";

const Liked = () => {
    const navigation = useNavigation()
    const url = `/users/likes`
    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(
        url, {courses: []}
    );
    // 判断是否加载中
    if (loading) {
        return <Loading/>;
    }
    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }

    if (data.courses.length === 0) {
        return <NoData/>
    }

    const renderItem = ({item, index}) => (
        <TouchableWithoutFeedback
            key={item.id}
            onPress={() =>
                navigation.navigate('Courses', {
                    id: item.id,
                    title: item.name
                })
            }
        >
            <View style={styles.item}>
                <Image source={{uri: item.image}} style={styles.image}/>
                <Text style={styles.date}>{item.name}</Text>
                <Text style={styles.title} numberOfLines={4}> {item.content}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <>
            <FlatList
                data={data.courses}
                // keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                style={styles.container}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(url)}/>}
            />
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
    },
    title: {
        fontSize: 14,
        color: '#b7b6b6'
    },
});
export default Liked
