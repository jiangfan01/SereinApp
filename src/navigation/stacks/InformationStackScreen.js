import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/information/HomeScreen';
import ArticlesScreen from '../../screens/information/ArticlesScreen';
import CardOption from '../options/CardOption';
import ModalOption from "../options/ModalOption";

const InformationStack = createNativeStackNavigator();

const InformationStackScreen = () => {
    return (
        <InformationStack.Navigator
            screenOptions={({route, navigation}) => ({
                ...CardOption(route, navigation),
            })}>
            <InformationStack.Screen
                name="Home" component={HomeScreen}
                options={({navigation, route}) => ({
                    title: "新闻",
                    ...ModalOption(navigation),
                })}/>
            <InformationStack.Screen
                name="Articles" component={ArticlesScreen}
                options={({route}) => ({
                    title: route.params.title,
                    headerTitleStyle: {
                        fontSize: 14,
                        pappingRight: 10,
                        pappingLeft: 10,
                        color: "black"
                    }
                })}/>
        </InformationStack.Navigator>
    );
};

export default InformationStackScreen;