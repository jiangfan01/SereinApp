import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import DiscoverStackScreen from './stacks/DiscoverStackScreen';
import VideoStackScreen from './stacks/VideoStackScreen';
import UserStackScreen from './stacks/UserStackScreen';
import TabOption from "./options/TabOption";

const Tab = createBottomTabNavigator();

const TabScreen = () => {

    return (
        /**
         * 底部栏配置
         */
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.tabBarInactiveText,
                ...TabOption(route),
            })}>
            {/*底部栏路由页面*/}
            <Tab.Screen name="DiscoverStack" component={DiscoverStackScreen} />
            <Tab.Screen name="VideoStack" component={VideoStackScreen} />
            <Tab.Screen name="UserStack" component={UserStackScreen} />
        </Tab.Navigator>
    );
}

export default TabScreen;