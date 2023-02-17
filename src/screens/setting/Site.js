import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";

const Site = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.title}>首页</Text>
                </View>
                <Text style={styles.box}>
                    <Text style={styles.title}>vue</Text>
                </Text>
                <Text style={styles.box}>
                    <Text style={styles.title}>react</Text>
                </Text>
                <Text style={styles.box}>
                    <Text style={styles.title}>react native</Text>
                </Text>
                <Text style={styles.box}>
                    <Text style={styles.title}>git</Text>
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
    },
    box: {
        borderBottomWidth: 1,
        borderColor: '#cccccc',
    },
    title: {
        lineHeight: 60,
        color: Colors.primary,
    }
});

export default Site