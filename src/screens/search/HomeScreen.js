import {Text, View, Button, TextInput, StyleSheet} from 'react-native';
import {useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import fechRequest from "../../utils/fechRequest";

const HomeScreen = ({navigation}) => {
    const [searchParams, setSearchParams] = useState("")


    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Ionicons name="search-outline" size={24} color="gray" style={styles.icon}/>
                <Text style={styles.line}></Text>
                <TextInput
                    placeholder="搜索"
                    autoFocus={true}
                    clearButtonMode="while-editing"
                    returnKeyType="search"
                    onChangeText={query => {
                        setSearchParams(query);
                    }}
                    onSubmitEditing={() => {
                        navigation.navigate('Results', {
                            name: searchParams
                        })
                    }}
                    style={styles.searchInput}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#fff",
        borderRadius: 2,
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginLeft: 5
    },
    searchInput: {
        paddingLeft: 8,
        width: "100%",
    },
    line: {
        height: 15,
        borderLeftWidth: 0.5,
        borderColor: "#ddd",
        marginLeft: 5
    }

});
export default HomeScreen;