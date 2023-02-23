import RootStackScreen from './src/navigation/RootStackScreen';
import {StatusBar} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import {setStatusBarStyle} from "expo-status-bar";

const App = () => {
    const setBarStyle = () => {

    }
    return (
        <>
            <StatusBar
                backgroundColor="#fff"
                barStyle="dark-content"
                animated={true}
                translucent={true}
                statusBarAnimation="fade"
            />
            <RootStackScreen/>
        </>
    )
}

// <RootStackScreen />

export default App;