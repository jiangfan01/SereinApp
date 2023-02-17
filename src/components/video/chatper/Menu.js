import {
    FlatList, RefreshControl,
    StyleSheet,
    Text, TouchableHighlight, View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import Colors from "../../../constants/Colors";
import useFetchData from "../../../hooks/useFetchData";


const HomeScreen = (props) => {
    const {onItemSelected} = props
    const url = `/courses/${props.courseId}`
    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(url, {
        course: {}
    });
    const renderItem = (item) => {
        return (
            <>
                <TouchableHighlight
                    underlayColor="#ddd"
                    onPress={() => onItemSelected(item.item.id)}
                    key={item.item.id}
                >
                    <View style={styles.item}>
                        <Feather name="play" size={18} color={Colors.primary} style={styles.icon}/>
                        <Text style={styles.title}>{item.item.title}</Text>
                    </View>
                </TouchableHighlight>
            </>
        )
    }

    const ListHeader = () => {
        return (
            <>
                <View>
                    <Text style={styles.headerText}>{data?.course?.name}</Text>
                </View>
            </>
        )
    }

    const ItemSeparatorComponent = () => {
        return (
            <>
                <View style={{
                    backgroundColor: 'rgba(221,221,221,0.6)',
                    height: 1
                }}></View>
            </>
        )
    }

    return (
        <>
            <FlatList
                data={props.data}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                style={styles.container}
                ListHeaderComponent={ListHeader}
                ItemSeparatorComponent={ItemSeparatorComponent}
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        marginLeft: 15,
        marginTop: 10,
        // borderBottomWidth: 1,
        // borderColor: 'rgba(221,221,221,0.6)',
    },
    title: {
        marginLeft: 10,
        fontSize: 15,
        width: 210
    },
    icon: {},
    headerText: {
        backgroundColor: 'rgba(221,221,221,0.6)',
        fontSize: 20,
        lineHeight: 42,
        height: 42,
        paddingLeft: 15,
        width: 500,
        flexWrap: "wrap"
    }
});

export default HomeScreen;