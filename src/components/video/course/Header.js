import {Image, Share, StyleSheet, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {EvilIcons} from "@expo/vector-icons";

const Header = (props) => {
    const image = props?.data?.image

    const onShare = async () => {
        const content = {
            message: '分享的消息',

            // iOS URL
            url: 'https://clwy.cn',

            // Android 消息标题
            title: '分享的标题',
        };

        await Share.share(content);
    };

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
                        <Ionicons
                            name="ios-heart-outline"
                            size={24} color="gray"
                            style={styles.iconFlex}
                        />
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