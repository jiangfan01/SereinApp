import {Image, StyleSheet, Text, View} from 'react-native';
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/shared/Loading";
import NetworkError from "../../components/shared/NetworkError";

const HomeScreen = () => {
    const url = `/users/me`

    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(
        url, {user: {}}
    );

    if (loading) {
        return <Loading/>;
    }
    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 24}}>老师 {data?.user?.username}</Text>
            <Image style={styles.avatar} source={{uri: data?.user?.avatar}}></Image>
            <View style={styles.info}>
                <Text style={{marginRight: 15}}>介绍</Text>
                <Text>{data?.user?.introduce}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 20
    },
    info: {
        flexDirection: "row",
        marginTop: 30,
        borderBottomWidth:1,
        borderColor:'#b7b7b7'
    }
});

export default HomeScreen;