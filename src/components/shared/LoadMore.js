import {StyleSheet, Text} from "react-native";

const App = (props) => {

    if (props.moreLoading) {
        return <Text style={styles.footer}>o.0 正在加载</Text>
    }
    if (props.isEnd) {
        return <Text style={styles.footer}>o.0 到底了</Text>
    }

}
const styles = StyleSheet.create({
    footer: {
        padding: 10,
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})
export default App