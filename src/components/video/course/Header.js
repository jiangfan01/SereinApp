import {Alert, Image, Share, StyleSheet, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import fechRequest from "../../../utils/fechRequest";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = (props) => {
    const image = props?.data?.image
    const userId = props?.data?.userId
    const courseId = props?.data?.id
    const id = props.courseId
    const [isLike, setIsLike] = useState(Boolean)
    const url = `/users/liked?courseId=${id}`
    const [token, setToken] = useState("")

    const getToken = async () => {
        setToken(await AsyncStorage.getItem("token"))
    }

    const onShare = async () => {
        const content = {
            message: props?.data?.title,
            // iOS URL
            url: 'https://clwy.cn',
            // Android 消息标题
            title: props?.data?.title,
        };
        await Share.share(content);
    };

    const getLiked = async () => {
        const res = await fechRequest(url, "GET")
        setIsLike(res.liked)
    }

    const onLike = async () => {
        if (!token) {
            Alert.alert('暂未登录', '请先登录', [
                {text: '好的',},
            ]);
        } else {
            await fechRequest(`/likes`, "POST", {
                userId, courseId
            })
            setIsLike(!isLike)
        }
    }

    useEffect(() => {
        getLiked().then()
        getToken().then()
    }, [])

    return (
        <>
            <View style={styles.header}>
                <Image style={styles.image} source={{uri: image}}></Image>

                <View style={styles.icon}>
                    <TouchableOpacity
                        onPress={onShare}>
                        <View style={styles.icons}>
                            <Ionicons
                                name="share-social-outline"
                                size={24} color="gray"
                                style={styles.iconFlex}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.icons}>
                        <TouchableOpacity
                            onPress={onLike}>
                            {isLike ?
                                <Ionicons
                                    name="ios-heart-outline"
                                    size={24} color="pink"
                                    style={styles.iconFlex}
                                />
                                :
                                <Ionicons
                                    name="ios-heart-outline"
                                    size={24} color="gray"
                                    style={styles.iconFlex}
                                />
                            }

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    header: {
        position: "relative",
    },
    icon: {
        flexDirection: "row",
        position: "absolute",
        bottom: -20,
        right: 20,
    },
    iconFlex: {},
    icons: {
        justifyContent: "center",
        alignItems: "center",
        width: 42,
        height: 42,
        borderWidth: 1,
        borderRadius: 21,
        backgroundColor: "#fff",
        borderColor: "#d1d1d1",
        marginRight: 5,
        zIndex: 99
    },

    image: {
        width: "100%",
        height: 210
    }
});

export default Header