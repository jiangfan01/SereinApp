import useFetchData from "../../../hooks/useFetchData";
import Loading from "../../shared/Loading";
import NetworkError from "../../shared/NetworkError";
import {Image, StyleSheet, Text, View} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';


const Home = () => {
    const url = `/users/me`
    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(
        url, {
            user: {}
        }
    )

    const sex = data?.user?.sex ? "男" : "女"

    // 判断是否加载中
    if (loading) {
        return <Loading/>;
    }

    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }

    return (
        <>
            <View style={styles.box}>
                <View style={styles.info}>
                    <Entypo name="medal" size={24} color='white'/>
                    <Text style={styles.infoText}>所有在线课程都可免费观看！</Text>
                </View>
                <View style={styles.user}>
                    <Image style={styles.avatar} source={{uri: data?.user?.avatar}}></Image>
                    <View style={styles.userInfo}>
                        <Text>学籍编号 : {data?.user.id}</Text>
                        <Text style={styles.free}>免费用户</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.itemBox}>
                        <Text style={styles.itemTitle}>用户名/邮箱</Text>
                        <Text style={styles.itemInfo}>{data?.user?.username}</Text>
                    </View>
                    <View style={styles.itemBox}>
                        <Text style={styles.itemTitle}>性别</Text>
                        <Text style={styles.itemInfo}>{sex}</Text>
                    </View>
                    <View style={styles.itemBox}>
                        <Text style={styles.itemTitle}>公司</Text>
                        <Text style={styles.itemInfo}>{data?.user?.company}</Text>
                    </View>
                    <View style={styles.itemBox}>
                        <Text style={styles.itemTitle}>自我介绍</Text>
                        <Text style={styles.itemInfo}>{data?.user?.introduce}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: '#fff',
    },
    info: {
        backgroundColor: '#fda520',
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    infoText: {
        color: 'white',
        marginLeft: 10
    },
    user: {
        marginLeft: 15,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    userInfo: {
        marginLeft: 20
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 60
    },
    free: {
        color: 'white',
        marginTop: 10,
        backgroundColor: "#ddd",
        fontSize: 12,
        borderRadius: 2,
        textAlign: "center",
        paddingLeft: 5,
        paddingRight: 5,
    },
    item: {
        marginTop: 50,
    },
    itemBox: {
        flexDirection: "row",
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        marginLeft: 15,
        marginRight: 15,
    },
    itemTitle: {
        color: "#ddd",
        marginTop: 5,
        width: 120
    },
    itemInfo: {
        marginTop: 5
    }

});

export default Home