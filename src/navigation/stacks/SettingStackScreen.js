import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/setting/HomeScreen';
import DetailsScreen from '../../screens/setting/DetailsScreen';
import Site from '../../screens/setting/Site';
import CardOption from "../options/CardOption";
import ModalOption from "../options/ModalOption";


const SettingStack = createNativeStackNavigator();

const SettingStackScreen = () => {
    return (
        <SettingStack.Navigator
            screenOptions={({route, navigation}) => ({
                ...CardOption(route, navigation),
            })}>
            <SettingStack.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation, route}) => ({
                    title: "设置",
                    ...ModalOption(navigation),
                })}/>
            <SettingStack.Screen name="Details" options={({navigation, route}) => ({
                title: "关于「长乐未央」"
            })} component={DetailsScreen}/>
            <SettingStack.Screen name="Site" component={Site}/>
        </SettingStack.Navigator>
    );
};

export default SettingStackScreen;