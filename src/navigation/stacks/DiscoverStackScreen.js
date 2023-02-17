import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/discover/HomeScreen';
import CoursesScreen from '../../screens/video/CoursesScreen';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from '../options/CardOption';
import ChaptersScreen from "../../screens/video/ChaptersScreen";

const DiscoverStack = createNativeStackNavigator();

const DiscoverStackScreen = () => {
    return (
        /**
         * CardOption配置页面切换动画,标题居中等...,在这stack组下面的所有页面生效
         * 接收配置文件,必须要用...展开对象
         */
        <DiscoverStack.Navigator
            screenOptions={({route, navigation}) => ({
                ...CardOption(route, navigation),
            })}>
            {/*HeaderButtonsOption头部栏的图标配置，只在home页导入了，其他页面无法显示*/}
            <DiscoverStack.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation, route}) => ({
                    // 接收配置文件,必须要用...展开对象
                    ...HeaderButtonsOption(navigation),
                    title: '发现',
                })}
            />
            <DiscoverStack.Screen options={({navigation, route}) => ({
                title: route.params.title,
                headerTitleStyle: {
                    fontSize: 14,
                    color: 'black'
                }
            })} name="Courses" component={CoursesScreen}/>

        </DiscoverStack.Navigator>
    );
};

export default DiscoverStackScreen;